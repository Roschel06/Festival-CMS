const multer  = require('multer')

const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key:  process.env.CLOUD_API_KEY,
    api_secret:  process.env.CLOUD_API_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'festivalCMS',
      format: async (req, file) => {
      console.log("🚀 ~ file", file)

        let extension = '';
        
        if (file.mimetype.includes('image')) {
            
            extension = file.mimetype.slice(6)
        }
        console.log("🚀 ~ extension", extension)

        return extension
      },
      public_id: (req, file) => {
        
          console.log("🚀 ~ req.body", req.body)
          return req.body.owner + '-' + Date.now()},
    },
  });

  const cloudinaryUpload = multer({ storage: storage });

  module.exports = {cloudinaryUpload}