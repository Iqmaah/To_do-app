const express = require('express')
const router = express.Router()
const usersController  = require('../controllers/users.controllers')



router.put("/update-todo/:id", usersController.UpdateMyTodo)






module.exports = router
