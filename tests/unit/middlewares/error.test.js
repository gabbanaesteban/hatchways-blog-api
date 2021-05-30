"use strict"

const httpErros = require("http-errors")
const errorMiddleware = require("../../../src/middlewares/error")

describe("error.js", () => {
  describe("notFound()", () => {
    let originalUrl
    let req
    let next
    let notFoundSpy

    beforeEach(() => {
      originalUrl = "foo"
      req = { originalUrl }
      next = jest.fn()
      notFoundSpy = jest.spyOn(httpErros, "NotFound")
    })

    test("creates a NotFound http error", () => {
      errorMiddleware.notFound(req, {}, next)

      expect(notFoundSpy).toHaveBeenCalledWith(expect.stringMatching(/Not Found/))
      expect(notFoundSpy).toHaveBeenCalledWith(expect.stringMatching(originalUrl))
    })

    test("calls next with the new http error as argument", () => {
      errorMiddleware.notFound(req, {}, next)
      const expectedError = notFoundSpy.mock.results[0].value

      expect(next).toHaveBeenCalledWith(expectedError)
    })
  })

  describe("errorHandler()", () => {
    let originalNodeEnv
    let res
    let error

    beforeEach(() => {
      originalNodeEnv = process.env.NODE_ENV
      res = { json: jest.fn(), status: jest.fn() }
      error = {
        message: "This is an error message",
        stack: "this is the stack",
      }
    })

    afterEach(() => {
      process.env.NODE_ENV = originalNodeEnv
    })

    describe("when the error does not have a status code", () => {
      test("should set the response status to 500", () => {
        errorMiddleware.errorHandler(error, {}, res)
        expect(res.status).toHaveBeenCalledWith(500)
      })
    })

    describe("when the error has a status code", () => {
      test("should set the response status to error statusCode", () => {
        const statusCode = 400
        const errorWithStatusCode = { ...error, statusCode }
        errorMiddleware.errorHandler(errorWithStatusCode, {}, res)
        expect(res.status).toHaveBeenCalledWith(statusCode)
      })
    })

    describe("when in production env", () => {
      test("should remove stack from response", () => {
        const expected = { error: error.message, stack: null }
        process.env.NODE_ENV = "production"
        
        errorMiddleware.errorHandler(error, {}, res)
        expect(res.json).toHaveBeenCalledWith(expected)
      })
    })

    describe("when not in production env", () => {
      test("should have stack in response", () => {
        const expected = { error: error.message, stack: error.stack }
        process.env.NODE_ENV = "dev"

        errorMiddleware.errorHandler(error, {}, res)
        expect(res.json).toHaveBeenCalledWith(expected)
      })
    })
  })
})
