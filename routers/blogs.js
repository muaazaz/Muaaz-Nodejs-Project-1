const express = require('express')
const controller = require('../controllers/blogsCont')
const auth = require('../middleware/auth')
const checkUser = require('../middleware/userCheck')

const router = express.Router()


router.get('/create_blog', auth, controller.create_blog)

router.post('/blogs', auth, controller.post_blogs)

router.get('/blogs', auth, controller.get_blogs)

router.get('/blogs/:id', auth, controller.get_a_blog)

router.get('/edit/:id',auth, controller.edit_page)

router.put('/edit/:id',auth,controller.edit_blog)

router.delete('/blogs/:id', auth, controller.delete_blog)




module.exports = router