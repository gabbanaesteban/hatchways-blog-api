"use strict"

const service = require("../../../src/services/posts")
const hatchways = require("../../../src/services/hatchways")

describe("posts.js", () => {
  let firstPost
  let mostLikedPost
  let mostPopularPost

  beforeEach(() => {
    firstPost = {
      author: "Rylee Paul",
      authorId: 9,
      id: 1,
      likes: 960,
      popularity: 0.13,
    }

    mostLikedPost = {
      ...firstPost,
      id: 2,
      likes: 99999,
    }

    mostPopularPost = {
      ...firstPost,
      id: 3,
      popularity: 0.99,
    }
  })

  afterEach(() => jest.restoreAllMocks())

  describe("getPosts()", () => {
    let tagsAsString
    let sortBy
    let direction
    let _aggregatePostsSpy

    beforeEach(() => {
      tagsAsString = "tech, health , history, tech "
      sortBy = "id"
      direction = "asc"
      _aggregatePostsSpy = jest
        .spyOn(service, "_aggregatePosts")
        .mockImplementation(() => [firstPost, firstPost, mostLikedPost, mostPopularPost])
    })

    test("should remove duplicated tags and trim them before calling the hatchways service", async () => {
      const expectedTags = ["tech", "health", "history"]

      await service.getPosts(tagsAsString, sortBy, direction)
      expect(_aggregatePostsSpy).toBeCalledTimes(1)
      expect(_aggregatePostsSpy).toBeCalledWith(expectedTags)
    })

    test("should remove duplicated posts", async () => {
      const result = await service.getPosts(tagsAsString, sortBy, direction)
      expect(result).toHaveProperty("posts")
      expect(result.posts).toHaveLength(3)
    })

    describe("when sorting by id", () => {
      let sortBy

      beforeEach(() => {
        sortBy = "id"
      })

      test("should sort in asc direction", async () => {
        const expected = [firstPost, mostLikedPost, mostPopularPost]
        const result = await service.getPosts(tagsAsString, sortBy, "asc")
        expect(result.posts).toEqual(expected)
      })

      test("should sort in desc direction", async () => {
        const expected = [mostPopularPost, mostLikedPost, firstPost]
        const result = await service.getPosts(tagsAsString, sortBy, "desc")
        expect(result.posts).toEqual(expected)
      })
    })

    describe("when sorting by likes", () => {
      let sortBy

      beforeEach(() => {
        sortBy = "likes"
      })

      test("should sort in asc direction", async () => {
        const expected = [firstPost, mostPopularPost, mostLikedPost]
        const result = await service.getPosts(tagsAsString, sortBy, "asc")
        expect(result.posts).toEqual(expected)
      })

      test("should sort in desc direction", async () => {
        const expected = [mostLikedPost, firstPost, mostPopularPost]
        const result = await service.getPosts(tagsAsString, sortBy, "desc")
        expect(result.posts).toEqual(expected)
      })
    })

    describe("when sorting by popularity", () => {
      let sortBy

      beforeEach(() => {
        sortBy = "popularity"
      })

      test("should sort in asc direction", async () => {
        const expected = [firstPost, mostLikedPost, mostPopularPost]
        const result = await service.getPosts(tagsAsString, sortBy, "asc")
        expect(result.posts).toEqual(expected)
      })

      test("should sort in desc direction", async () => {
        const expected = [mostPopularPost, firstPost, mostLikedPost]
        const result = await service.getPosts(tagsAsString, sortBy, "desc")
        expect(result.posts).toEqual(expected)
      })
    })
  })

  describe("_aggregatePosts()", () => {
    let tags
    let getBlogPostsSpy

    beforeEach(() => {
      tags = ["tech", "health", "history"]
      getBlogPostsSpy = jest
        .spyOn(hatchways, "getBlogPosts")
        .mockImplementationOnce(() => [firstPost])
        .mockImplementationOnce(() => [mostLikedPost])
        .mockImplementationOnce(() => [mostPopularPost])
    })
    test("should call hatchways service for each tag", async () => {
      await service._aggregatePosts(tags)
      for (const tag of tags) {
        expect(getBlogPostsSpy).toBeCalledWith(tag, { useCache: true })
      }
    })

    test("should faltten posts", async () => {
      const expected = [firstPost, mostLikedPost, mostPopularPost]
      const result = await service._aggregatePosts(tags)
      expect(result).toEqual(expected)
    })
  })
})
