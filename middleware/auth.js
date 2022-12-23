const jwt = require('jsonwebtoken')

const auth = async (req, res, next)=>{
    const token = req.cookies.jwt

    if (token) {
        jwt.verify(token, process.env.secret, async (err, decodedToken)=>{
            if(err){
                res.redirect('/login')
            }else{
                next()
            }
        })
    } else {
        res.redirect('/login')
    }
}

module.exports = auth