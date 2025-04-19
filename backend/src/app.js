const cors = require('cors')
const express = require('express')
const filesRouter = require('./routes/files')

const app = express()
app.use(cors())

app.use('/files', filesRouter)

module.exports = app
