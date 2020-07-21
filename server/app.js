const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const heroesRoutes = require('./api/routes/heroes')

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json())
app.use('/heroes', heroesRoutes)

module.exports = app
