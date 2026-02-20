import Blog from "./Blog"
import Notification from "./Notification"
import ErrorNotification from "./ErrorNotification"

const Blogs = ({blogs, user, handleLogout, errorMessage, message}) => {
  return <div>
  <h2>blogs</h2>
  <Notification message={message}/>
  <ErrorNotification errorMessage={errorMessage} />
  <form>
  <p>logged in as {user && user.name } <button type="submit"  onClick={handleLogout} >logout</button></p>
  {blogs.map(blog =>
    <Blog key={blog.id} blog={blog} />
  )}
  </form>
  </div>
}

export default Blogs