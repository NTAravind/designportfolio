-- Run this SQL in your Supabase SQL Editor to create the
-- project-thumbnails storage bucket and its access policies.

-- 1. Create the storage bucket for project thumbnails (public read)
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-thumbnails', 'project-thumbnails', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Storage policies for the bucket (admin panel uploads with the anon key;
--    upsert requires INSERT + SELECT + UPDATE)
CREATE POLICY "public read thumbnails" ON storage.objects
  FOR SELECT USING (bucket_id = 'project-thumbnails');

CREATE POLICY "anon upload thumbnails" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'project-thumbnails');

CREATE POLICY "anon update thumbnails" ON storage.objects
  FOR UPDATE USING (bucket_id = 'project-thumbnails');