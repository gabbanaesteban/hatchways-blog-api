"use strict"

const asyncHandler = require("express-async-handler")

const { getPostsSchema } = require("../schemas/posts")
const helpers = require("../utils/helpers")
const postsService = require("../services/posts")

async function getPosts(req, res) {
  const { tags, sortBy, direction } = await helpers.validateParams(
    req.query,
    getPostsSchema
  )
  const response = await postsService.getPosts(tags, sortBy, direction)
  res.json(response)
}

const API = {
  getPosts: asyncHandler(getPosts),
}

module.exports = API
