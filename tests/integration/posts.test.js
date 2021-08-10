'use strict'

const request = require('supertest')

const app = require('../../src/app')

jest.mock('../../src/services/hatchways', () => {
  return { getBlogPosts: () => [] }
})

describe('GET /api/posts', () => {
  describe('when tags query string is missing', () => {
    test('should return with 400 as status code', async () => {
      const response = await request(app).get('/api/posts')
      expect(response.statusCode).toBe(400)
    })

    test('should has the error message in the response', async () => {
      const response = await request(app).get('/api/posts')
      expect(response.body).toHaveProperty('error', 'tags parameter is required')
    })
  })

  describe('when sortBy query string has an invalid value', () => {
    test('should return with 400 as status code', async () => {
      const response = await request(app).get('/api/posts?tags=tech&sortBy=bar')
      expect(response.statusCode).toBe(400)
    })

    test('should has the error message in the response', async () => {
      const response = await request(app).get('/api/posts?tags=tech&sortBy=bar')
      expect(response.body).toHaveProperty('error', 'sortBy parameter is invalid')
    })
  })

  describe('when direction query string has an invalid value', () => {
    test('should return with 400 as status code', async () => {
      const response = await request(app).get('/api/posts?tags=tech&direction=bar')
      expect(response.statusCode).toBe(400)
    })

    test('should has the error message in the response', async () => {
      const response = await request(app).get('/api/posts?tags=tech&direction=bar')
      expect(response.body).toHaveProperty('error', 'direction parameter is invalid')
    })
  })

  describe('when sortBy is missing', () => {
    test('should return with 200 as status code', async () => {
      const response = await request(app).get('/api/posts?tags=tech&direction=asc')
      expect(response.statusCode).toBe(200)
      expect(response.body).toHaveProperty('posts', [])
    })
  })

  describe('when direction is missing', () => {
    test('should return with 200 as status code', async () => {
      const response = await request(app).get('/api/posts?tags=tech&sortBy=id')
      expect(response.statusCode).toBe(200)
      expect(response.body).toHaveProperty('posts', [])
    })
  })

  describe('when sortBy has a valid value', () => {
    test('should return with 200 as status code', async () => {
      const response = await request(app).get('/api/posts?tags=tech&sortBy=id')
      expect(response.statusCode).toBe(200)
      expect(response.body).toHaveProperty('posts', [])
    })
  })

  describe('when direction has a valid value', () => {
    test('should return with 200 as status code', async () => {
      const response = await request(app).get('/api/posts?tags=tech&direction=asc')
      expect(response.statusCode).toBe(200)
      expect(response.body).toHaveProperty('posts', [])
    })
  })

  describe('when tags is provided', () => {
    test('should return with 200 as status code', async () => {
      const response = await request(app).get('/api/posts?tags=tech')
      expect(response.statusCode).toBe(200)
      expect(response.body).toHaveProperty('posts', [])
    })
  })
})
