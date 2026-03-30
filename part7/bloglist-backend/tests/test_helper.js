const Blog = require('../models/blog')

  const initialBlogs = [
    {
      title: "Metsä",
      author: "Maija Mehiläinen",
      url: "http://blogspot.com/maijanblogi",
      likes: 40,
    },
    {
      title: "Puutarha",
      author: "Laura Maijala",
      url: "http://blogspot.com/lauranblogi",
      likes: 100,
    }
  ]

  const blogsinDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }

  module.exports = {
    initialBlogs, blogsinDb
  }