/**
 * MULTER SET UP
 */
 const multer  = require('multer')
 // SIMPLE SETUP
 const upload = multer({ dest: './uploads' })
 
 // ADVANCED SETUP
 const storage = multer.diskStorage({
     destination: function (req, file, cb) {
       cb(null, './uploads')
 
     },
     filename: function (req, file, cb) {
     console.log(file);
         let extension = ''
         
         if (file.mimetype.includes('image')) {
 
             extension = file.mimetype.slice(6)
         }
       const uniqueSuffix = req.body._id + '.' + extension
       cb(null, file.originalname + '-' + uniqueSuffix)
     }
   })
   
   const advancedUpload = multer({ storage: storage })
 
   module.exports = {advancedUpload}