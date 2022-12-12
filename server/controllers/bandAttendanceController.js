const BandAttendance = require('../models/BandAttendance')
const Band = require('../models/Band')

module.exports.add = async (req, res) => {
    try {
        
        console.log("🚀 ~ attendance req.body", req.body)
        

        const {band, attendance} = req.body


        if (!band || !attendance) {
            res.send({success: false, error: 1})
            return
        }

        const newAttendance = await BandAttendance.create(req.body)
        
        if (!newAttendance) {
            res.send({success: false, error: 1})
            return
        }    
            
        console.log("🚀 ~ newAttendance is ", newAttendance)

        let newAttendanceForBand;

        if (attendance) { 
            newAttendanceForBand = await Band.findByIdAndUpdate({ _id: band},
            {
                $push : {attendance: newAttendance._id}
            },
            {new: true}
            )
                
            console.log("🚀 ~ newAttendanceForBand", newAttendanceForBand)
        } 
       
            
        res.send({success: true, newAttendance})

    } catch (error) {
    
        console.log("🚀 ~ Error in select festival", error.message)

        res.status(500).send({success: false, error: error.message})
        
    }
}
module.exports.singleAttendance = async (req, res) => {
    try {
        
        console.log("🚀 ~ attendance req.body", req.body)
        

    
        //res.send({success: true, newAttendance})

    } catch (error) {
    
        console.log("🚀 ~ Error in select festival", error.message)

        res.status(500).send({success: false, error: error.message})
        
    }
}