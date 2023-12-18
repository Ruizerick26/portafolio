const {Router} = require('express')
const { renderRegisterForm, registerNewUser, renderLoginForm, loginUser, logoutUser } = require('../controllers/user.controller')
const { redirectIfAuthenticated } = require('../helpers/validate-auth')
const router = Router()


router.get('/user/register', redirectIfAuthenticated, renderRegisterForm)
router.post('/user/register',redirectIfAuthenticated,registerNewUser)


router.get('/user/login',renderLoginForm)
router.post('/user/login',loginUser)


router.post('/user/logout',logoutUser)


module.exports =router