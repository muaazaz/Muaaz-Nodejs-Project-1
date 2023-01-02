const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const maxAge = 3*60*60

const genToken = (id)=>{
    return jwt.sign({id},process.env.SECRET,{
        expiresIn: maxAge
    })
}

const get_signup=(req, res)=>{
    res.render('signup', {title: 'Signing Up'})
}

const get_login=(req, res)=>{
    res.render('login', {title: 'Logging IN'})
}

const post_signup=async (req, res)=>{

    try {
        const user = new User(req.body)
        await user.save()
        const token = genToken(user._id)
        res.cookie('jwt', token, {
            expiresIn: maxAge
        })
        res.send({user})
    } catch (err) {
     const error = err.message
     res.send({error})   
    }
}
const post_login=async (req, res)=>{

    try {
        const user = await User.verifyCredentials(req.body.email, req.body.password)
        const token = genToken(user._id)
        res.cookie('jwt', token, {expiresIn: maxAge})
        res.send({user})
    }catch (err) {
        const error = err.message
        res.send({error}) 
    }
}

const logout = (req, res)=>{
    res.cookie('jwt','',{maxAge:0})
    res.redirect('/')
}

const edit_page =async (req, res)=>{
    res.render('useredit',{title:'Settings'})

}
const user_edit = async (req, res)=>{
    try {
        const user =await User.findById(req.params.id)
        if(req.body.password!='undefined' && req.body.prevpass !='undefined'){
            if(await bcrypt.compare(req.body.prevpass, user.password)){
                user.email = req.body.email
                user.password = req.body.password
                await user.save()
                return res.send()
            }else{
                throw new Error('Previous password not correct')
            }
            
        }else{
            user.email = req.body.email
            await user.save()
        }
        res.send()
        
    } catch (error) {
        error = error.message
        res.send({error})
    }

}

module.exports ={
    get_login,
    get_signup,
    post_signup,
    post_login,
    logout,
    edit_page,
    user_edit
}