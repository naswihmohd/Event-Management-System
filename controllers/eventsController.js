const eventModel = require('../models/eventModel')

module.exports.createEvent = async (req, res) => {
    const event = {
        organizer: req.user.id,
        name: req.body.name,
        date: req.body.date,
        location: req.body.location,
    }
    const events = await eventModel.create(event)
    res.json(events)
}

module.exports.getEvents = async (req, res) => {
    const events = await eventModel.find()
    res.json(events)
}

module.exports.getOneEvent = async (req, res) => {
    const id = req.params.id
    const event = await eventModel.findById(id)
    res.json(event)
}

module.exports.updateEvent = async (req, res) => {
    const id = req.params.id
    await eventModel.findByIdAndUpdate(id, req.body)
    res.json({ message: 'event updated' })
}

module.exports.deleteEvent = async (req, res) => {
    const id = req.params.id
    await eventModel.findByIdAndDelete(id)
    res.json({ message: 'event deleted' })
}

module.exports.register = async (req, res) => {
    const eventId = req.params.id
    const event = await eventModel.findById(eventId)

    if (!event.participaters.includes(req.user.id)) {
        event.participaters.push(req.user.id)
        await event.save()
        res.json({ message: 'registration completed' })
    } else {
        res.json({ message: 'Already registred' })
    }
}

module.exports.allRegistration = async (req, res) => {
    const eventId = req.params.id
    const event = await eventModel.findById(eventId).populate('participaters')
    res.json(event)
}

module.exports.cancelRegistration = async (req, res) => {
    const eventId = req.params.id
    const event = await eventModel.findById(eventId)

    if (event.participaters.includes(req.user.id)) {
        event.participaters = event.participaters.filter((participent) => !participent.equals(req.user.id))
        event.save()
        res.json({ message: 'registration canceled' })
    }
}