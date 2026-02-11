const { test, describe } = require('node:test')
const assert = require('node:assert')

const totalLikes = require('../utils/list_helper').totalLikes

describe('total likes', () => {
  const blogs = [
    {
      _id : "698c5494babe336fe74920c4",
      title: "Aurinko",
      author: "Kirsi Huttunen",
      url: "http://blogspot.com/marjahuttunen/kuutamo",
      likes: 100,
      __v: 0
    }
  ]

  const manyblogs = [
    {
      _id : "11111111111111",
      title: "Metsä",
      author: "Maija Mehiläinen",
      url: "http://blogspot.com/maijanblogi",
      likes: 40,
      __v: 0
    },
    {
      _id : "22222222222222",
      title: "Puutarha",
      author: "Laura Maijala",
      url: "http://blogspot.com/lauranblogi",
      likes: 100,
      __v: 0
    },
    {
      _id : "33333333333333",
      title: "Perunapelto",
      author: "Kristiina Puu",
      url: "http://blogspot.com/krissenblogi",
      likes: 60,
      __v: 0
    }

  ]

  const blogsEmpty = []

  test('of empty list is zero', () => {
    assert.strictEqual(totalLikes(blogsEmpty), 0)
  })

  test('when list has only one blog equals the likes of that', () => {
    assert.strictEqual(totalLikes(blogs), 100)
  })

  test('of a bigger list is calculated right', () => {
    assert.strictEqual(totalLikes(manyblogs), 200)
  })
})
