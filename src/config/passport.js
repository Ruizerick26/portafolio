
const passport = require('passport')
const User = require('../models/User')

const LocalStrategy = require('passport-local').Strategy


//Implementar la estrategia local
passport.use(new LocalStrategy({
    //en base a email y password
    usernameField:'email',
    passwordField:'password'
    //funcion para hacer el proceso de inicio de sesión
},async(email,password,done)=>{
    //Buscar el usuario e base al email
    const userBDD = await User.findOne({email})
    //verificar la existencia del usuario
    if(!userBDD) return done("Lo sentimos, el email no se encuentra registrado",false,)
    //Desencriptar el password
    const passwordUser = await userBDD.matchPassword(password)
    //Veridicar el password
    if(!passwordUser) return done("Lo sentimos, los passwords no coinciden",false)
    if(userBDD.confirmEmail===false) return done("Lo sentimos, debe verificar la cuenta en su correo electrónico",false)
    //retorna el usuario de la BDD
    return done(null,userBDD)
}))


//serializar el usuario 
passport.serializeUser((user,done)=>{
    done(null,user.id)
})

//deserealizar el usuario
passport.deserializeUser(async (id, done) => {
    const userDB  = await User.findById(id).exec();
    return done(null,userDB)
});



