const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const blogsRouter = require('./controllers/blogs')

mongoose.connect(config.mongoUrl, { family: 4 })
.then(() => {
  logger.info('connected to MongoDB')
})
.catch((error) => {
  logger.error('error connecting to MongoDB', error.message)
})
app.use(express.json())
app.use('/api/blogs', blogsRouter)

module.exports = app