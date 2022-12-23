const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const blogsRouter = require('./routers/blogs')
const userRouter = require('./routers/user')
const checkUser = require('./middleware/userCheck')
const Blogs = require('./models/blogs')

const app = express()



app.use(express.json())
app.use(express.static('public'))
app.use(cookieParser())

app.get('*',checkUser)
app.use(blogsRouter)
app.use(userRouter)

app.set('view engine','ejs')


mongoose.connect(process.env.dbUrl).then((res)=>{
    app.listen(3000,()=>{
        console.log('Server is up in running at port: 3000')
    })
  }).catch((e)=>{
    console.log(e)
})



//home page
app.get('/', async(req, res)=>{
    const blogs = await Blogs.find().sort({ createdAt: -1 })
    res.render('home',{title: 'Home Page', blogs})
})

//About page
app.get('/about', (req, res)=>{
    res.render('about',{title: 'About Page'})
})

//404
app.use((req, res)=>{
    res.render('404',{title: '404'})
})