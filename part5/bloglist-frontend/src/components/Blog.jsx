import { useState } from 'react'

const Blog = ({ blog, updateBlogLike, removeBlog, user }) => {
  console.log(blog)
  console.log(user)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const buttonStyle = {
    color: 'red'
  }

  const [informationVisible, setInformationVisible] = useState(false)

  const hide = { display: informationVisible ? 'none' : '' }
  const show = { display: informationVisible ? '' : 'none' }

  const toggleVisibility = () => {
    setInformationVisible(!informationVisible)
  }

  return (
    <>
      <div style={{ ...hide, ...blogStyle }}>
        {blog.title} {blog.author}
        <button type="button" onClick={toggleVisibility}>view</button>
      </div>
      <div style={{ ...show, ...blogStyle }}>
        {blog.title}<button type="button" onClick={toggleVisibility}>hide</button>{<br/>}
        {blog.url}{<br/>}
    likes {blog.likes}<button type="button" onClick={() => updateBlogLike(blog.id)}>like</button>{<br/>}
        {blog.author}{<br/>}
        {blog.user.username === user.username && (
          <button type="button" style={buttonStyle} onClick={() => removeBlog(blog.id)}>remove</button>
        )}
      </div>
    </>
  )}

export default Blog