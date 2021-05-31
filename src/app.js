"use strict"

const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const swaggerUi = require("swagger-ui-express")
const router = require("./routes/router")

const swaggerDocument = require("../docs/swagger.json")

const app = express()

app.use(helmet())
app.use(cors())

app.use("/api", router)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

module.exports = app
