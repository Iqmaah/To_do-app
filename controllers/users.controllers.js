require('dotenv').config()
const { v4: uuidv4 } = require('uuid')
const { Op } = require('sequelize')
const Joi = require('Joi')
const bcrypt = require('bcrypt')
const util = require('util')
const { isEmpty, doSomeAsyncMagik } = require('../utils/utils')
const saltRounds = 10

const smsServices = require('../services/sms.services')
const emailServices = require('../services/email.services')
const usersModel = require('../models/users.models')
const logger = require('../logger')

const hashMyPassword = (mypassword) => {
    
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
}




module.exports = {
    hashMyPassword
}