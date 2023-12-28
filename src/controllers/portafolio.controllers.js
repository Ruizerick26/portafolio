const Portfolio = require('../models/Portfolio')
const { uploadImage, deleteImage } = require('../config/cloudinary')
const fs = require('fs-extra')

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
    const imageUpload = await uploadImage(req.files.image.tempFilePath)
    newPortfolio.image = {
        public_id:imageUpload.public_id,
        secure_url:imageUpload.secure_url
    }
    await fs.unlink(req.files.image.tempFilePath)
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
    const portfolio = await Portfolio.findById(req.params.id).lean()
    if(portfolio._id != req.params.id) return res.redirect('/portafolios')
    
    if(req.files?.image) {
        if(!(req.files?.image)) return res.send("Se requiere una imagen")
        await deleteImage(portfolio.image.public_id)
        const imageUpload = await uploadImage(req.files.image.tempFilePath)
        const data ={
            title:req.body.title || portfolio.name,
            category: req.body.category || portfolio.category,
            description:req.body.description || portfolio.description,
            image : {
            public_id:imageUpload.public_id,
            secure_url:imageUpload.secure_url
            }
        }
        await fs.unlink(req.files.image.tempFilePath)
        await Portfolio.findByIdAndUpdate(req.params.id,data)
    }
    else{
        const {title,category,description}= req.body
        await Portfolio.findByIdAndUpdate(req.params.id,{title,category,description})
    }
    res.redirect('/portafolios')
}

//Eliminar datos en la BDD
const deletePortafolio = async (req,res)=>{
    const portafolio = await Portfolio.findByIdAndDelete(req.params.id)
    await deleteImage(portafolio.image.public_id)
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