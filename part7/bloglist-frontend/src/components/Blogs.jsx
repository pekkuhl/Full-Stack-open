import Blog from './Blog'
import Notification from './Notification'
import { useContext } from 'react'
import UserContext from '../UserContext'
import { Link } from 'react-router'

const Blogs = ({ blogs, handleLogout, updateBlogLike, removeBlog }) => {
  const { user } = useContext(UserContext)

  let sortedBlogs = []
  if (blogs.isSuccess) {
    sortedBlogs = blogs.data.map((data) => data)
    sortedBlogs.sort((a, b) => b.likes - a.likes)
  }
  return (
    <div>
      <h2>blogs</h2>
      <form>
        <p>
          logged in as {user && user.name}{' '}
          <button type="button" onClick={handleLogout}>
            logout
          </button>
        </p>
        <div>
          <Link to="/createBlog">
            <button>create new blog</button>
          </Link>
          <Link to="/users">
            <button>Users</button>
          </Link>
        </div>
        {blogs.isLoading && <div> loading blogs </div>}
        {blogs.isError && <div> failed to load blogs </div>}
        {blogs.isSuccess &&
          sortedBlogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateBlogLike={updateBlogLike}
              removeBlog={removeBlog}
              user={user}
            />
          ))}
      </form>
    </div>
  )
}

export default Blogs
