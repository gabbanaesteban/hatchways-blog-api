"use strict"

const postsService = require("../../../api/services/posts")
const postsController = require("../../../api/controllers/posts")
const helpers = require("../../../api/utils/helpers")
const { getPostsSchema } = require("../../../api/schemas/posts")

describe("posts.js", () => {
  let validateParamsSpy
  let res

  beforeEach(() => {
    res = { json: jest.fn() }
    validateParamsSpy = jest.spyOn(helpers, "validateParams")
  })

  describe("getPosts()", () => {
    let tags
    let sortBy
    let direction
    let query
    let getPostsSpy

    beforeEach(() => {
      tags = "tech"
      sortBy = "id"
      direction = "asc"
      query = { tags, sortBy, direction }
      getPostsSpy = jest.spyOn(postsService, "getPosts").mockResolvedValue({ posts: [] })
    })

    test("should validate query params", async () => {
      await postsController.getPosts({ query }, res)
      expect(validateParamsSpy).toHaveBeenCalledWith(query, getPostsSchema)
    })

    test("should call response with data from service", async () => {
      await postsController.getPosts({ query }, res)
      expect(getPostsSpy).toHaveBeenCalledWith(tags, sortBy, direction)
      expect(res.json).toHaveBeenCalledWith(await getPostsSpy.mock.results[0].value)
    })
  })
})
