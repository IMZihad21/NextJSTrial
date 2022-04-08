import { serialize } from "cookie";

export default async function handler(req, res) {
    const { method, cookies } = req
    const token = cookies['token'];

    switch (method) {
        case 'GET':
            if (!token) {
                return res.status(401).json({ message: "You are not logged in" });
            } else {
                res.setHeader('Set-Cookie', serialize('token', null, {
                    httpOnly: true,
                    sameSite: "strict",
                    maxAge: 0, // 0 means delete cookie
                    path: "/",
                }));
                res.status(200).json({ message: "Successfuly logged out!" });
            }
            break

        default:
            res.status(400).json({ message: 'Method not allowed' })
            break
    }
}