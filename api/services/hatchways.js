"use strict"

const util = require("util")
const axios = require("axios")
const { getCache } = require("../utils/cache")

const API_URL = "https://api.hatchways.io/assessment/blog/posts?tag=%s"
const ONE_HOUR_IN_SECONDS = 3600

/**
 * @param {string} tag
 * @param {{ useCache: boolean }} [options]
 * @returns {Promise<Array<Object>>}
 */
async function getBlogPosts(tag, options = {}) {
  const { useCache } = options

  if (useCache) {
    return API._getBlogPostsFromCache(tag)
  }

  const { data } = await axios.get(util.format(API_URL, tag))

  const { posts } = data
  API._addBlogPostsToCache(tag, posts)

  return posts
}

/**
 * @param {string} tag
 * @return {Array<Object>}
 */
function _getBlogPostsFromCache(tag) {
  const posts = getCache().get(tag)

  if (posts) {
    return posts
  }

  return API.getBlogPosts(tag, { useCache: false })
}

/**
 * @param {string} tag
 * @param {Array<Object>} posts
 */
function _addBlogPostsToCache(tag, posts) {
  // As there is not max-age or Expires Header, we will use 1 hour as TTL
  return getCache().set(tag, posts, ONE_HOUR_IN_SECONDS)
}

const API = {
  _getBlogPostsFromCache,
  _addBlogPostsToCache,
  getBlogPosts,
}

module.exports = API
