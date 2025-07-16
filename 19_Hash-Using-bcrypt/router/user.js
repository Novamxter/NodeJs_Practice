const controller = require('../controller/user')
const middleware = require('../middleware/user')
const express = require('express')
const router = express.Router()

router.get('/register',controller.getRegister)
router.post('/register',controller.postRegister)

router.get('/login',controller.getLogin)
router.post('/login',controller.postLogin)

router.get('/home',middleware.verifyToken,controller.getHome)

module.exports = router
