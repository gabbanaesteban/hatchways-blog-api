'use strict'

import { Router } from 'express'
import postsRoutes from './posts.js'
import { notFound, errorHandler } from '../middlewares/error.js'

const router = Router()

router.use('/posts', postsRoutes)

router.use('/ping', (req, res) => {
  res.json({ success: true })
})

router.use(notFound)
router.use(errorHandler)

export default router
