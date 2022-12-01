const Band = require('../models/Band')
const User = require('../models/User')

module.exports.add = async (req, res) => {

    try {
        console.log('band will be here', req.body);

        const {name, owner} = req.body

        if (!name) {
            res.send({success: false, error: 1})
            return
        }

        const newBand = await Band.create({name: req.body.name, owner: req.body._id})
            console.log("🚀 ~ newBand", newBand)
            
        if (!newBand) {
            res.send({success: false, error: 2})
            return
        }    

/*         const updateBandInUser = await User.findOne({ _id: owner })
        .populate({
            path: 'bands',
            populate: { path: 'bands' }
        }) */

        const updateBandInUser = await User.findByIdAndUpdate(
            owner, 
            {$push: { bands:  newBand._id}}, 
            {new: true})
            console.log("🚀 ~ owner of band is ", owner)

            console.log("🚀 ~ updateBandInUser", updateBandInUser) 

        res.send({success: true, newBand})
    } catch (error) {
    
        console.log("🚀 ~ Error in band add", error.message)

        res.send({success: false, error: error.message})
        
    }
}
module.exports.list = async (req, res) => {
    try {

/*         const {email} = req.body

        const user = await User.find({email})
        console.log("🚀 ~ user", user) */

        const bands = await Band.find()
        console.log("🚀 ~ bands are", bands) 

        
        res.send({success: true, bands})
    } catch (error) {
        
        console.log("🚀 ~ Error in list festival", error.message)
        
        res.send({success: false, error: error.message})
        
    }
}