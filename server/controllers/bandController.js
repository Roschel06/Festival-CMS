const Band = require('../models/Band')

module.exports.add = async (req, res) => {

    try {
        
        const {name} = req.body

        if (!name) {
            res.send({success: false, error: 1})
            return
        }

        const newBand = await Band.create(req.body)
            console.log("🚀 ~ newBand", newBand)
            
        if (!newBand) {
            res.send({success: false, error: 2})
            return
        }    
        res.send({success: true})
    } catch (error) {
    
        console.log("🚀 ~ Error in band add", error.message)

        res.send({success: false, error: error.message})
        
    }
}