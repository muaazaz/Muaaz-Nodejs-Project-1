const jwt = require('jsonwebtoken')
const User = require('../models/user')
const userCheck = async (req, res, next)=>{
    const token = req.cookies.jwt

    if (token) {
        jwt.verify(token, process.env.secret, async (err, decodedToken)=>{
            if(err){
                res.locals.user = null
                next()
            }else{
                const _id = decodedToken.id
                const user = await User.findOne({_id}) 
                res.locals.user = user
                next()
            }
        })
    } else {
        res.locals.user = null
        next()
    }
}

module.exports = userCheck