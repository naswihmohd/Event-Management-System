const user = require('../models/userModel')
const events= require('../models/eventModel')

module.exports.getAllUsers = async (req, res) => {
    const users = await user.find()
    res.json(users)
}

module.exports.deleteUser = async (req, res) => {
    userId= req.params.id
    await user.findByIdAndDelete(userId)
    res.json({message:'user deleted'})
}

module.exports.getAllEvents= async (req,res)=>{
    const allEvents= await events.find()
    res.json(allEvents)
}