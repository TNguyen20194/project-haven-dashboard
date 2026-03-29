import { createClient } from '@supabase/supabase-js';
import "dotenv/config"

const projectURL = process.env.SUPABASE_URL;
const APIKey = process.env.SUPABASE_KEY

const supabase = createClient(projectURL, APIKey);

export default supabase;