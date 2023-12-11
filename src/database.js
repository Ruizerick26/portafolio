//importar mongoose
const mongoose = require('mongoose')


connection = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Database is connected")
    }
    catch(error){
        console.log(error)
    }
}
module.exports = connection