import { NextResponse } from 'next/server'
import { verifyToken } from '../utils/auth'

export function middleware(req) {
    const baseUrl = req.nextUrl.clone();
    let response = NextResponse.next()
    if (baseUrl.pathname.includes('/auth')) {
        return response
    }
    // get the cookies from the request
    const token = req.cookies['token']
    const decoded = verifyToken(token?.split(' ')[1])
    if (decoded === null) {
        baseUrl.pathname = '/auth';
        return NextResponse.redirect(baseUrl)
    }
    response.userId = decoded.id;
    return response
}