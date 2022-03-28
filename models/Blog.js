import mongoose from 'mongoose'

const BlogSchema = new mongoose.Schema({
    blog_name: {
        type: String,
        required: [true, 'Please provide a name for this blog.']
    },
    blog_content: {
        type: String,
        required: [true, "Please provide the blog content."]
    }
})

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema)