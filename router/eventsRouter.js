const express = require('express')
const eventscontroller = require('../controllers/eventsController')
const verifyToken = require('../Authentication/verifyToken')
const checkRoll= require('../Authentication/checkRoll')


const router = express.Router()
router.use(express.json())

router.post('/', verifyToken, eventscontroller.createEvent)
router.get('/', eventscontroller.getEvents)
router.get('/:id', eventscontroller.getOneEvent)
router.put('/:id',verifyToken,checkRoll,eventscontroller.updateEvent)
router.delete('/:id',verifyToken,checkRoll, eventscontroller.deleteEvent)

router.post('/:id/register', verifyToken, eventscontroller.register)
router.get('/:id/registrations',verifyToken,checkRoll, eventscontroller.allRegistration)
router.delete('/:id/registrations', verifyToken,checkRoll, eventscontroller.cancelRegistration)


module.exports = router