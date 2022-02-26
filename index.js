require("dotenv").config
const express = require('express')
const app = express()
const displayRoutes = require('express-routemap')
const bodyParser = require('body-parser')
const{v4:uuidv4} = require('uuid')


const port = "3000"  //process.env.PORT
app.use(bodyParser.json())
app.listen(port, () => {
    console.log(`listening on ${port}`)
     displayRoutes(app)
})

app.get('/', (req, res) => {
    res.status(200).send ({
        message: "welcome"
    });
  });