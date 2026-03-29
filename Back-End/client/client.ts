import { createClient } from '@supabase/supabase-js';
import "dotenv/config"

const projectURL = process.env.SUPABASE_URL;
const APIKey = process.env.SUPABASE_KEY;

if(!projectURL || !APIKey){
    throw new Error("Missing Supabase environment variables")
}

const supabase = createClient(projectURL, APIKey);

export default supabase;