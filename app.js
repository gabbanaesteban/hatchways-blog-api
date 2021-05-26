"use strict"

const express = require("express")
const helmet = require("helmet")

const router = require("./api/routes/router")

const app = express()

app.use(helmet())

app.use('/api', router)

module.exports = app
