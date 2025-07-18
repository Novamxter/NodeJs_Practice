const controller = require("../controller/user");
const authMiddleware = require("../middlewares/auth");
const authorizeRole = require("../middlewares/role");
const express = require("express");
const router = express.Router();

router.get("/register", controller.getRegister);
router.post("/register", controller.postRegister);

router.get("/login", controller.getLogin);
router.post("/login", controller.postLogin);

router.get("/home",authMiddleware.verifyToken, controller.getHome);

router.delete("/delete/:id",authMiddleware.verifyToken, authorizeRole('admin'),controller.deleteUser);

module.exports = router;