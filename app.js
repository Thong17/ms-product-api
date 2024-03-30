require('dotenv').config()
require('./configs/database')
const cors = require('cors')
const logger = require('morgan')

const express = require('express')
const app = express()

app.use(cors({ origin: '*', credentials: true }))
app.use(express.json())
app.use(logger('common'))
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1', require('./routes/v1/router'))

app.listen(process.env.APP_PORT, () => {
    console.log(`App is running on port: ${process.env.APP_PORT}`)
})