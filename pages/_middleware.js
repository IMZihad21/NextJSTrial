import { NextResponse } from 'next/server'
import { verifyToken } from '../utils/auth'

export function middleware(request) {
    const baseUrl = request.nextUrl.clone();
    if (baseUrl.pathname.includes('/auth')) {
        return NextResponse.next()
    }
    // get the cookies from the request
    const token = request.cookies['token']
    const decoded = verifyToken(token?.split(' ')[1])
    if (decoded === null) {
        baseUrl.pathname = '/auth';
        NextResponse.next().clearCookie('token');
        return NextResponse.rewrite(baseUrl);
    }
    return NextResponse.next();
}