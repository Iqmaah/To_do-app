require("dotenv").config()
const express = require('express')
const displayRoutes = require('express-routemap')
const app = express()
const userRoutes = require('./routes/users.routes')
const bodyParser = require('body-parser')
const mysqlConnection = require('./config/mysql')
const{v4:uuidv4} = require('uuid')

const port = process.env.PORT

app.use(bodyParser.json())
app.use(userRoutes)
app.listen(port, () => {
    console.log(`listening on ${port}`)
     displayRoutes(app)
})

mysqlConnection.connect(err =>{
    if (err) throw err.stack
    console.log("successfully connnected: ", mysqlConnection.threadId)
})

app.get('/', (req, res) => {
    res.status(200).send ({
        message: "welcome"
    });
  })