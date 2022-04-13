const express = require('express')
const userControllers = require('../controllers/user')

const router = express.Router()

router.post('/add-user', userControllers.addUser)
router.post('/login', userControllers.login)
router.get('/users', userControllers.getUsers)
router.get('/:userId', userControllers.getUserById)
router.put('/update/:userId', userControllers.updateUser)
router.delete('/delete/:userId', userControllers.deleteUser)

module.exports = router