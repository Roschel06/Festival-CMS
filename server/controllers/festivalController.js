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

        res.send({success: true, updateFestivalInUser})
    } catch (error) {
    
        console.log("🚀 ~ Error in add festival", error.message)

        res.send({success: false, error: error.message})
        
    }
}
module.exports.select = async (req, res) => {
    try {
        
        console.log("🚀 ~ select festival: req.body", req.body)
        
        const {currentFestival, _id} = req.body
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
            //.populate('currentFestival')
            //.populate({path: 'currentFestival', select: 'name'})
            
        //console.log("🚀 ~ updateCurrentFestival", updateCurrentFestival)


        //res.status(200).json(updateCurrentFestival)
        res.send({ success: true })
    } catch (error) {
    
        console.log("🚀 ~ Error in select festival", error.message)

        res.status(500).send({success: false, error: error.message})
        
    }
}
module.exports.list = async (req, res) => {
    try {

        const festivals = await Festival.find().sort('-_id')
        res.send({success: true, festivals})

    } catch (error) {
        
        console.log("🚀 ~ Error in list festival", error.message)
        res.send({success: false, error: error.message})
        
    }
}
module.exports.singlefestival = async (req, res) => {
    try {

        const festival = await Festival.findOne({_id: req.params.id})
        
        console.log("🚀 ~ festival in details is", festival)
        
        res.send({success: true, festival})

    } catch (error) {
        
        console.log("🚀 ~ Error in list festival", error.message)
        res.send({success: false, error: error.message})
        
    }
}
module.exports.edit = async (req, res) => {

    try {

        console.log("🚀 ~ edit Festival: req.body", req.body)
        //console.log("🚀 ~ edit Festival: req.file", req.file)

        const {_id} = req.body

        if(!_id){
            res.send({success: false, errorId: 1})
            return
        }

        //if(req.file?.filename) req.body.image = req.file?.filename

        const festival = await Festival.findByIdAndUpdate(_id, {
            //image: req.body.image, 
            name: req.body.name
        }, {new: true})
        .select('-__v')
        console.log("🚀 ~ festival", festival)
        
        if(!festival){
            res.send({success: false, errorId: 2})
            return
        }

        res.send({success: true, festival})
    } catch (error) {
    
        console.log("🚀 ~ Error in edit festival", error.message)

        res.send({success: false, error: error.message})
        
    }
}
module.exports.addBands = async (req, res) => {

    try {
        console.log("🚀 ~ edit Festival: req.body", req.body)
        const {currentFestival, selectedRows} = req.body
        console.log("🚀 ~ selectedRows", selectedRows)

        const festival = await Festival.findOne({_id: currentFestival})
        
        console.log("🚀 ~ currentFestival is", festival)

        let notDouble = [];

        for (let i = 0; i < selectedRows.length; i++) {          
            if(`new ObjectId('${selectedRows[i].id}')` == festival.bands[i].toString() ){
                console.log('Is already in list ', selectedRows[i].id);
            }else{
                console.log('Will be added ', selectedRows[i].id);
            }
          }
            
/*               for (let i = 0; i < selectedRows.length; i++) {
                        console.log('selectedRows: ', selectedRows[i].id);
              }
              for (let i = 0; i < festival.bands.length; i++) {
                    console.log('festival.bands ', festival.bands[i]);
                } */


/*         Festival.findOne({_id: currentFestival}).then(function(bands) {
            var jobQueries = [];
          
            bands.forEach(function(u) {
              jobQueries.push(Band.find({_id: }));
            }); */
          
/*             return Promise.all(jobQueries );
          }).then(function(listOfJobs) {
              res.send(listOfJobs);
          }).catch(function(error) {
              res.status(500).send('one of the queries failed', error);
          }); */


        res.send({success: true})
    } catch (error) {
    
        console.log("🚀 ~ Error in edit festival", error.message)

        res.send({success: false, error: error.message})
        
    }
}