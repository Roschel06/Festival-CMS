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
/* module.exports.addToFestivalOLD = async (req, res) => {

    try {

        const {festival, band} = req.body
        console.log("🚀 ~ req.body", req.body)

        if (!festival || !band) {
            res.send({success: false, error: 1})
            return
        }

        const addBandToFestival = await Festival.findByIdAndUpdate(
            {
                _id: festival,
                bands: {$elemMatch: {$ne: band}}
            },             
            {$push: { bands:  band}}, 
            {new: true})
        .select('-__v')
        console.log("🚀 ~ addBandToFestival", addBandToFestival)

        if (!addBandToFestival) return res.send({success: false, errorId:4})

        const addFestivalToBand = await Band.findByIdAndUpdate(
            band,             
            {$push: { festivals:  festival}}, 
            {new: true})
        .select('-__v')


        console.log("🚀 ~ addFestivalToBand", addFestivalToBand)
        if (!addFestivalToBand) {
            res.send({success: false, error: 2})
            return
        }           
            
        res.send({success: true})

    } catch (error) {
    
        console.log("🚀 ~ Error in band add to festival", error.message)
        res.send({success: false, error: error.message})
        
    }
} */
module.exports.addToFestival = async (req, res) => {

    try {
        const {festival, band} = req.body

        console.log("🚀 ~ req.body ", req.body)

        const bandInFestival = await Festival.findOne({
            _id: festival, 
            bands: {$elemMatch: {$eq: band}}
        })

        console.log("🚀 ~ bandInFestival ", bandInFestival)

        let newBandForFestival;

        if (!bandInFestival) { 
            newBandForFestival = await Festival.findByIdAndUpdate({ _id: festival},
            {
                $push : {bands: band}
            },
            {new: true}
            )
                
            console.log("🚀 ~ newBandForFestival", newBandForFestival)
        }            

        const festivalInBand = await Band.findOne({
            _id: band, 
            festivals: {$elemMatch: {$eq: festival}}
        })

        console.log("🚀 ~ festivalInBand ", festivalInBand)

        let newFestivalInBand;

        if (!festivalInBand) { 
            newFestivalInBand = await Band.findByIdAndUpdate({ _id: band},
            {
                $push : {festivals: festival}
            },
            {new: true}
            )
            
            console.log("🚀 ~ newFestivalInBand", newFestivalInBand)
        }



        res.send({success: true, bandInFestival: newBandForFestival})
        
    } catch (error) {
        console.log("🚀 ~ Error in like  ", error.message)

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
module.exports.delete = async (req, res) => {

    try {

        console.log("🚀 ~ delete params", req.params)


        const filter = {bands: req.params.id}

        const updateDoc = {
            $pull: {bands: req.params.id}
        }

        const result = await Festival.updateMany(filter, updateDoc)
        console.log("🚀 ~ result", result)


        const bandInFestivals = await Festival.find({bands: req.params.id})
        console.log("🚀 ~ bandInFestivals", bandInFestivals) 

        const band = await Band.findByIdAndDelete(req.params.id)
        console.log("🚀 ~ band", band)


        if(!band) {
            res.send({success: false, error: 'Band not found'})
            return
        }
       

    } catch (error) {
        console.log('Error in delete band', error.message);
        res.send({success: false, error: error.message})
    }

}