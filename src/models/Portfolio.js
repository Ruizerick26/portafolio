//importar esquema y el modelo
const {Schema, model} = require('mongoose')

//crear esquema
const portfolioSchema = new Schema({
    title:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require:true
    },
    category:{
        type: String,
        require: true
    }
},{
    timestamps:true
})
 modeule.exports = model('portfolio',portfolioSchema)