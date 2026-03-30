const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const assert = require('node:assert')
const helper = require('./test_helper')
const User = require('../models/user')



describe('tests for creating user', () => {

  beforeEach(async () => {
    await User.deleteMany({})

    const testUser = new User({
      username: 'testUser',
      name: 'test',
      passwordHash: 'testHash'
    })

    await testUser.save()

  })

  test('user with username that has less than 3 characters is not created', async () => {

    const newUser = {
      username: "pk",
      name: "Pekka K",
      password: 'testi'
    }

    const response = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

    const usersAtEnd = await User.find({})
    console.log(response.body.error)

    assert.strictEqual(response.body.error, 'username has to be atleast 3 characters long')
    assert.strictEqual(usersAtEnd.length, 1)
  })

  test('user with password less than 3 characters is not created', async () => {

    const newUser = {
      username: "pekku",
      name: "Pekka K",
      password: 'pw'
    }

    const response = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

    const usersAtEnd = await User.find({})

    assert.strictEqual(response.body.error, 'password has to be atleast 3 characters long')
    assert.strictEqual(usersAtEnd.length, 1)
  })

  test('user with empty username is not created', async () => {
    const newUser = {
      name: "Pekka K",
      password: 'test'
    }

    const response = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

    const usersAtEnd = await User.find({})

    assert.strictEqual(response.body.error, 'Cannot create user without an username')
    assert.strictEqual(usersAtEnd.length, 1)
  })

  test('user with empty password is not created', async () => {

    const newUser = {
      username: "pekku",
      name: "Pekka K",
    }

    const response = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

    const usersAtEnd = await User.find({})



    assert.strictEqual(response.body.error, 'Cannot create user without a password')
    assert.strictEqual(usersAtEnd.length, 1)
  })

  test('user with duplicate username is not created', async () => {
    const newUser = {
      username: "testUser",
      name: "testName",
      password: "testpassword"
    }

    const response = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

    const usersAtEnd = await User.find({})

    assert.strictEqual(response.body.error, 'username needs to be unique')
    assert.strictEqual(usersAtEnd.length, 1)
  })


  after(async() => {
    await mongoose.connection.close()
  })
  
}
)