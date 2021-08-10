'use strict'

import NodeCache from 'node-cache'

let cache

function getCache() {
  if (cache) {
    return cache
  }

  return (cache = new NodeCache())
}

export { getCache }
