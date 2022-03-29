import Blog from '../../../models/Blog'
import dbConnect from '../../../utils/dbConnect'

export default async function handler(req, res) {
    const {
        query: { id },
        method,
    } = req

    await dbConnect()

    switch (method) {
        case 'GET' /* Get a model by its ID */:
            try {
                const blog = await Blog.findById(id)
                if (!blog) {
                    return res.status(400).json({ error: "Not Found" })
                }
                res.status(200).json({ success: true, data: blog })
            } catch (error) {
                res.status(400).json({ error: error.message })
            }
            break

        case 'PATCH' /* Edit a model by its ID */:
            try {
                const blog = await Blog.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true,
                })
                if (!blog) {
                    return res.status(400).json({ success: false })
                }
                res.status(200).json({ success: true, data: blog })
            } catch (error) {
                res.status(400).json({ error: error.message })
            }
            break

        case 'DELETE' /* Delete a model by its ID */:
            try {
                const deletedBlog = await Blog.deleteOne({ _id: id })
                if (!deletedBlog) {
                    return res.status(400).json({ error: "Not Found" })
                }
                res.status(200).json({ success: true })
            } catch (error) {
                res.status(400).json({ error: error.message })
            }
            break

        default:
            res.status(400).json({ error: "Not Found" })
            break
    }
}