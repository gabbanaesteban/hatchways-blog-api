'use strict'

import { readFileSync } from 'fs'

import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import * as yaml from 'js-yaml'
import swaggerUi from 'swagger-ui-express'

import router from './routes/router.js'

const swaggerDocument = yaml.load(readFileSync(new URL('../docs/swagger.yml', import.meta.url), 'utf8'))

const app = express()

app.use(helmet())
app.use(cors())

app.use('/api', router)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

export default app
