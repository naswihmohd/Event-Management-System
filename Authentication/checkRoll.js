const events = require('../models/eventModel')

const checkRoll = async (req, res, next) => {

    const eventId= req.params.id
    const event = await events.findById(eventId)
    if (req.user.role == 'admin') {
        next()
    }else if(event){
        if(event.organizer==req.user.id){
            next()
        }
    } else {
        res.json({ message: "access denied" })
    }
}

module.exports = checkRoll