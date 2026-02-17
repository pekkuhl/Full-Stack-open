const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === 'ValidationError') {
    response.status(400).json({ error: 'username has to be atleast 3 characters long'})
  } else if (error.name === 'MongoServerError') {
    response.status(400).json({ error: 'username needs to be unique'})
  } else if (error.name === 'JsonWebTokenError') {
    response.status(401).json({ error: 'Invalid Token' })
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  } else {
    request.token =  null
  }
  
  next()
}


module.exports = {
  errorHandler,
  tokenExtractor
}
