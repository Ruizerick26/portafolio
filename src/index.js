//importar vaRIABLES DE entorno
require('dotenv').config()
//Importar app
const { connect } = require('mongoose');
const app = require('./server.js')
const connection = require('./database.js')
connection()



//ejecutar el servidor en el puerto 3000
app.listen(app.get('port'),()=>{
    console.log(`Server on port ${app.get('port')}`);
})