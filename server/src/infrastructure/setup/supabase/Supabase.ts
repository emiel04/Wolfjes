import { createClient } from "@supabase/supabase-js";
import config from "@helper/config";
const supabaseUrl = config.supabaseUrl;
const supabaseKey = config.supabaseKey;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
