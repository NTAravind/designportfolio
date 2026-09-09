-- Run this SQL in your Supabase SQL Editor to set up the projects table and storage bucket

-- 1. Create the projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL,
  figma_link TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- 3. Public read policy (portfolio page reads without auth)
CREATE POLICY "public read" ON projects
  FOR SELECT USING (true);

-- 4. Allow anon inserts (admin panel uses anon key)
CREATE POLICY "anon insert" ON projects
  FOR INSERT WITH CHECK (true);

-- 5. Allow anon updates
CREATE POLICY "anon update" ON projects
  FOR UPDATE USING (true);

-- 6. Allow anon deletes
CREATE POLICY "anon delete" ON projects
  FOR DELETE USING (true);
