require('dotenv').config()
const { v4: uuidv4 } = require('uuid')
const util = require('util')
const {fetchTodo} = require('../models/users.models')
const {sendSMS} = require('../services/sms.service')
const { isEmpty, doSomeAsyncMagik } = require('../utils/utils')



const shareToDO = async (req, res) =>{
   const { phoneNumber, todoID } = req.body
   try {
   const [err, checkIfFetchedTodo] = await doSomeAsyncMagik(fetchTodo(todoID))
   if (err){
       throw new Error ("Internal Error")
   }
   if(isEmpty(checkIfFetchedTodo)){
       throw new Error ("Todo Event not found")
   }

   const todoToShare = checkIfFetchedTodo[0]

   const message = `You have been invited into this event ${todoToShare.title}, ${todoToShare.contents} ${todoToShare.todo_date}, ${todoToShare.todo_time}`

   await sendSMS(phoneNumber, message)
        res.status(200).send({
            status: true,
            message: "Todo Event successfully shared"
        })
    }

    catch(e){
        res.status(200).send({
            status: false,
            message: "Todo Event not shared, please try again"
        })
    }

}



module.exports = {
    shareToDO
    
}