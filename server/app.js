const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require("mongoose")

mongoose.connect(
    'mongodb+srv://shop:' + process.env.ATLAS_PW + '@cluster0-ab5ek.gcp.mongodb.net/shop?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
)

const heroesRoutes = require('./api/routes/heroes')

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json())
app.use('/heroes', heroesRoutes)

module.exports = app
