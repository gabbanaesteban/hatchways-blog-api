'use strict'

import { getPostsSchema } from '../schemas/posts.js'
import * as helpers from '../utils/helpers.js'
import * as postsService from '../services/posts.js'

async function getPosts(req, res) {
  const { tags, sortBy, direction } = await helpers.validateParams(req.query, getPostsSchema)

  const response = await postsService.getPosts(tags, sortBy, direction)

  res.json(response)
}

export { getPosts }
