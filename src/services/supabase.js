import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://dsqtriwwhcghewiejevj.supabase.co";
const supabaseKey =
   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzcXRyaXd3aGNnaGV3aWVqZXZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ4MTE2NDUsImV4cCI6MjAxMDM4NzY0NX0.1lisvv9FAV-HA_pwidAfWhCVfKya9znKIQP6Mfy__-E";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
