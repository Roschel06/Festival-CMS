const Band = require('../models/Band')
const User = require('../models/User')

module.exports.add = async (req, res) => {

    try {

        const {name, owner} = req.body
        console.log("🚀 ~ req.body", req.body)
        console.log("🚀 ~ profile: req.file", req.file)

        if (!name) {
            res.send({success: false, error: 1})
            return
        }
        if(req.file?.filename) req.body.image = req.file?.path

        const newBand = await Band.create(req.body)
        //.then(item => item.populate({path: 'owner', select: '_id'}))
        
        if (!newBand) {
            res.send({success: false, error: 2})
            return
        }    
            
        console.log("🚀 ~ newBand is ", newBand)
        
            
        res.send({success: true, newBand})

    } catch (error) {
    
        console.log("🚀 ~ Error in band add", error.message)
        res.send({success: false, error: error.message})
        
    }
}
module.exports.list = async (req, res) => {
    try {

        const bands = await Band.find()
        res.send({success: true, bands})

    } catch (error) {
        
        console.log("🚀 ~ Error in list festival", error.message)
        res.send({success: false, error: error.message})
        
    }
}

module.exports.band = async (req, res) => {
    try {

        const band = await Band.findOne({_id: req.params.id})
/*         .populate({
            path: 'name',
            select: 'band'
        }) */
        
        console.log("🚀 ~ band in details is", band)
        
        res.send({success: true, band})

    } catch (error) {
        
        console.log("🚀 ~ Error in list festival", error.message)
        res.send({success: false, error: error.message})
        
    }
}