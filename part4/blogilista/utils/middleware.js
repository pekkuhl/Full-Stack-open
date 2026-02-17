const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === 'ValidationError') {
    response.status(400).json({ error: 'username has to be atleast 3 characters long'})
  } else if (error.name === 'MongoServerError') {
    response.status(400).json({ error: 'usernames need to be unique'})
  }

  next(error)
}

module.exports = errorHandler