//importar routes de express

const {Router} = require('express')
const { renderIndex, renderLogin } = require('../controllers/index.controllers')
//instanciar routers
const router = Router()

router.get('/',renderIndex)


module.exports = router