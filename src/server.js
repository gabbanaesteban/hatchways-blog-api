'use strict'

const app = require('./app')

const port = process.env.PORT || 3001

app.listen(port, async () => {
  console.log(`Listening @ http://localhost:${port}`)
  console.log(`Docs @ http://localhost:${port}/api-docs`)
})
