import Blog from './Blog'
import Notification from './Notification'

const Blogs = ({ blogs, user, handleLogout, updateBlogLike, removeBlog }) => {
  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <form>
        <p>
          logged in as {user && user.name}{' '}
          <button type="submit" onClick={handleLogout}>
            logout
          </button>
        </p>
        {blogs.map((blog) => (
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
