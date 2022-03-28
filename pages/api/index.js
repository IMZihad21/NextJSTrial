import dbConnect from "../../lib/dbConnect";

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            res.status(200).json({ message: "Wokring!" })
            break;

        default:
            res.status(400).json({ success: false })
            break
    }
}