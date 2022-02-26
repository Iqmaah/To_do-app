const express = require('express')
const router = express.Router()
const usersController  = require('../controllers/users.controllers')
// const {authentication} = require('../middlewares/authentication')

router.delete('/delete/:todo_id', usersController.DeleteMyTodo)

// fjgjg





module.exports = router
