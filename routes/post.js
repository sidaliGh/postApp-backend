const express = require('express')
const postControllers = require('../controllers/post')

const router = express.Router()

router.post('/add-post', postControllers.addPost)
router.get('/posts', postControllers.getPosts)
router.get('/:postId', postControllers.getPostById)
router.put('/update/:postId', postControllers.updatePost)
router.delete('/delete/:postId', postControllers.deletePost)

module.exports = router