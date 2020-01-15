const express = require("express");
const router = express.Router();
const UserController = require("./users/users.controller");
router.post("/add", UserController.create);
router.post("/remove", UserController.remove);
router.get("/edit/:id", UserController.edit);
router.post("/update/:id", UserController.update);
module.exports = router;
