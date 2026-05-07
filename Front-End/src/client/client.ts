import { createClient } from '@supabase/supabase-js';

const projectURL = import.meta.env.VITE_SUPABASE_URL;
const APIKey = import.meta.env.VITE_SUPABASE_KEY;

if(!projectURL || !APIKey){
    throw new Error("Missing Supabase environment variables")
}

const supabase = createClient(projectURL, APIKey);

export default supabase;