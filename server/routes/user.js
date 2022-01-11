const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

//create, find, update, delete
router.get("/", userController.view);
router.post("/", userController.find);
router.get("/adduser", userController.form)
module.exports = router;