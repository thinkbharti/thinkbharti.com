import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/types/supabase'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nuvfczwqedxdmudedlvl.supabase.co'
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51dmZjendxZWR4ZG11ZGVkbHZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk2MjI5NjUsImV4cCI6MjEwNTE5ODk2NX0.fEVrsZGRZfi3iu5-pXhi-BBo7UpK8M7H4v2Xd5QBkUE'

export function createClient() {
  return createBrowserClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY)
}
