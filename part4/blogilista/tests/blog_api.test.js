const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const assert = require('node:assert')
const helper = require('./test_helper')
const Blog = require('../models/blog')





describe('blog tests for get, post, delete and put', () => {
  beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})


//testi http get pyynnölle, oikea määrä json muotoisia blogeja
test('correct amount of notes are returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

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



//test että sovellukseen voi lisätä blogeja post pyynnöllä ja blogien määrä kasvaa
test('blogs can be added with POST and the amount increase', async () => {

  const newBlog = {
    title: 'testTitle',
    author: 'testAuthor',
    url: 'testUrl',
    likes: 12345
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const blogsAfterPost = await helper.blogsinDb()
    assert.strictEqual(blogsAfterPost.length, helper.initialBlogs.length + 1)
})

//test että jos likes ei ole annettu palauttaa sen nollana (default)
test('blog likes undefined gives it value 0', async () => {

  const newBlog = {
    title: 'testTitle',
    author: 'testAuthor',
    url: 'testUrl',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

    const blogsAfterPost = await helper.blogsinDb()
    const addedBlog = blogsAfterPost[blogsAfterPost.length -1]

    assert.strictEqual(addedBlog.likes, 0)
})

//jos blogilla ei ole titleä tai url se on bad request(400)
test('if new blog doesnt contain title or url its a bad request', async () => {

  const newBlogNoTitle = {
    author: 'testAuthor',
    url: 'testUrl',
  }

  const newBlogNoUrl = {
    title: 'testTitle',
    author: 'testAuthor'
  }

  const responseNoTitle = await api
    .post('/api/blogs')
    .send(newBlogNoTitle)
    .expect(400)
  
  assert.strictEqual(responseNoTitle.status, 400)
  
  const responseNoUrl = await api
    .post('/api/blogs')
    .send(newBlogNoUrl)
    .expect(400)

  assert.deepStrictEqual(responseNoUrl.status, 400)
})

//testi että yksittäisen blogin voi hakea id avulla onnistuneesti
test('returning a specific blog with its id works succesfully', async () => {
  const allBlogs = await helper.blogsinDb()
  const oneBlog = allBlogs[0]

  const resultBlog = await api
    .get(`/api/blogs/${oneBlog.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
  assert.deepEqual(resultBlog.body, oneBlog)
})

//testi lukumäärän päivityksen onnistumisesta
test('updating likes with put returns json with updated likes', async () => {
  const allBlogs = await helper.blogsinDb()
  const blogsForUpdate = allBlogs[0]

  const updatedBlog = await api
    .put(`/api/blogs/${blogsForUpdate.id}`)
    .send({likes: blogsForUpdate.likes + 1})
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert(updatedBlog.body.likes, blogsForUpdate.likes + 1)
})

after(async() => {
  await mongoose.connection.close()
})

})