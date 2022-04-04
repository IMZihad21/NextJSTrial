import dbConnect from "../../utils/dbConnect";

export default async function handler(req, res) {
    const { method, userId } = req;
    console.log(userId);

    await dbConnect();

    switch (method) {
        case 'GET':
            res.status(200).json({ message: "Working! for " + userId })
            break;

        default:
            res.status(400).json({ success: false })
            break
    }
}