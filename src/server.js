const express = require('express')
const path = require('path')
const methodOverride = require('method-override');



//importar handlebars

const {engine} = require('express-handlebars')

//Instanciar Express
const app = express()


//configuraciones

//variables de configuraciones

app.set('port',process.env.port || 3000)
app.set('views',path.join(__dirname,'views'))

//middlewares
//trabaja con inforamcion en base a formularios
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))

//Variables globales

//primera ruta
app.get('/',(req,res)=>{
    res.render('index')
})

//Archivo estatico
//definir archivo estatico y publico
app.use(express.static(path.join(__dirname,'public')))

//establecer el path de la carpeta views
app.set('views',path.join(__dirname, 'views'))
//establecer las configuraciones extras
app.engine('.hbs',engine({
    //establecer el master page
    defaultLayout:'main',
    //establecer el path de la carpeta layouts
    layoutsDir: path.join(app.get('views'),'layouts'),
    //establecer el path de la carpeta partials
    partialsDir: path.join(app.get('views'),'partials'),
    //extencion delas paginas
    extname:'.hbs'
}))
//establecer motor de plantillas
app.set('view engine','.hbs')

app.use(require('./routers/index.routes'))
app.use(require('./routers/portafolio.routes'))

//exportar app
module.exports = app

