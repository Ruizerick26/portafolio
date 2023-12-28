const passport = require("passport")
const User = require('../models/User')
const { sendMailToUser } = require("../config/nodemailer")

const renderRegisterForm =(req,res)=>{
    res.render('user/registerForm')
}
//Capturar los datos del formulario y almacenar en BDD
const registerNewUser =async(req,res)=>{
    //Capturar los datos del body
    const{name,email,password,confirmpassword} = req.body
    //validar campos
    if (Object.values(req.body).includes("")) return res.send("Lo sentimos, debes llenar todos los campos")
    //validar password
    if(password != confirmpassword) return res.send("Lo sentimos, los passwords no coinciden")
    //validar si el usuario ya esta registrado
    const userBDD = await User.findOne({email})
    if(userBDD) return res.send("Lo sentimos, el email ya se encuentra registrado")
    //crear nueva instacia del Usuario
    const newUser = await new User({name,email,password,confirmpassword})
    //Encriptar Password
    newUser.password = await newUser.encrypPassword(password)
    const token = newUser.crearToken()
    sendMailToUser(email,token)
    newUser.save()
    //redireccionar
    res.redirect('/user/login')
    
}

const renderLoginForm =(req,res)=>{
    res.render('user/loginForm')
}

// Primera forma 
// const loginUser = async(req,res)=>{

//     const{name,email,password} = req.body
    
//     if (Object.values(req.body).includes("")) return res.send("Lo sentimos, debes llenar todos los campos")

//     const userBDD = await User.findOne({email})
//     if(!userBDD) return res.send("Lo sentimos, el email no se encuentra registrado")
    
//     const passwordUser = await userBDD.matchPassword(password)
//     if(!passwordUser) return res.send("Lo sentimos, los passwords no coinciden")

//     res.redirect('/portafolios') 
// }

// Segunda forma utilizando el módulo passport
const loginUser = passport.authenticate('local',{
    failureRedirect:'/user/login',
    successRedirect:'/portafolios'
})

const logoutUser =(req,res)=>{
    req.logout((err)=>{
        if (err) return res.send("Ocurrio un error") 
        res.redirect('/');
    });
}

const confirmEmail = async(req,res)=>{
    if(!(req.params.token)) return res.send("Lo sentimos, no se puede validar la cuenta")
    const userBDD = await User.findOne({token:req.params.token})
    userBDD.token = null
    userBDD.confirmEmail=true
    await userBDD.save()
    res.send('Token confirmado, ya puedes iniciar sesión');
}

module.exports={
    renderRegisterForm,
    registerNewUser,
    renderLoginForm,
    loginUser,
    logoutUser,
    confirmEmail
}