import { useState, useEffect, useRef } from 'react'
import { useReducer } from 'react'
import { notificationReducer } from './reducers/notificationReducer'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import loginService from './services/login'
import CreateBlogsForm from './components/CreateBlogsForm'
import Togglable from './components/Togglable'
import NotificationContext from './NotificationContext'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, notificationDispatch] = useReducer(notificationReducer, {
    message: '',
    messageType: null,
  })

  const createNotification = (type, payload = '') => {
    notificationDispatch({
      type: type,
      payload: payload,
    })
    setTimeout(() => {
      notificationDispatch({ type: 'EMPTYMESSAGE' })
    }, 3000)
  }

  const queryClient = useQueryClient()

  const blogs = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  })

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      createBlogFormRef.current.toggleVisibility()
      createNotification('SUCCESSMESSAGE', 'added a new blog successfully')
    },
    onError: () => {
      createNotification('ERRORMESSAGE', 'Failed to add a new blog')
    },
  })

  const updateLikeMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      createNotification('SUCCESSMESSAGE', 'You liked a blog')
    },
    onError: () => {
      createNotification('ERRORMESSAGE', 'Failed to like the blog')
    },
  })

  const removeBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      createNotification('SUCCESSMESSAGE', 'Blog removed succesfully')
    },
    onError: () => {
      createNotification('ERRORMESSAGE', 'Failed to delete the blog')
    },
  })

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

  const createNewBlog = (title, author, url) => {
    const newBlog = { title, author, url }
    newBlogMutation.mutate(newBlog)
  }

  const updateBlogLike = (id) => {
    const selectedBlog = blogs.data.find((blog) => blog.id === id)
    const updatedBlog = {
      ...selectedBlog,
      likes: selectedBlog.likes + 1,
    }
    updateLikeMutation.mutate(updatedBlog)
  }

  const removeBlog = (id) => {
    const confirmation = window.confirm(
      'Do you really want to remove this blog'
    )
    if (confirmation) {
      removeBlogMutation.mutate(id)
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
