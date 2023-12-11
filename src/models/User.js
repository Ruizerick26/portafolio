const {Schema,model} = require('mongoose')
//imporatar BCRPT
const bcrypt = require('bcryptjs')

//crear un schema
const userSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password :{
        type:String,
        require:true
    }
},{
    timestamps:true
})
// Método para cifrar el password del usuario
userSchema.methods.encrypPassword = async (password)=>{
    const salt = await bcrypt.genSalt(10)
    const passwordEncryp = await bcrypt.hash(password,salt)
    return passwordEncryp
}
// Método para verificar si el password ingresado es el mismo de la BDD
userSchema.methods.matchPassword = async function(password){
    //utilizar el metodo compare-comparar 
    const response = await bcrypt.compare(password,this.password)
    //retornar booleano
    return response
}

//exportar modelo
module.exports = model('users',userSchema)