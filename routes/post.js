const express = require('express')
const postControllers = require('../controllers/post')
const protect = require('../middleware/authMiddleware')
const router = express.Router()

router.post('/add-post', protect,postControllers.addPost)
router.get('/posts', protect,postControllers.getPosts)
router.get('/:postId', protect,postControllers.getPostById)
router.put('/update/:postId', protect,postControllers.updatePost)
router.delete('/delete/:postId', protect,postControllers.deletePost)

module.exports = router