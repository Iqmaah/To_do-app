require('dotenv').config()
const { v4: uuidv4 } = require('uuid')
// const util = require('util')
// const models = require('../models/users.models')
// const smsServices = require('../services/sms.services')
// const emailServices = require('../services/email.services')
const usersModel = require('../models/users.models')

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

const DeleteMyTodo =  (req, res) => {
    const { todo_id } = req.params
usersModel.DeleteTodo(todo_id)
.then(response => {
    console.log("i got here :",response)
    if (response.affectedRows == 0)
    throw new Error("Invalid Id")

    res.status(200).send({
        status: true,
        message: "Todo deleted succesfully",
        data: []
    })
})
.catch(err => {
    res.status(422).send({
        status: false,
        message: err.message
    })
})


}



module.exports = {
    // hashMyPassword,
    DeleteMyTodo
}