const express = require('express')
const userController = require('../controllers/userController')
const verifyToken = require('../Authentication/verifyToken')


const router = express.Router()
router.use(express.json())

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/profile', verifyToken, userController.profile)
router.put('/profile', verifyToken, userController.updateProfile)



module.exports = router