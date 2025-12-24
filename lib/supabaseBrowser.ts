import { createBrowserClient } from '@supabase/ssr';

export const createClient = () =>
    createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://fjicwadndsnfqqgddpwh.supabase.co',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqaWN3YWRuZHNuZnFxZ2RkcHdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY1NjI2NDgsImV4cCI6MjA4MjEzODY0OH0.1kBAARvH6pe1jdBOUUVMjtOW6uz5OksRqKFMPxzAVZQ'
    );
