// src/middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
    const token = request.cookies.get('accessToken')?.value;
    const { pathname } = request.nextUrl;

    // 1. Zaten giriş yapmış biri kayıt veya giriş sayfasına gitmek isterse -> Panele at
    if (token && (pathname === '/kayit-ol' || pathname === '/giris-yap')) {
        return NextResponse.redirect(new URL('/panel', request.url));
    }

    // 2. Giriş yapmamış biri /panel veya alt sayfalarına girmek isterse -> Giriş sayfasına at
    if (!token && pathname.startsWith('/panel')) {
        return NextResponse.redirect(new URL('/giris-yap', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/kayit-ol', 
        '/giris-yap', 
        '/panel/:path*'
    ],
};