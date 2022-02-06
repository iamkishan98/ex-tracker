const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});
const port = process.env.PORT || 5000

app.use(cors({
    methods: 'GET,POST,PATCH,DELETE,OPTIONS',
    optionsSuccessStatus: 200,
    //origin: 'http://localhost:3000'
  }));
app.options('*', cors());

app.use(express.json())

if(process.env.NODE_ENV == "production"){
    app.use(express.static('./client/build'));
}

const uri = process.env.ATLAS_URI

const dbconnectfun = (err) =>{
    if(!err)
        console.log("MongoDB is connected successfully")
    else
        console.log("Error in connecting MongoDB")
}
const connection = mongoose.connection

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

connection.once('open', dbconnectfun)

const Exrouter = require('./routes/exercises')
const userrouter = require('./routes/users')

app.use('/users',userrouter)
app.use('/exercises',Exrouter)

const portfun = () =>{
    console.log("Server is listening to the port ",port)
}

app.listen(port, portfun)