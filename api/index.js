"use strict"

const express = require("express")
const morgan = require("morgan")
const helmet = require("helmet")

const router = require("./routes/router")

const app = express()

app.use(helmet())
app.use(morgan("dev"))

app.use('/api', router)

const port = process.env.PORT || 3001

app.listen(port, async () => {
  console.log(`Listening at http://localhost:${port}`)
})
