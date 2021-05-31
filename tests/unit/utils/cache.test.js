"use strict"

const cache = require("../../../src/utils/cache")
const NodeCache = require("node-cache")

jest.mock("node-cache")

describe("cache.js", () => {
  describe("getCache()", () => {
    test("should create a new instance of NodeCache and store it to share it", () => {
      cache.getCache()
      cache.getCache()
      cache.getCache()
      expect(NodeCache).toHaveBeenCalledTimes(1)
    })
  })
})
