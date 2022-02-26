require('dotenv').config()
// const { v4: uuidv4 } = require('uuid')
// const { Op } = require('sequelize')
const Joi = require('joi')
// const bcrypt = require('bcrypt')
const util = require('util')
// const { isEmpty, doSomeAsyncMagik } = require('../utils/utils')
// const saltRounds = 10

// const smsServices = require('../services/sms.services')
// const emailServices = require('../services/email.services')
const usersModel = require('../models/users.models')
// const logger = require('../logger')

// const hashMyPassword = (mypassword) => {
    
//     return new Promise((resolve, reject) => {

//         bcrypt.genSalt(saltRounds,  (err, salt)=> {
//             bcrypt.hash(mypassword, salt,  (err, hash)=> {
//                 if (err) {
//                     reject(err)
//                 }
//                 resolve([salt, hash])
//             });
//         });
 

//     })
// }


const listAllTodos = ((req,res) => {

    usersModel.getAllTodos()
    .then(response => {
        res.status(200).send({
            status: true,
            message: "success",
            data: response
        })
    })

    .catch(err => {
        console.log(`error happened: `, err)
        res.status(422).send({
            status: false,
            message: err
        })
    })

})


const listOneTodo = ((req,res) => {

    const {todo_id} = req.params

    const todoSchema = Joi.object({
        todo_id: Joi.string().required()
    })

    const validateToDo = todoSchema.validate(req.params)
    if(validateToDo.error){
        res.status(422).send({
            status: false,
            message: "Bad Request",
            data: []
        })
    }

    usersModel.getOneTodo()
    .then(result => {
        res.status(200).send({
            status: true,
            message: "success",
            data: result
        })
    })

    .catch(err => {
        res.status(422).send({
            status: false,
            message: err
        })
    })

})



module.exports = {
    // hashMyPassword,
    listAllTodos,
    listOneTodo
}