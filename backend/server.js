require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const BuyerInfoRoutes = require('./routes/information')

const app = express()

app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next()
})

app.use('/api/buyerinfo', BuyerInfoRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Listening on port 4000');
        })
    })
    .catch((error) => {
        console.log(error);
    })