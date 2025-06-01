const controller = require('../controller/userController.js')
const express = require('express')
const router = express.Router()

router.get("/",controller.getUsers)
router.get("/users/:id",controller.getUserById)
router.post("/users",controller.createUser)
router.put("/users/:id",controller.updateUserById)
router.delete("/users/:id",controller.deleteUserById)

module.exports = router
