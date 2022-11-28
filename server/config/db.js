const mongoose = require('mongoose')

module.exports = async () => {

    try {

        await mongoose.connect(process.env.DB)
        console.log("🚀 ~ Connect to DB")
        
    } catch (error) {
        console.log("🚀 ~ error", error)
        process.exit(1)
        
    }

}