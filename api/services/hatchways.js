"use strict"

const util = require("util")
const axios = require("axios")

const API_URL = "https://api.hatchways.io/assessment/blog/posts?tag=%s"

async function getBlogPosts(tag) {
  const { data } = await axios.get(util.format(API_URL, tag))
  return data.posts
}

const API =  { getBlogPosts }

module.exports = API
