"use strict"

const { uniq, uniqBy, flatten, orderBy } = require("lodash")
const { getBlogPosts } = require("./hatchways")

/**
 * @param {string} tagsAsString
 * @param {string} sortBy
 * @param {string} direction
 * @returns {Promise<{posts: Array<Object>}>}
 */
async function getPosts(tagsAsString, sortBy, direction) {
  const tags = uniq(tagsAsString.split(",").map((tag) => tag.trim()))
  const posts = await API._aggregatePosts(tags)
  const uniquePosts = uniqBy(posts, "id")

  return { posts: orderBy(uniquePosts, sortBy, direction) }
}

/**
 * @param {Array<string>} tags
 * @returns {Promise<{Array<Object>}>}
 */
async function _aggregatePosts(tags) {
  const promises = tags.map((tag) => getBlogPosts(tag, { useCache: true }))
  const posts = await Promise.all(promises)

  return flatten(posts)
}

const API = {
  getPosts,
  _aggregatePosts
}

module.exports = API
