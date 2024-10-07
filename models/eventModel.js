const mongoose = require('mongoose')


const eventSchema = mongoose.Schema({
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    participaters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        default: []
    }]

})

const eventModel = mongoose.model('events', eventSchema)

module.exports = eventModel