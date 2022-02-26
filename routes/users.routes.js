const express = require('express')
const router = express.Router()
const usersController  = require('../controllers/users.controllers')
//const {authentication} = require('../middlewares/authentication')



router.post('/todo/add', usersController.addTodo)



module.exports = router
