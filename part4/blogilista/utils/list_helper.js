const dummy = (blogs) => {
  return 1
}



const totalLikes = (blogs) => {
  if (blogs.length !== 0) {
    const result = blogs.reduce((sum, blog) => sum + blog.likes, 0)
    return result
  }
  else return 0
}


module.exports = {
  dummy,
  totalLikes
}