"use strict"

import express from "express"
import helmet from "helmet"
import cors from "cors"
import swaggerUi from "swagger-ui-express"

import router from "./routes/router"

import swaggerDocument from "../docs/swagger.json"

const app = express()

app.use(helmet())
app.use(cors())

app.use("/api", router)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

module.exports = app
