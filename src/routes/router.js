"use strict"

const { Router } = require("express")
const postsRoutes = require("./posts")
const { notFound, errorHandler } = require("../middlewares/error")

const router = Router()

router.use("/posts", postsRoutes)

router.use("/ping", (req, res) => {
  res.json({ success: true })
})

router.use(notFound)
router.use(errorHandler)

module.exports = router
