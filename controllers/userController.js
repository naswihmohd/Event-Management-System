const users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


module.exports.register = async (req, res) => {
    const isExist = await users.findOne({ email: req.body.email })
    if (!isExist) {
        const user = await users.create(req.body)
        res.json(user)
    } else {
        res.json({ message: 'email already exist' })
    }
}

module.exports.login = async (req, res) => {
    const isExist = await users.findOne({ email: req.body.email })

    if (isExist) {
        const isMatch = await bcrypt.compare(req.body.password, isExist.password)

        if (isMatch) {
            const token = jwt.sign({ id: isExist._id, username: isExist.username, role: isExist.role }, process.env.SECRET_KEY,
                 { expiresIn: '1hr' })
            res.cookie('accessToken', token, { httpOnly: true, maxAge: 60 * 60 * 6000 })
            res.json({ message: "login successfull" })
        } else {
            res.json({ message: 'incorrect password' })
        }
    } else {
        res.json({ message: 'user not foud' })
    }
}

module.exports.profile = async (req, res) => {
    const profile = await users.findById(req.user.id)
    res.json(profile)
}

module.exports.updateProfile = async (req, res) => {
    await users.findByIdAndUpdate(req.user.id, req.body)

    // let user= await users.findById(req.user.id)
    // Object.assign(user,req.body)
    // await user.save()

    res.json({ message: 'profile updated' })
}