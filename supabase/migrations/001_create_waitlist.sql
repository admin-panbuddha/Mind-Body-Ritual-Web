-- ─────────────────────────────────────────────────────────────────
-- MindBodyRitual — Waitlist Table
-- Run this in the Supabase dashboard: SQL Editor → New Query → Run
-- ─────────────────────────────────────────────────────────────────

-- 1. Create the waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email       text NOT NULL,
  source      text DEFAULT 'website',       -- which page/form captured this
  status      text DEFAULT 'pending',       -- pending | confirmed | unsubscribed
  created_at  timestamptz DEFAULT now()
);

-- 2. Enforce unique emails (prevents duplicates, gives us the 23505 code)
CREATE UNIQUE INDEX IF NOT EXISTS waitlist_email_idx ON waitlist (email);

-- ─────────────────────────────────────────────────────────────────
-- Row Level Security
-- CRITICAL: without this, anyone can query the table via the public API
-- and dump all submitted email addresses.
-- ─────────────────────────────────────────────────────────────────

-- Enable RLS
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anonymous INSERT (public form submissions)
CREATE POLICY "Allow public insert"
  ON waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Block all SELECT from public — only service role can read
CREATE POLICY "Block public read"
  ON waitlist
  FOR SELECT
  TO anon
  USING (false);

-- Block UPDATE and DELETE from public
CREATE POLICY "Block public update"
  ON waitlist
  FOR UPDATE
  TO anon
  USING (false);

CREATE POLICY "Block public delete"
  ON waitlist
  FOR DELETE
  TO anon
  USING (false);

-- ─────────────────────────────────────────────────────────────────
-- Verification queries — run these after the migration to confirm
-- ─────────────────────────────────────────────────────────────────

-- Check table exists:
-- SELECT * FROM waitlist LIMIT 1;

-- Test insert:
-- INSERT INTO waitlist (email) VALUES ('test@example.com');

-- Test duplicate rejection (should return error code 23505):
-- INSERT INTO waitlist (email) VALUES ('test@example.com');

-- Clean up test row:
-- DELETE FROM waitlist WHERE email = 'test@example.com';
