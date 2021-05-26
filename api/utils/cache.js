"use strict"

const NodeCache = require("node-cache")

let cache

function getCache() {
  if (cache) {
    return cache
  }

  return (cache = new NodeCache())
}

const API = {
  getCache,
}

module.exports = API
