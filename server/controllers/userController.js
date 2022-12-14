const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { sendMail } = require('../utilities/mail')
const SALT_ROUNDS = 10

module.exports.register = async (req, res) => {
    try {
        
        console.log("🚀 ~ register here: ", req.body)

        const {email, password} = req.body;

        if (!email || !password ) {
            res.send({success: false, error: 'validation failed'})
            return
        }

        const salt = await bcrypt.genSalt(SALT_ROUNDS)
        
        req.body.password = await bcrypt.hash(password, salt)

        const userCreated = await User.create(req.body)
        console.log("🚀 ~ userCreated", userCreated)

        const token = jwt.sign({_id: userCreated._id}, process.env.JWT_SECRET, {expiresIn: '1h'})
        sendMail(token, 'register')

        res.send({success: true})
    } catch (error) {
    
        console.log("🚀 ~ Error in register", error.message)

        res.send({success: false, error: error.message})
        
    }
}
module.exports.emailConfirm = async (req, res) => {

    try {
        
        const decoded = jwt.verify(req.body.token, process.env.JWT_SECRET)
        const updatedUser = await User.findByIdAndUpdate(
            {_id: decoded._id}, 
            {verified: true}, 
            {new: true})

        console.log("🚀 ~ updatedUser", updatedUser)
       
        res.send({success: true})
    } catch (error) {
    
        console.log("🚀 ~ Error in emailconfirm", error.message)

        res.send({success: false, error: error.message})
        
    }
}
module.exports.login = async (req, res) => {

    try {
        
        console.log("🚀 ~ login here: ")
        
        const {email, password} = req.body 
        if (!email || !password) {
            res.send({success: false, error: 1})
            return
        }

        const userFound = await User.findOne({email, verified: true})
        .populate({path: 'festivals', select: 'name'})
        //.populate({path: 'bands', select: 'name'})
        .select('-__v')

        if (!userFound) return res.send({success: false, error: 2})

        const isMatch = await bcrypt.compare(password, userFound.password)
        
        if (!isMatch) return res.send({success: false, error: 3})

        const token = jwt.sign({_id: userFound._id}, process.env.JWT_SECRET, {expiresIn: '1h'} )
        res.cookie('access', token)

        const user = userFound.toObject()
        delete user.password
        console.log("🚀 ~ userFound - excluding password", user)
            
        res.send({success: true, user})
    } catch (error) {
    
        console.log("🚀 ~ Error in Login users", error.message)

        res.send({success: false, error: error.message})
        
    }
}
module.exports.logout = async (req, res) => {

    try {
        
        res.clearCookie('access')
       
        res.send({success: true})
    } catch (error) {
    
        console.log("🚀 ~ Error in logout users", error.message)

        res.send({success: false, error: error.message})
        
    }
}
module.exports.profile = async (req, res) => {

    try {

        console.log("🚀 ~ profile: req.body", req.body)
        console.log("🚀 ~ profile: req.file", req.file)

        const {email, _id} = req.body

        if(!email || !_id){
            res.send({success: false, errorId: 1})
            return
        }

        if(req.file?.filename) req.body.image = req.file?.filename

        const user = await User.findByIdAndUpdate(_id, {
            image: req.body.image, 
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            role: req.body.role
        }, {new: true})
        .select('-__v -password')
        console.log("🚀 ~ user", user)
        
        if(!user){
            res.send({success: false, errorId: 2})
            return
        }

        res.send({success: true, user})
    } catch (error) {
    
        console.log("🚀 ~ Error in Profile users", error.message)

        res.send({success: false, error: error.message})
        
    }
}
module.exports.forgotPassword = async (req, res) => {

    try {
        
        const user = await User.findOne({email: req.body.email})
        console.log("🚀 ~ user", user)

        if (!user) return res.send ({success: false, error: 10})

        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'})

        sendMail(token, 'forgotpassword')
       
        res.send({success: true})
    } catch (error) {
    
        console.log("🚀 ~ Error in forgot password", error.message)

        res.send({success: false, error: error.message})
        
    }
}
module.exports.changePassword = async (req, res) => {

    try {
        
        console.log("🚀 ~ hello change password", req.body)
        const decoded = jwt.verify(req.body.token, process.env.JWT_SECRET)

        const salt = await bcrypt.genSalt(SALT_ROUNDS)
        
        const password = await bcrypt.hash(req.body.password, salt)

        const updatedUser = await User.findByIdAndUpdate(
            {_id: decoded._id}, 
            {password},
            {new: true})
        console.log("🚀 ~ updatedUser", updatedUser)
       
        res.send({success: true})
    } catch (error) {
    
        console.log("🚀 ~ Error in change password", error.message)

        res.send({success: false, error: error.message})
        
    }
}