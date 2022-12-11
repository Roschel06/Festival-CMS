const Band = require('../models/Band')
const Festival = require('../models/Festival')
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

        if(req.file?.filename) req.body.logo = req.file?.path

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
module.exports.addToFestival = async (req, res) => {

    try {

        const {name, _id} = req.body
        console.log("🚀 ~ req.body", req.body)

        if (!_id) {
            res.send({success: false, error: 1})
            return
        }

        const addToFestival = await Festival.findByIdAndUpdate(
            _id,             
            {$push: { bands:  newBandinfestival._id}}, 
            {new: true})
        .select('-__v')

        console.log("🚀 ~ addToFestival", addToFestival)


        
        if (!addToFestival) {
            res.send({success: false, error: 2})
            return
        }    
            
        console.log("🚀 ~ addToFestival is ", addToFestival)
        
            
        res.send({success: true, newBandinfestival})

    } catch (error) {
    
        console.log("🚀 ~ Error in band add to festival", error.message)
        res.send({success: false, error: error.message})
        
    }
}
module.exports.list = async (req, res) => {
    try {

        const bands = await Band.find().sort('-_id')
        res.send({success: true, bands})

    } catch (error) {
        
        console.log("🚀 ~ Error in list band", error.message)
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
module.exports.edit = async (req, res) => {
    try {

        console.log('Logging hello from band edit');
        
        res.send('hello from res.send band edit')

    } catch (error) {
        
        console.log("🚀 ~ Error in edit band", error.message)
        res.send({success: false, error: error.message})
        
    }
}