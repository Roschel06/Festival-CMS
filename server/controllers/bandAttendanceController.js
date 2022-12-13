const Bandattendance = require('../models/BandAttendance')
const Band = require('../models/Band')

module.exports.add = async (req, res) => {
    try {
        
        console.log("🚀 ~ attendance req.body", req.body)
        

        const {band, festival} = req.body


        if (!band || !festival) {
            res.send({success: false, error: 1})
            return
        }

        const newAttendance = await Bandattendance.create(req.body)
        
        if (!newAttendance) {
            res.send({success: false, error: 1})
            return
        }    
            
        console.log("🚀 ~ newAttendance is ", newAttendance)

        let newAttendanceForBand;

        if (festival) { 
            newAttendanceForBand = await Band.findByIdAndUpdate({ _id: band},
            {
                $push : {attendance: newAttendance._id}
            },
            {new: true}
            )
                
            console.log("🚀 ~ newAttendanceForBand", newAttendanceForBand)

/*             const bandFound = await Band.findOne({_id: band})
            .populate({path: 'attendance', select: 'festival'})
            console.log("🚀 ~ bandFound", bandFound) */
        } 
       
            
        res.send({success: true, newAttendance})

    } catch (error) {
    
        console.log("🚀 ~ Error in select festival", error.message)

        res.status(500).send({success: false, error: error.message})
        
    }
}
module.exports.list = async (req, res) => {
    try {
        console.log("🚀 ~ list parmas", req.params)
        
        const allAttendance = await Bandattendance.find({owner: req.params.owner})
        console.log("🚀 ~ allAttendance", allAttendance)
        res.send({success: true, allAttendance})

    } catch (error) {
        
        console.log("🚀 ~ Error in list attendance", error.message)
        res.send({success: false, error: error.message})
        
    }
}
module.exports.singleAttendance = async (req, res) => {
    try {
        
        console.log("🚀 ~ req.body", req.params)

        

        const attendance = await Bandattendance.findOne({_id: req.params.id})
                
        console.log("🚀 ~ band attendance in details is", attendance)
        
        res.send({success: true, attendance})

    } catch (error) {
    
        console.log("🚀 ~ Error in singleAttendance", error.message)

        res.status(500).send({success: false, error: error.message})
        
    }
}