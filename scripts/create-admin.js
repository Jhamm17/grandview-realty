const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing required environment variables:');
  console.error('   - NEXT_PUBLIC_SUPABASE_URL');
  console.error('   - SUPABASE_SERVICE_ROLE_KEY');
  console.error('\nPlease add these to your .env.local file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createAdminUser(email) {
  try {
    console.log(`🔄 Creating admin user: ${email}`);
    
    // First, create the user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password: 'tempPassword123!', // User will need to change this
      email_confirm: true,
      user_metadata: {
        role: 'admin'
      }
    });

    if (authError) {
      console.error('❌ Auth user creation error:', authError.message);
      return false;
    }

    if (authData.user) {
      // Then add them to our admin_users table
      const { error: dbError } = await supabase
        .from('admin_users')
        .insert({
          id: authData.user.id,
          email: email,
          role: 'admin',
          created_at: new Date().toISOString()
        });

      if (dbError) {
        console.error('❌ Database insert error:', dbError.message);
        return false;
      }

      console.log('✅ Admin user created successfully!');
      console.log(`📧 Email: ${email}`);
      console.log(`🔑 Temporary password: tempPassword123!`);
      console.log('\n⚠️  IMPORTANT: The user should change their password immediately after first login.');
      return true;
    }

    return false;
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
    return false;
  }
}

// Get email from command line argument
const email = process.argv[2];

if (!email) {
  console.error('❌ Please provide an email address:');
  console.error('   node scripts/create-admin.js your-email@example.com');
  process.exit(1);
}

// Validate email format
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  console.error('❌ Please provide a valid email address');
  process.exit(1);
}

createAdminUser(email).then(success => {
  if (success) {
    console.log('\n🎉 Setup complete! You can now log in to the admin dashboard.');
    console.log('🌐 Visit: https://grandview-realty-i1j3wxaxo-jackson-hamms-projects.vercel.app/admin');
  } else {
    console.log('\n❌ Failed to create admin user. Please check the error messages above.');
    process.exit(1);
  }
}); 