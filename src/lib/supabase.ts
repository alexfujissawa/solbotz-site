import { createClient } from '@supabase/supabase-js';

const rawUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const rawKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

function getValidSupabaseUrl(url: string | undefined): string {
  if (url && (url.startsWith('http://') || url.startsWith('https://')) && !url.includes('sua_url_do_supabase')) {
    return url;
  }
  return 'https://placeholder.supabase.co';
}

function getValidSupabaseKey(key: string | undefined): string {
  if (key && !key.includes('sua_chave_anonima')) {
    return key;
  }
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.placeholder';
}

export const supabaseUrl = getValidSupabaseUrl(rawUrl);
export const supabaseAnonKey = getValidSupabaseKey(rawKey);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Lead {
  id?: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  challenge?: string;
  description?: string;
  created_at?: string;
}
