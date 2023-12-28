//importar mongoose
const mongoose = require('mongoose')
const {DBUSER,DBPASSWORD, DBNAME} = process.env
const MONGODB_URI = `mongodb+srv://${DBUSER}:${DBPASSWORD}@cluster0.opciysv.mongodb.net/?retryWrites=true&w=majority`


connection = async()=>{
    try{
        await mongoose.connect(MONGODB_URI)
        console.log("Database is connected")
    }
    catch(error){
        console.log(error)
    }
}
module.exports = connection