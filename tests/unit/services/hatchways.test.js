"use strict"

const axios = require("axios")
const cache = require("../../../src/utils/cache")
const service = require("../../../src/services/hatchways")

describe("hatchways.js", () => {
  let tag
  let axiosGetSpy
  let data

  beforeEach(() => {
    tag = "tech"
    data = { posts: [] }
    axiosGetSpy = jest.spyOn(axios, "get").mockResolvedValue({ data })
  })

  afterEach(() => jest.restoreAllMocks())

  describe("getBlogPosts()", () => {
    describe("when useCache is false", () => {
      test("should call hatchways api and save in cache", async () => {
        const _getBlogPostsFromCacheSpy = jest.spyOn(service, "_getBlogPostsFromCache")
        const _addBlogPostsToCacheSpy = jest.spyOn(service, "_addBlogPostsToCache")
        const result = await service.getBlogPosts(tag)

        expect(_getBlogPostsFromCacheSpy).toBeCalledTimes(0)
        expect(_addBlogPostsToCacheSpy).toBeCalledWith(tag, data.posts)
        expect(axiosGetSpy).toBeCalledTimes(1)
        expect(axiosGetSpy).toBeCalledWith(expect.stringMatching(tag))
        expect(result).toEqual(data.posts)
      })
    })

    describe("when useCache is true", () => {
      test("should look in cache and not call the hatchways api", async () => {
        const _getBlogPostsFromCacheSpy = jest
          .spyOn(service, "_getBlogPostsFromCache")
          .mockImplementation(() => data.posts)
        const _addBlogPostsToCacheSpy = jest.spyOn(service, "_addBlogPostsToCache")
        const result = await service.getBlogPosts(tag, { useCache: true })

        expect(_getBlogPostsFromCacheSpy).toBeCalledTimes(1)
        expect(axiosGetSpy).toBeCalledTimes(0)
        expect(_addBlogPostsToCacheSpy).toBeCalledTimes(0)
        expect(result).toEqual(data.posts)
      })
    })
  })

  describe("_getBlogPostsFromCache()", () => {
    describe("where there is no data in cache", () => {
      test("should call getBlogPosts with useCache as false", () => {
        const getBlogPostsSpy = jest.spyOn(service, "getBlogPosts").mockImplementation(() => jest.fn())
        const getCacheSpy = jest.spyOn(cache, "getCache").mockImplementation(() => {
          return { get: jest.fn() }
        })

        service._getBlogPostsFromCache(tag)

        expect(getCacheSpy.mock.results[0].value.get).toBeCalledTimes(1)
        expect(getBlogPostsSpy).toBeCalledTimes(1)
        expect(getBlogPostsSpy).toBeCalledWith(tag, { useCache: false })
      })
    })

    describe("where there is data in cache", () => {
      test("should return the data stored in cache", () => {
        const getBlogPostsSpy = jest.spyOn(service, "getBlogPosts")
        const getCacheSpy = jest.spyOn(cache, "getCache").mockImplementation(() => {
          return { get: jest.fn(() => []) }
        })

        service._getBlogPostsFromCache(tag)

        expect(getCacheSpy.mock.results[0].value.get).toBeCalledTimes(1)
        expect(getBlogPostsSpy).toBeCalledTimes(0)
      })
    })
  })

  describe("_addBlogPostsToCache()", () => {
    test("should store data in cache for one hour", () => {
      const posts = []  
      const getCacheSpy = jest.spyOn(cache, "getCache").mockImplementation(() => {
          return { set: jest.fn(() => true) }
        })

        service._addBlogPostsToCache(tag, posts)

        expect(getCacheSpy.mock.results[0].value.set).toBeCalledTimes(1)
        expect(getCacheSpy.mock.results[0].value.set).toBeCalledWith(tag, posts, 3600)
    })
  })
})
