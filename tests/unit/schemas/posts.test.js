'use strict'

const { getPostsSchema } = require('../../../src/schemas/posts')
const { validateParams } = require('../../../src/utils/helpers')

describe('posts.js', () => {
  describe('getPostsSchema', () => {
    let params

    beforeEach(() => {
      params = {
        tags: 'tech,health',
        sortBy: 'likes',
        direction: 'desc'
      }
    })

    describe('tags', () => {
      test('should not throw when valid', async () => {
        await expect(validateParams(params, getPostsSchema)).resolves.toEqual(params)
      })

      test('it is required', async () => {
        delete params.tags
        await expect(validateParams(params, getPostsSchema)).rejects.toThrow(/required/)
      })
    })

    describe('sortBy', () => {
      test('should not throw when valid', async () => {
        for (const value of ['id', 'popularity', 'likes']) {
          params.sortBy = value
          await expect(validateParams(params, getPostsSchema)).resolves.toEqual(params)
        }
      })

      test('should use id as default', async () => {
        delete params.sortBy
        const expected = { ...params, sortBy: 'id' }
        await expect(validateParams(params, getPostsSchema)).resolves.toEqual(expected)
      })
    })

    describe('direction', () => {
      test('should not throw when valid', async () => {
        for (const value of ['asc', 'desc']) {
          params.direction = value
          await expect(validateParams(params, getPostsSchema)).resolves.toEqual(params)
        }
      })

      test('should use asc as default', async () => {
        delete params.direction
        const expected = { ...params, direction: 'asc' }
        await expect(validateParams(params, getPostsSchema)).resolves.toEqual(expected)
      })
    })
  })
})
