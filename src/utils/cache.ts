"use strict"

import NodeCache from "node-cache"

let cache: NodeCache | undefined

function getCache(): NodeCache {
  if (cache) {
    return cache
  }

  return (cache = new NodeCache())
}

export { getCache } 
