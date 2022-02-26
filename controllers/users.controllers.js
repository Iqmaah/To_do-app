require('dotenv').config()
const { v4: uuidv4 } = require('uuid')

//const { Op } = require('sequelize')
const Joi = require('joi')
//const bcrypt = require('bcrypt')
//const util = require('util')
//const { isEmpty, doSomeAsyncMagik } = require('../utils/utils')
//const saltRounds = 10

// const smsServices = require('../services/sms.services')
// const emailServices = require('../services/email.services')
const usersModel = require('../models/users.models')
//const { response } = require('express')
// const logger = require('../logger')


const addTodo = (req, res) =>{
    console.log(req.body)
    const { title, contents, todo_date, todo_time } = req.body
    const todo_id = uuidv4()
    const toDoSchema = Joi.object({
        title: Joi.string().required(),
        contents:Joi.string().required(),
        todo_date:Joi.string().required(),
        todo_time:Joi.string().required()
    })

    const validateToDo = toDoSchema.validate(req.body)
    console.log(validateToDo)
    if(validateToDo.error) {
        // res.status(400).send({
        //     status: false,
        //     message: 'something went wrong'
        throw new Error(`Bad request`)
        
    }
    else {

        usersModel.createToDo(todo_id, title, contents, todo_date, todo_time)
        .then(responseFromModel => {
            console.log(responseFromModel)
            if(!responseFromModel) {
                throw new Error(`Something went wrong. Pls try again`)
            }
            res.status(200).send({
                status: true,
                message: `toDo successfully addedd`
            })            
        })
        .catch(err => {
            console.log(err.message)
            res.status(400).send({
                status: false,
                message: err

            })
        })
    }

}




/*const hashMyPassword = (mypassword) => {
    
    return new Promise((resolve, reject) => {

        bcrypt.genSalt(saltRounds,  (err, salt)=> {
            bcrypt.hash(mypassword, salt,  (err, hash)=> {
                if (err) {
                    reject(err)
                }
                resolve([salt, hash])
            });
        });
 

    })
}*/




module.exports = {
   
    addTodo
}