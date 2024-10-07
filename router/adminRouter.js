const express = require('express')
const adminController = require('../controllers/adminController')
const verifyToken = require('../Authentication/verifyToken')
const checkRoll = require('../Authentication/checkRoll')


const router = express.Router()
router.use(express.json())

router.get('/users',verifyToken,checkRoll, adminController.getAllUsers)
router.delete('/users/:id',verifyToken,checkRoll,adminController.deleteUser)
router.get('/events',verifyToken,checkRoll,adminController.getAllEvents)



module.exports = router