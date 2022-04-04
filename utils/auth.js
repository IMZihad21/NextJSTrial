import Router from 'next/router';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

const JWT_KEY = process.env.JWT_KEY

export function verifyToken(jwtToken) {
    try {
        return jwt.verify(jwtToken, JWT_KEY)
    } catch (e) {
        console.log('e:', e)
        return null
    }
}

export function getJWTtoken(req) {
    const parsedItems = {}
    if (req.headers.cookie) {
        const cookiesItems = req.headers.cookie.split('; ')
        cookiesItems.forEach((cookies) => {
            const parsedItem = cookies.split('=')
            parsedItems[parsedItem[0]] = decodeURI(parsedItem[1])
        })
    }
    return parsedItems["token"]
}

export function setLogout(e) {
    e.preventDefault()
    Cookies.remove('token')
    Router.push('/')
}