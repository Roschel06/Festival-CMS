module.exports.attendance = async (req, res) => {
    try {
        
        console.log("🚀 ~ attendance req.body", req.body)
        
/*         const {currentFestival, _id} = req.body
        console.log("🚀 ~ _id: ", _id)
        console.log("🚀 ~ currentFestival: ", currentFestival)

        if (!currentFestival || !_id ) {
            res.status(500).send({success: false, error: 1})
            return
        }

        const updateCurrentFestival = await User.findByIdAndUpdate(
            _id, 
            {currentFestival}, 
            {new: true})
            //.populate({path: 'currentFestival', select: 'name'})
            
        //console.log("🚀 ~ updateCurrentFestival", updateCurrentFestival)


        //res.status(200).json(updateCurrentFestival)
        res.send({ success: true }) */
    } catch (error) {
    
        console.log("🚀 ~ Error in select festival", error.message)

        res.status(500).send({success: false, error: error.message})
        
    }
}