const Blog = require('../models/blogs')
const Blogs = require('../models/blogs')

//Create blog page
const Create_blog = (req, res) => {
    res.render('crt_blog', { title: 'Create A Blog' })
}

//TO create a new blog
const post_blogs = async (req, res) => {
    const { title, snippet, body, owner } = req.body
    const blog = new Blogs({ title, snippet, body, owner })
    await blog.save()
    try {
        res.send({ blog })
    } catch (e) {
        console.log(e)
    }
}

//To render all the blogs in browser
const get_blogs = async (req, res) => {
    const blogs = await Blogs.find().sort({ createdAt: -1 })
    res.render('blogs', { title: 'Blogs', blogs })
}

//TO get a single blog details using its id
const get_a_blog = async (req, res) => {
    const blog = await Blogs.findById({ _id: req.params.id })
    res.render('details', { title: 'Blog Details', blog })
}
//TO delete a blog
const delete_blog = async (req, res) => {

    try {
        await Blogs.findByIdAndDelete({ _id: req.params.id })
        res.status(200).send()
    } catch (e) {
        res.send(e)
    }
}
//To show edit page
const edit_page = async(req, res) =>{
    try {
        const blog =await Blogs.findById(req.params.id)
        res.render('blogedit',{title:'Edit Page', blog})
    } catch (e) {
        console.log(e)
    }
}

//To edit a blog
const edit_blog = async (req, res) => {
    try {
        const blog =await Blogs.findById(req.params.id)
        blog.title = req.body.title
        blog.snippet = req.body.snippet
        blog.body = req.body.body
        await blog.save()
        res.send({blog})
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    Create_blog,
    post_blogs,
    get_blogs,
    get_a_blog,
    delete_blog,
    edit_blog,
    edit_page
}