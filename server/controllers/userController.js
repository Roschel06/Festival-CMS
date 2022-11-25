const User = require('../models/user')

module.exports.register = async (req, res) => {
    try {
        
        console.log("🚀 ~ register here: ", req.body)

        const {email, username, password} = req.body;

        if (!email || !password ) {
            res.send({success: false, error: 'validation failed'})

            return
        }

        const userCreated = await User.create( req.body)
        console.log("🚀 ~ userCreated", userCreated)
        res.send({success: true})
    } catch (error) {
    
        console.log("🚀 ~ Error in register", error.message)

        res.send({success: false, error: error.message})
        
    }
}

module.exports.login = async (req, res) => {

    try {
        
        console.log("🚀 ~ login here: ")

        const {email, username, password} = req.body 
        if (!email || !password) {
            res.send({success: false, error: 1})
            return
        }

        const userFound = await User.find({email: email, password})
        .select('-__v -password')
        console.log("🚀 ~ userFound", userFound)

        if (!userFound.length) {
            res.send({success: false, error: 2})
            return
        }
        res.send({success: true, user: userFound[0]})
    } catch (error) {
    
        console.log("🚀 ~ Error in Login users", error.message)

        res.send({success: false, error: error.message})
        
    }
}
module.exports.logout = async (req, res) => {

    try {
        
        res.clearCookie('wdpt10')
       
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

       req.body.image = req.file?.filename

        const user = await User.findByIdAndUpdate(_id, req.body, {new: true}).select('-__v -password')
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