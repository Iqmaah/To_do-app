const express = require('express')
const router = express.Router()
const { shareToDO}  = require('../controllers/users.controllers')


router.post('/share-todo', shareToDO )





module.exports = router
