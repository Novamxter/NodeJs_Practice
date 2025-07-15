const express = require("express");
const controller = require("../controllers/userController");
const {authenticateToken} = require("../middlewares/authMiddleware")
const router = express.Router();

router.post("/register", controller.register);
router.get("/register", controller.registerPage);

router.post("/login", controller.login);
router.get("/login", controller.loginPage);

router.get("/profile", authenticateToken, controller.profilePage);

module.exports = router;
