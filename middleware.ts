import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Define paths that should NOT be blocked
    const publicPaths = [
        '/_next',
        '/static',
        '/favicon.ico',
        '/admin', // Keep admin accessible
        '/maintenance', // The maintenance page itself
        '/api', // Keep APIs working
        '/can-group-logo-black.jpg', // Allow logo
        '/can-group-logo-white.png', // Allow logo
    ];

    const path = request.nextUrl.pathname;

    // Check if the path starts with any allowed path
    const isAllowed = publicPaths.some(p => path.startsWith(p));

    // Allow local development to bypass maintenance mode
    if (process.env.NODE_ENV === 'development') {
        return NextResponse.next();
    }

    // If not allowed, rewrite to maintenance page
    // if (!isAllowed) {
    //     return NextResponse.rewrite(new URL('/maintenance', request.url));
    // }

    return NextResponse.next();
}

export const config = {
    matcher: '/:path*',
};
