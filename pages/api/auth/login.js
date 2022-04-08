import bcrypt from 'bcryptjs'
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

const JWT_KEY = process.env.JWT_KEY

const USERS = [
    {
        id: 1,
        email: 'mofajjal.techforing@gmail.com',
        password: '$2a$12$LFNemiSQnr4qAMgEwjgM8e19zpkVdjB.1XLI2l9T.rj0UOfSBHx66', // password
        createdAt: '2020-06-14 18:23:45'
    }
]

export default async function handler(req, res) {
    const { method } = req
    const { email, password } = req.body

    switch (method) {
        case 'POST':
            /* Any how email or password is blank */
            if (!email || !password) {
                return res.status(400).json({ message: 'Email or password is empty' })
            }
            const user = USERS.find(user => user.email === email)
            if (!user) {
                return res.status(401).json({ message: 'User not found' })
            }
            const isValid = await bcrypt.compare(password, user.password)
            if (!isValid) {
                return res.status(401).json({ message: 'Invalid password' })
            }
            const token = sign({ id: user.id }, JWT_KEY, {
                expiresIn: 60 * 60 * 24 * 7 // 1 week 
            })

            // set cookie in response
            res.setHeader('Set-Cookie', serialize('token', token, {
                httpOnly: true,
                sameSite: "strict",
                maxAge: 60 * 60 * 24 * 7, // 1 week
                path: "/",
            }))

            // filter password from user and send response
            const { password: _, ...userData } = user
            res.status(200).json({ ...userData })
            break

        default:
            res.status(400).json({ message: 'Method not allowed' })
            break
    }
}
