const express = require('express')
const middleware = require('../middlewares/user')
const controller = require('../controllers/user')

const router = express.Router()

router.get('/register',controller.getRegister)
router.post('/register',controller.postRegister)

router.get('/login',controller.getLogin)
router.post('/login',controller.postLogin)

router.get('/home',middleware.authenticateToken,controller.getHome)

module.exports = router