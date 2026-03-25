import { useState, useEffect, useRef } from 'react'
import { useReducer } from 'react'
import { notificationReducer } from './reducers/notificationReducer'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import loginService from './services/login'
import CreateBlogsForm from './components/CreateBlogsForm'
import Togglable from './components/Togglable'
import NotificationContext from './NotificationContext'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, notificationDispatch] = useReducer(notificationReducer, {
    message: '',
    messageType: null,
  })

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
    })
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      notificationDispatch({ type: 'ERRORMESSAGE', payload: 'Login failed' })
      setTimeout(() => {
        notificationDispatch({ type: 'EMPTYMESSAGE' })
      }, 3000)
      console.log(error)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
  }

  const createNewBlog = async (title, author, url) => {
    try {
      const newBlog = { title, author, url }
      const response = await blogService.create(newBlog)
      setBlogs(blogs.concat(response))
      createBlogFormRef.current.toggleVisibility()
      notificationDispatch({
        type: 'SUCCESSMESSAGE',
        payload: `added a new blog succesfully: ${title} by ${author}`,
      })
      setTimeout(() => {
        notificationDispatch({ type: 'EMPTYMESSAGE' })
      }, 3000)
    } catch (error) {
      notificationDispatch({
        type: 'ERRORMESSAGE',
        payload: 'Failed to add a new blog',
      })
      setTimeout(() => {
        notificationDispatch({ type: 'EMPTYMESSAGE' })
      }, 3000)
      console.log(error)
    }
  }

  const updateBlogLike = async (id) => {
    try {
      const selectedBlog = blogs.find((blog) => blog.id === id)
      const updatedBlog = {
        ...selectedBlog,
        likes: selectedBlog.likes + 1,
      }
      const response = await blogService.update(updatedBlog)
      const updatedBlogList = blogs.map((blog) => {
        return blog.id === response.id ? response : blog
      })
      setBlogs(updatedBlogList)
      notificationDispatch({
        type: 'SUCCESSMESSAGE',
        payload: `You liked the blog: ${updatedBlog.title}`,
      })
      setTimeout(() => {
        notificationDispatch({ type: 'EMPTYMESSAGE' })
      }, 3000)
    } catch (error) {
      notificationDispatch({
        type: 'ERRORMESSAGE',
        payload: 'Failed to like the blog',
      })
      setTimeout(() => {
        notificationDispatch({ type: 'EMPTYMESSAGE' })
      }, 3000)
      console.log(error)
    }
  }

  const removeBlog = async (id) => {
    const confirmation = window.confirm(
      'Do you really want to remove this blog'
    )
    if (confirmation) {
      try {
        await blogService.remove(id)
        const newBlogList = blogs.filter((blog) => blog.id !== id)
        setBlogs(newBlogList)

        console.log('Sending dispatch now...')
        notificationDispatch({
          type: 'SUCCESSMESSAGE',
          payload: 'Blog deleted successfully',
        })
        console.log(notification.message)
        setTimeout(() => {
          notificationDispatch({ type: 'EMPTYMESSAGE' })
        }, 3000)
      } catch (error) {
        notificationDispatch({
          type: 'ERRORMESSAGE',
          payload: 'Failed to delete the blog',
        })
        setTimeout(() => {
          notificationDispatch({ type: 'EMPTYMESSAGE' })
        }, 3000)
        console.log(error)
      }
    }
  }

  const createBlogFormRef = useRef()

  return (
    <NotificationContext.Provider
      value={{ notification, notificationDispatch }}
    >
      <div>
        {!user && (
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
        )}

        {user && (
          <div>
            <Blogs
              removeBlog={removeBlog}
              updateBlogLike={updateBlogLike}
              blogs={blogs}
              user={user}
              handleLogout={handleLogout}
            />
            <Togglable
              btnLabel={'create new blog'}
              cancelBtnLabel={'cancel'}
              ref={createBlogFormRef}
            >
              <CreateBlogsForm createNewBlog={createNewBlog} />
            </Togglable>
          </div>
        )}
      </div>
    </NotificationContext.Provider>
  )
}

export default App
