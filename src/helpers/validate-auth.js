module.exports.isAuthenticated = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/user/login')
}
//redireccionar si ya esta autentificado
module.exports.redirectIfAuthenticated = (req, res, next)=>{
    if (req.isAuthenticated()) {
        return res.redirect('/portafolios');
    }
        return next();
}