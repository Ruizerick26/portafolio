const express = require('express')
const path = require('path')
const methodOverride = require('method-override');
//importar passport y express-session
const passport = require('passport');
const session = require('express-session');

//importar handlebars
const {engine} = require('express-handlebars')
const fileUpload = require('express-fileupload')

//Instanciar Express
const app = express()
require('./config/passport')


//configuraciones

//variables de configuraciones

app.set('port',process.env.port || 3000)
app.set('views',path.join(__dirname,'views'))

//middlewares
//confgurar la sesion del usuario
app.use(session({ 
    secret: 'secret',
    resave:true,
    saveUninitialized:true
}));
//inicializar passport y session
app.use(passport.initialize())
app.use(passport.session())
//Servidor va a trabajr con información de base a formularios
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))

app.use(require('./routers/user.routes'))

//trabaja con inforamcion en base a formularios
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))
//Variables globales


//Archivo estatico
//definir archivo estatico y publico
app.use(express.static(path.join(__dirname,'public')))

//establecer la carpeta temporal y de directorio
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : './uploads'
}));

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
// Variables globales
app.use((req,res,next)=>{
    //encadenamiento global
    res.locals.user = req.user?.name || null
    next()
})
//establecer motor de plantillas
app.set('view engine','.hbs')

app.use(require('./routers/index.routes'))
app.use(require('./routers/portafolio.routes'))

//primera ruta
app.get('/',(req,res)=>{
    res.render('index')
})







//exportar app
module.exports = app

