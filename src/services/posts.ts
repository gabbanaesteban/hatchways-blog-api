"use strict"

import { uniq, uniqBy, orderBy } from "lodash"
import * as hatchways from "./hatchways"

/**
 * @param {string} tagsAsString
 * @param {string} sortBy
 * @param {string} direction
 * @returns {Promise<{posts: Array<Object>}>}
 */
async function getPosts(tagsAsString: string, sortBy: string, direction: string) {
  const tags = uniq(tagsAsString.split(",").map((tag) => tag.trim()))
  const posts = await aggregatePosts(tags)
  const uniquePosts = uniqBy(posts, "id")

  return { posts: orderBy(uniquePosts, sortBy, direction) }
}

/**
 * @param {Array<string>} tags
 * @returns {Promise<{Array<Object>}>}
 */
async function aggregatePosts(tags) {
  const promises = tags.map((tag) => hatchways.getBlogPosts(tag, { useCache: true }))
  const posts = await Promise.all(promises)

  return posts.flat()
}

export { getPosts }
