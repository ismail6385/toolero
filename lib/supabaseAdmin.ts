import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Note: This client should ONLY be used in server-side contexts (API routes, Server Actions)
// NEVER import this in a Client Component.

if (!supabaseUrl || !supabaseServiceKey) {
    console.warn('Missing SUPABASE_SERVICE_ROLE_KEY, admin features will not work.');
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey || '', {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});
