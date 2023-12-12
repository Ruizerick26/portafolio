const Portfolio = require('../models/Portfolio')
//Listar protafolios
const renderAllPortafolios = async(req,res)=>{
    const portfolios = await Portfolio.find().lean()
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
    await newPortfolio.save()
    //mostrar resultados
    res.json({newPortfolio})
    
}

//Actualiza formulario
const renderEditPortafolioForm = (req,res)=>{
    res.send('Formulario para editar un portafolio')
}

//Guardar en la BDD
const updatePortafolio = (req,res)=>{
    res.send('Editar un portafolio')
}

//Eliminar datos en la BDD
const deletePortafolio = (req,res)=>{
    res.send('Eliminar un nuevo portafolio')
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