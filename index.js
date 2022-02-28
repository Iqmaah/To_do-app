require("dotenv").config()
const express = require('express')
const app = express()
const userRoutes = require('./routes/users.routes')
const bodyParser = require('body-parser')
const mysqlConnection = require('./config/mysql')
const{v4:uuidv4} = require('uuid')
const userRoutes = require('./routes/users.routes')



const port =process.env.PORT
app.use(bodyParser.json())
app.use(userRoutes)

mySqlConnection.connect(err => {
    if (err) throw err.stack
    console.log('successfully connected: ' , mySqlConnection.threadId)
  })

app.use(userRoutes)

app.listen(port, () => {
    console.log(`listening on ${port}`)
     //displayRoutes(app)
})

mysqlConnection.connect(err => {
    if (err) throw err.stack
    // connected!
    console.log('successfully connected: ' , mysqlConnection.threadId)
  })

app.get('/', (req, res) => {
    res.status(200).send ({
        message: "welcome"
    });
  });

mySqlConnection.connect(err => {
    if (err) throw err.stack
    console.log('successfully connected:' , mySqlConnection.threadId)

})