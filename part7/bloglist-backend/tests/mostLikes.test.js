const {test, describe } = require('node:test')
const assert = require('node:assert')

const mostLikes = require('../utils/list_helper').mostLikes

describe('most likes', () => {
  const bloglist = [
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
      author: "Laura Maijala",
      url: "http://blogspot.com/krissenblogi",
      likes: 60,
      __v: 0
    },
    {
      _id : "11111111111111",
      title: "Metsä",
      author: "Seppo Kivisuo",
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
    },
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

  const result = {
    author: "Laura Maijala",
    likes: 360
  }

  test('list of blogs return the author with most blogs and count of blogs', () => {
    assert.deepStrictEqual(mostLikes(bloglist), result)
  })
})