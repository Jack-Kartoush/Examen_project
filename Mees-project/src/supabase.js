import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://sclskqoovrfbdmnzwuoq.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjbHNrcW9vdnJmYmRtbnp3dW9xIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUwMjg1MzEsImV4cCI6MjAxMDYwNDUzMX0.FHKJa8jUABILpPpMyktiZPGGlPZDzXfhuuWa2vJruQg";

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
