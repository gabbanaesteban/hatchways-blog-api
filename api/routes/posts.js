"use strict"

const { Router } = require("express")
const asyncHandler = require("express-async-handler")
const { getPosts } = require("../controllers/posts.js")

const routes = Router({ mergeParams: true })

routes.get("/", asyncHandler(getPosts))

module.exports = routes
