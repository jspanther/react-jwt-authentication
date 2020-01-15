const express = require("express");
const router = express.Router();
const UserController = require("./users/users.controller");

router.post("/authenticate", UserController.authenticate);
router.get("/", UserController.getAll);
router.post("/add", UserController.create);

module.exports = router;
