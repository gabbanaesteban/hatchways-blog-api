"use strict"

const { getPostsSchema } = require("../schemas/posts")
const { validateParams } = require("../utils/helpers")
const postsService = require("../services/posts")

async function getPosts(req, res) {
  const { tags, sortBy, direction } = await validateParams(
    req.query,
    getPostsSchema
  )
  const response = await postsService.getPosts(tags, sortBy, direction)
  res.json(response)
}

const API = {
  getPosts,
}

module.exports = API
