import { NextResponse } from 'next/server'
import { verifyToken } from '../utils/auth'

export function middleware(request) {
    const baseUrl = request.nextUrl.clone();
    let response = NextResponse.next()
    if (baseUrl.pathname.includes('/auth')) {
        return response
    }
    // get the cookies from the request
    const token = request.cookies['token']
    const decoded = verifyToken(token?.split(' ')[1])
    if (decoded === null) {
        baseUrl.pathname = '/auth';
        response.clearCookie('token');
        return NextResponse.rewrite(baseUrl);
    }
    response.userId = decoded.id;
    return response
}