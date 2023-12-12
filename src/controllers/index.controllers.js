const renderIndex = (req,res)=>{
    res.render('index')
}

const renderLogin = (req,res)=>{
    res.render('login')
}


module.exports ={
    renderIndex, 
    renderLogin
}