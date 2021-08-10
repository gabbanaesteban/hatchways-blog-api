'use strict'

import asyncHandler from 'express-async-handler'
import { Router } from 'express'
import { getPosts } from '../controllers/posts.js'

const routes = Router({ mergeParams: true })

routes.get('/', asyncHandler(getPosts))

export default routes
