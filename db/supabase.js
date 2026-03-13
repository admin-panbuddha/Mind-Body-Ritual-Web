const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Public client (uses anon key — respects RLS)
const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

// Admin client (bypasses RLS — use only server-side)
const supabaseAdmin = supabaseServiceKey
  ? createClient(supabaseUrl || '', supabaseServiceKey)
  : null;

module.exports = { supabase, supabaseAdmin };
