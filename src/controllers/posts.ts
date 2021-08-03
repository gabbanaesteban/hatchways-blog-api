"use strict"

import { getPostsSchema } from "../schemas/posts"
import * as helpers from "../utils/helpers"
import * as postsService from "../services/posts"

async function getPosts(req, res) {
  const { tags, sortBy, direction } = await helpers.validateParams(
    req.query,
    getPostsSchema
  )
  
  const response = await postsService.getPosts(tags, sortBy, direction)
  
  res.json(response)
}

export { getPosts }
