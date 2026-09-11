import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export interface Agent {
  id: string;
  slug: string;
  name: string;
  title: string;
  image_url?: string;
  logo_url?: string;
  phone?: string;
  email?: string;
  specialties: string[];
  experience?: string;
  service_area?: string;
  description?: string;
  is_active: boolean;
  sort_order: number;
}

export async function getAgentByNameOrEmail(nameOrEmail: string): Promise<Agent | null> {
  try {
    // First try to find by exact email match
    const { data: emailMatch, error: emailError } = await supabase
      .from('agents')
      .select('*')
      .eq('email', nameOrEmail)
      .single();

    if (emailMatch && !emailError) {
      return emailMatch;
    }

    // If no email match, try to find by name (case-insensitive partial match)
    const { data: nameMatches, error: nameError } = await supabase
      .from('agents')
      .select('*')
      .ilike('name', `%${nameOrEmail}%`);

    if (nameMatches && nameMatches.length > 0 && !nameError) {
      // If we have multiple matches, try to find the best one
      if (nameMatches.length === 1) {
        return nameMatches[0];
      }
      
      // For multiple matches, try to find the best match using improved logic
      const searchLower = nameOrEmail.toLowerCase();
      const searchParts = searchLower.split(/[\s-]+/); // Split on space or hyphen
      
      // Find the best match by checking first and last name separately
      for (const agent of nameMatches) {
        const agentNameLower = agent.name.toLowerCase();
        const agentParts = agentNameLower.split(/[\s-]+/);
        
        // Check if first name matches
        const firstNameMatch = searchParts[0] === agentParts[0];
        
        // Check if last name parts match (handles hyphenated names)
        const lastNameMatch = searchParts.length > 1 && agentParts.length > 1 && 
          (searchParts[searchParts.length - 1] === agentParts[agentParts.length - 1] ||
           agentParts.some((part: string) => part.includes(searchParts[searchParts.length - 1])) ||
           searchParts.some((part: string) => part.includes(agentParts[agentParts.length - 1])));
        
        // If both first and last name match, this is likely the best match
        if (firstNameMatch && (lastNameMatch || searchParts.length === 1)) {
          return agent;
        }
      }
      
      // If no perfect match found, return the first one
      return nameMatches[0];
    }

    // If no direct match, try matching by first and last name separately
    // This handles cases like "Lynda Werner" matching "Lynda Sanchez-Werner"
    if (nameOrEmail.includes(' ')) {
      const searchParts = nameOrEmail.toLowerCase().split(/[\s-]+/);
      const firstName = searchParts[0];
      const lastName = searchParts[searchParts.length - 1];
      
      // Try to find agents where first name matches and last name contains the search last name
      const { data: firstNameMatches, error: firstNameError } = await supabase
        .from('agents')
        .select('*')
        .ilike('name', `${firstName}%`);
      
      if (firstNameMatches && !firstNameError && firstNameMatches.length > 0) {
        // Filter by last name match
        for (const agent of firstNameMatches) {
          const agentNameLower = agent.name.toLowerCase();
          const agentParts = agentNameLower.split(/[\s-]+/);
          
          // Check if any part of the agent's name contains the search last name
          const hasLastNameMatch = agentParts.some((part: string) => 
            part.includes(lastName) || lastName.includes(part)
          );
          
          if (hasLastNameMatch) {
            return agent;
          }
        }
      }
    }

    return null;
  } catch (error) {
    console.error('Error fetching agent:', error);
    return null;
  }
} 