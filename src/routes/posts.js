"use strict"

const { Router } = require("express")
const { getPosts } = require("../controllers/posts.js")

const routes = Router({ mergeParams: true })

routes.get("/", getPosts)

module.exports = routes
