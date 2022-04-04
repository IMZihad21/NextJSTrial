import Router from 'next/router';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

const JWT_KEY = process.env.JWT_KEY

export function verifyToken(jwtToken) {
    try {
        return jwt.verify(jwtToken, JWT_KEY)
    } catch (e) {
        console.log(e)
        return null
    }
}

export function setLogout(e) {
    e.preventDefault()
    Cookies.remove('token')
    Router.push('/')
}