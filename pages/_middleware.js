import { NextResponse } from 'next/server'
import { verifyToken } from '../utils/auth'

export function middleware(request) {
    const token = request.cookies['token'];
    const decoded = verifyToken(token);
    const baseUrl = request.nextUrl.clone();

    if (baseUrl.pathname.includes('/auth')) {
        // verify if decoded id is valid 
        if (decoded) {
            baseUrl.pathname = '/';
            return NextResponse.redirect(baseUrl);
        }
        return NextResponse.next()
    }
    if (!decoded) {
        baseUrl.pathname = '/auth';
        NextResponse.next().clearCookie('token');
        return NextResponse.rewrite(baseUrl);
    }
    return NextResponse.next();
}