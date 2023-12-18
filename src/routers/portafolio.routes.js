//importar router de express
const{Router} = require('express')
//instanciar variable router
const router = Router()
const {isAuthenticated} = require('../helpers/validate-auth')
//
const { renderAllPortafolios,
        renderPortafolio,
        renderPortafolioForm,
        createNewPortafolio,
        renderEditPortafolioForm,
        updatePortafolio,
        deletePortafolio
    } = require('../controllers/portafolio.controllers.js')

//CREATE
router.get('/portafolio/add',isAuthenticated,renderPortafolioForm)
router.post('/portafolio/add', isAuthenticated,createNewPortafolio)

//READ
router.get('/portafolios',isAuthenticated,renderAllPortafolios)
router.get('/portafolio/:id', isAuthenticated,renderPortafolio)


//UPDATE
router.get('/portafolio/edit/:id', isAuthenticated,renderEditPortafolioForm)
router.put('/portafolio/edit/:id', isAuthenticated,updatePortafolio)


//DELETE
router.delete('/portafolio/delete/:id', isAuthenticated,deletePortafolio)

module.exports = router