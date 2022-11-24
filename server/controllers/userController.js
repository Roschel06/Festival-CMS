const User = require('../models/user')

module.exports.register = async (req, res) => {



    try {

        console.log('register here', req.body);

        const userCreated = await User.create(req.body)
        console.log("🚀 ~ userCreated", userCreated)

        res.send({success: true})

    } catch (error) {

        console.log("🚀 ~ error", error.message)
        res.send('There was an error '+ error.message)
        
    }

}
