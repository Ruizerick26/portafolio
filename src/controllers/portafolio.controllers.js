const Portfolio = require('../models/Portfolio')
const { uploadImage } = require('../config/cloudinary')
//Listar protafolios
const renderAllPortafolios = async(req,res)=>{
    //listar todos los portafolios y tranformar en Objetos learn
    const portfolios = await Portfolio.find({user:req.user._id}).lean()
    //mandar a las vista los portafolios
    res.render("portafolio/allPortfolios",{portfolios})
}

//listar el detalle de un solo portafolio
const renderPortafolio = (req,res)=>{
    res.send('Mostrar el detalle de un portafolio')
}

//Mostrar el formulario

const renderPortafolioForm = (req,res)=>{
    res.render('portafolio/newFormPortafolio')
}


//Guardar en la base lo capturado en el form
const createNewPortafolio =async (req,res)=>{
    //destructurar los datos de request.body
    const {title, category,description} = req.body
    //nueva instancia 
    const newPortfolio = new Portfolio({title,category,description})
    //guardar en la base de datos
    newPortfolio.user = req.user._id
    if(!(req.files?.image)) return res.send("Se requiere una imagen")
    await uploadImage(req.files.image.tempFilePath)
    await newPortfolio.save()   
    //mostrar resultados
    //res.json({newPortfolio})
    res.redirect('/portafolios') 
}

//Actualiza formulario
const renderEditPortafolioForm = async(req,res)=>{
    const portfolio = await Portfolio.findById(req.params.id).lean()
    res.render('portafolio/editPortfolio',{portfolio})
}

//Guardar en la BDD
const updatePortafolio =async (req,res)=>{
    const {title,category,description}= req.body
    await Portfolio.findByIdAndUpdate(req.params.id,{title,category,description})
    res.redirect('/portafolios')
}

//Eliminar datos en la BDD
const deletePortafolio = async (req,res)=>{
    await Portfolio.findByIdAndDelete(req.params.id)
    res.redirect('/portafolios')
}


module.exports ={
    renderAllPortafolios,
    renderPortafolio,
    renderPortafolioForm,
    createNewPortafolio,
    renderEditPortafolioForm,
    updatePortafolio,
    deletePortafolio
}