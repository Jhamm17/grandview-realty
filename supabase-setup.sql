-- Create property_cache table
CREATE TABLE IF NOT EXISTS property_cache (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  listing_id TEXT UNIQUE NOT NULL,
  property_data JSONB NOT NULL,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin_users table with password support
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'editor')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_property_cache_listing_id ON property_cache(listing_id);
CREATE INDEX IF NOT EXISTS idx_property_cache_is_active ON property_cache(is_active);
CREATE INDEX IF NOT EXISTS idx_property_cache_last_updated ON property_cache(last_updated);
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_role ON admin_users(role);

-- Insert a default admin user (replace with your email and password)
-- You'll need to hash the password first using bcrypt
-- INSERT INTO admin_users (email, password_hash, role) VALUES ('your-email@example.com', 'hashed_password_here', 'admin');

-- Enable Row Level Security (RLS)
ALTER TABLE property_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for property_cache table
-- Allow read access to all authenticated users
CREATE POLICY "Allow read access to property_cache" ON property_cache
  FOR SELECT USING (true);

-- Allow insert/update/delete for authenticated users (you might want to restrict this further)
CREATE POLICY "Allow write access to property_cache" ON property_cache
  FOR ALL USING (true);

-- Create policies for admin_users table
-- Allow read access to all authenticated users
CREATE POLICY "Allow read access to admin_users" ON admin_users
  FOR SELECT USING (true);

-- Allow insert/update/delete for authenticated users (you might want to restrict this further)
CREATE POLICY "Allow write access to admin_users" ON admin_users
  FOR ALL USING (true);

-- Create a function to automatically update last_updated timestamp
CREATE OR REPLACE FUNCTION update_last_updated_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_updated = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update last_updated
CREATE TRIGGER update_property_cache_last_updated
  BEFORE UPDATE ON property_cache
  FOR EACH ROW
  EXECUTE FUNCTION update_last_updated_column(); 

-- Create Instagram posts table for storing latest posts from cron job
CREATE TABLE IF NOT EXISTS instagram_posts (
  id INTEGER PRIMARY KEY,
  post_url TEXT NOT NULL,
  caption TEXT,
  media_url TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_instagram_posts_active ON instagram_posts(is_active);

-- Enable Row Level Security
ALTER TABLE instagram_posts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access to active posts
CREATE POLICY "Allow public read access to active Instagram posts" ON instagram_posts
  FOR SELECT USING (is_active = true);

-- Create policy to allow service role to manage all posts
CREATE POLICY "Allow service role to manage Instagram posts" ON instagram_posts
  FOR ALL USING (auth.role() = 'service_role');

-- Create function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_instagram_posts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_instagram_posts_updated_at
  BEFORE UPDATE ON instagram_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_instagram_posts_updated_at(); 