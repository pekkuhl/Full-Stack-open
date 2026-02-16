const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const assert = require('node:assert')
const helper = require('./test_helper')
const Blog = require('../models/blog')


beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})


//testi http get pyynnölle, oikea määrä json muotoisia blogeja
test('correct amount of notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  console.log(response.body)
  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

//test onko palautetun blogolion key value id, eikä atlaksen default _id
test('returned blog id is named id, NOT _id', async () => {
  await api
    .get('/api/blogs')
    .expect(200)

  const response = await api.get('/api/blogs')
  const keyValues = Object.keys(response.body[0])
  assert(keyValues.includes('id') && !keyValues.includes('_id'))
})

after(async() => {
  await mongoose.connection.close()
})