import dbConnect from '../../../utils/dbConnect'
import Blog from '../../../models/Blog'

export default async function handler(req, res) {
    const { method } = req

    await dbConnect()

    switch (method) {
        case 'GET':
            try {
                const blogs = await Blog.find({})
                res.status(200).json(blogs)
            } catch (error) {
                res.status(400).json({ error: error.message })
            }
            break
        case 'POST':
            // validate req body
            const { blog_name, blog_content } = req.body
            if (!blog_name || !blog_content) {
                return res.status(400).json({ message: 'Please fill all required fields' })
            }
            try {
                const blog = await Blog.create(
                    req.body
                )
                res.status(201).json(blog)
            } catch (error) {
                res.status(400).json({ error: error.message })
            }
            break
        default:
            res.status(400).json({ message: 'Method not allowed' })
            break
    }
}