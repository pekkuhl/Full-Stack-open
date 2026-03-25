import { useState } from 'react'

const Blog = ({ blog, updateBlogLike, removeBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const buttonStyle = {
    color: 'red',
  }

  const [informationVisible, setInformationVisible] = useState(false)

  const toggleVisibility = () => {
    setInformationVisible(!informationVisible)
  }

  return (
    <>
      {!informationVisible && (
        <div style={blogStyle}>
          {blog.title} {blog.author}
          <button type="button" onClick={toggleVisibility}>
            view
          </button>
        </div>
      )}
      {informationVisible && (
        <div style={blogStyle}>
          <div>
            {blog.title}
            <button type="button" onClick={toggleVisibility}>
              hide
            </button>
          </div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <button type="button" onClick={() => updateBlogLike(blog.id)}>
              like
            </button>
          </div>
          <div>{blog.author}</div>
          <div>
            {blog.user.username === user.username && (
              <button
                type="button"
                style={buttonStyle}
                onClick={() => removeBlog(blog.id)}
              >
                remove
              </button>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Blog
