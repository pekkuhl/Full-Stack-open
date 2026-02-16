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

const favoriteBlog = (blogs) => {
  if (blogs.length !== 0) {
    let favBlog;
    let maxLikes = 0;
    blogs.forEach(blog => {
      if (blog.likes > maxLikes) {
        maxLikes = blog.likes
        favBlog = blog
      }
      else {
        maxLikes = maxLikes
        favBlog = favBlog
        
      }
    })
    return favBlog
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length !== 0) {
    let authorWithMostBlogs;
    let authorList = []
    let mostBlogs = 0;

    blogs.forEach(blog => {
      if (!authorList.some(author => author.author === blog.author)) {
        const newAuthor = { author: blog.author, blogs: 1}
        authorList = authorList.concat(newAuthor)
      }
      else {
        const currentAuthor = authorList.find(listAuthor => listAuthor.author === blog.author)
        currentAuthor.blogs++
      }
    })

    authorList.forEach(author => {
      if (author.blogs > mostBlogs) {
        authorWithMostBlogs = author.author
        mostBlogs = author.blogs
      }
    })
      console.log("-->",authorWithMostBlogs)
      console.log("===>",mostBlogs)
      return {
        author: authorWithMostBlogs,
        blogs: mostBlogs
      }
  }
}

const mostLikes = (blogs) => {
  if (blogs.length !== 0) {
    let authorWithMostLikes;
    let authorList = []
    let mostLikes = 0;

    blogs.forEach(blog => {
      if (!authorList.some(author => author.author === blog.author)) {
        const newAuthor = { author: blog.author, likes: blog.likes}
        authorList = authorList.concat(newAuthor)
      }
      else {
        const currentAuthor = authorList.find(listAuthor => listAuthor.author === blog.author)
        currentAuthor.likes += blog.likes
      }
    })

    authorList.forEach(author => {
      if (author.likes > mostLikes) {
        authorWithMostLikes = author.author
        mostLikes = author.likes
      }
    })
      console.log("-->",authorWithMostLikes)
      console.log("===>",mostLikes)
      return {
        author: authorWithMostLikes,
        likes: mostLikes
      }
  }
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}