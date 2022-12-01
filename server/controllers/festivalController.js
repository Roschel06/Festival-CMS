const Festival = require('../models/Festival')
const User = require('../models/User')

module.exports.add = async (req, res) => {
    try {
        
        const {name, owner} = req.body

        if (!name || !owner ) {
            res.send({success: false, error: 1})
            return
        }


            // first: const = ...find festivals by name


        const newFestival = await Festival.create(req.body)
        console.log("🚀 ~ newFestival", newFestival)
        
        if (!newFestival) {
            res.send({success: false, error: 2})
            return
        }

/*      const foundUser = await User.findOne({_id: owner})
        console.log("🚀 ~ foundUser ", foundUser)  */ 

        const updateFestivalInUser = await User.findByIdAndUpdate(
            owner, 
            {$push: { festivals:  newFestival._id}}, 
            {new: true})
/*             .populate({ 
                path: 'data',
                populate: {
                  path: 'festivals',
                  ref: 'Festival'
                } 
             }) */
        //.populate({path: 'festivals', select: 'name'})

        console.log("🚀 ~ updateFestivalInUser", updateFestivalInUser) 

        res.send({success: true})
    } catch (error) {
    
        console.log("🚀 ~ Error in add festival", error.message)

        res.send({success: false, error: error.message})
        
    }
}
/* module.exports.list = async (req, res) => {
    try {

        const {email} = req.body

        const user = await User.find({email})
        console.log("🚀 ~ user", user)

        /* const festivals = await Festival.find({_id: user._id})
        console.log("🚀 ~ festivals", festivals) 

        
        res.send({success: true, user})
    } catch (error) {
        
        console.log("🚀 ~ Error in list festival", error.message)
        
        res.send({success: false, error: error.message})
        
    }
} */
/*         const festivals = await Festival.find()
        console.log("🚀 ~ festivals", festivals)
 */