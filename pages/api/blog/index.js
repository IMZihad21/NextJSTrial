import dbConnect from '../../../utils/dbConnect'
import Blog from '../../../models/Blog'

export default async function handler(req, res) {
    const { method } = req

    await dbConnect()

    switch (method) {
        case 'GET':
            try {
                const pets = await Blog.find({})
                res.status(200).json({ success: true, data: pets })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'POST':
            try {
                const pet = await Blog.create(
                    req.body
                )
                res.status(201).json({ success: true, data: pet })
            } catch (error) {
                res.status(400).json({ error: error.message })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}