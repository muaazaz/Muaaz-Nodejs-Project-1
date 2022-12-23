const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        require: true,
        lowerCase: true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Please Enter a valid email')
            }
        }
    },
    password:{
        type: String,
        require: true,
        minLength: 6,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password cannot contain password')
            }
        }
    }
}) 

//Hashing password before storing in db
userSchema.pre('save',async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

//logging in
userSchema.statics.verifyCredentials = async function(email, password){
    const User = this
    const usr = await User.findOne({email})
    if(!usr){
        throw new Error ('Email not found')
    }
    const isMatch =await bcrypt.compare(password, usr.password)
    if(!isMatch){
        throw new Error ('Password incorrect')
    }
    return usr
}

const User = mongoose.model('User',userSchema) 

module.exports = User