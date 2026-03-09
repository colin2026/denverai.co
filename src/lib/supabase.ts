import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dtgwbnhgzwucabishkwl.supabase.co';
const supabaseAnonKey = 'sb_publishable_tN1O4VWfwLy-zMnbAPxfgg_EW6OF1b0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
