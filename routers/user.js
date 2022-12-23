const express = require('express')
const controller = require('../controllers/userCont')
const auth = require('../middleware/auth')

const router = express.Router()

//render login page
router.get('/login',controller.get_login)
//logged in using credentials
router.post('/login', controller.post_login)
//render signup page
router.get('/signup', controller.get_signup)
//signing up using credentials
router.post('/signup',controller.post_signup)
//Logging out
router.get('/logout', controller.logout)
//Editing user page
router.get('/user/:id',auth,controller.edit_page)
//Edit user profile
router.put('/user/:id',auth,controller.user_edit)

module.exports = router