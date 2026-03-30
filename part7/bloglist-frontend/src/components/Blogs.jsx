import Blog from './Blog'
import { Table, Button } from 'react-bootstrap'
import { useContext } from 'react'
import UserContext from '../UserContext'
import { Link } from 'react-router'

const Blogs = ({ blogs, updateBlogLike, removeBlog }) => {
  const { user } = useContext(UserContext)

  let sortedBlogs = []
  if (blogs.isSuccess) {
    sortedBlogs = blogs.data.map((data) => data)
    sortedBlogs.sort((a, b) => b.likes - a.likes)
  }
  return (
    <div>
      <h3>blogs</h3>
      <form>
        <div>
          <Link to="/createBlog">
            <Button>create new blog</Button>
          </Link>
        </div>
        {blogs.isLoading && <div> loading blogs </div>}
        {blogs.isError && <div> failed to load blogs </div>}
        {blogs.isSuccess && (
          <div>
            <Table bordered hover size="sm">
              <thead>
                <tr>
                  <th style={{ backgroundColor: 'rgb(201, 210, 252)' }}>
                    Blog name
                  </th>
                  <th style={{ backgroundColor: 'rgb(201, 210, 252)' }}>
                    Author name
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedBlogs.map((blog) => (
                  <Blog
                    key={blog.id}
                    blog={blog}
                    updateBlogLike={updateBlogLike}
                    removeBlog={removeBlog}
                    user={user}
                  />
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </form>
    </div>
  )
}

export default Blogs
