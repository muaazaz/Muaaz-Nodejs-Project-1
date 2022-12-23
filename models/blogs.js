const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true,
        unique: true
    },
    snippet:{
        type: String,
        require: true,
    },
    body:{
        type: String,
        require: true
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        require: true
    }

},{
    timestamps: true
})



const Blog = mongoose.model('Blog', blogSchema)

module.exports=Blog