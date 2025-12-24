import { type NextRequest, NextResponse } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

export async function middleware(request: NextRequest) {
    // 1. Create response
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    // 2. Create Supabase Client
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://fjicwadndsnfqqgddpwh.supabase.co',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqaWN3YWRuZHNuZnFxZ2RkcHdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY1NjI2NDgsImV4cCI6MjA4MjEzODY0OH0.1kBAARvH6pe1jdBOUUVMjtOW6uz5OksRqKFMPxzAVZQ',
        {
            cookies: {
                get(name: string) {
                    return request.cookies.get(name)?.value;
                },
                set(name: string, value: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value,
                        ...options,
                    });
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    });
                    response.cookies.set({
                        name,
                        value,
                        ...options,
                    });
                },
                remove(name: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value: '',
                        ...options,
                    });
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    });
                    response.cookies.set({
                        name,
                        value: '',
                        ...options,
                    });
                },
            },
        }
    );

    // 3. Get User
    const { data: { user } } = await supabase.auth.getUser();

    // 4. Protect /admin routes
    if (request.nextUrl.pathname.startsWith('/admin')) {
        // Allow access to login page inside admin if we had one, but assuming redirect to generic login
        if (!user) {
            // Redirect to login
            const url = request.nextUrl.clone();
            url.pathname = '/login'; // Assuming you have a login page
            url.searchParams.set('next', request.nextUrl.pathname);
            return NextResponse.redirect(url);
        }

        // Check specific email
        const adminEmail = process.env.ADMIN_EMAIL || 'a87667330@gmail.com';
        if (adminEmail && user.email !== adminEmail) {
            return NextResponse.redirect(new URL('/', request.url)); // Forbidden
        }
    }

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
