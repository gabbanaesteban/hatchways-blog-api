"use strict"

import yup from "yup"

export const getPostsSchema = yup.object().shape({
  tags: yup.string().required("tags parameter is required"),
  sortBy: yup
    .string()
    .oneOf(
      ["id", "reads", "likes", "popularity"],
      "sortBy parameter is invalid"
    )
    .default("id"),
  direction: yup
    .string()
    .oneOf(["asc", "desc"], "direction parameter is invalid")
    .default("asc"),
})
