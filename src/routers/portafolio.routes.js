//importar router de express
const{Router} = require('express')
//instanciar variable router
const router = Router()
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
router.get('/portafolio/add', renderPortafolioForm)
router.post('/portafolio/add', createNewPortafolio)


//READ
router.get('/portafolios', renderAllPortafolios)
router.get('/portafolio/:id', renderPortafolio)


//UPDATE
router.get('/portafolio/edit/:id', renderEditPortafolioForm)
router.put('/portafolio/edit/:id', updatePortafolio)


//DELETE
router.delete('/portafolio/delete/:id', deletePortafolio)

module.exports = router