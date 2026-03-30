import { NavLink } from 'react-router'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  console.log('-->', blog)

  return (
    <div style={blogStyle}>
      <NavLink to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </NavLink>
    </div>
  )
}

export default Blog
