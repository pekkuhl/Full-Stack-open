import { useEffect } from 'react'
import { useReducer } from 'react'
import { notificationReducer } from './reducers/notificationReducer'
import { userReducer } from './reducers/userReducer'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Routes, Route, Link, NavLink } from 'react-router'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import User from './components/User'
import Blogs from './components/Blogs'
import BlogView from './components/BlogView'
import CreateBlogsForm from './components/CreateBlogsForm'
import Notification from './components/Notification'
import NotificationContext from './NotificationContext'
import UserContext from './UserContext'

const App = () => {
  const [user, userDispatch] = useReducer(userReducer, null)
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

  const login = (user) => {
    userDispatch({
      type: 'LOGIN',
      payload: user,
    })
  }

  const logout = () => {
    userDispatch({
      type: 'LOGOUT',
    })
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
      createNotification('SUCCESSMESSAGE', 'you likes the blog successfully')
    },
    onError: () => {
      createNotification('ERRORMESSAGE', 'Failed to like the blog')
    },
  })

  const removeBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
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
      login(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.clear()
    logout()
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

  return (
    <UserContext.Provider value={{ user, userDispatch, login }}>
      <NotificationContext.Provider
        value={{ notification, notificationDispatch, createNotification }}
      >
        <div>
          {!user && <LoginForm />}

          {user && (
            <div>
              <Notification />
              <Routes>
                <Route
                  path="/blogs"
                  element={
                    <Blogs
                      removeBlog={removeBlog}
                      updateBlogLike={updateBlogLike}
                      blogs={blogs}
                      handleLogout={handleLogout}
                    />
                  }
                />

                <Route
                  path="/createblog"
                  element={<CreateBlogsForm createNewBlog={createNewBlog} />}
                />
                <Route path="/users/*" element={<Users />} />
                <Route path="/users/:id" element={<User />} />
                <Route
                  path="/blogs/:blog"
                  element={<BlogView updateBlogLike={updateBlogLike} />}
                />
              </Routes>
            </div>
          )}
        </div>
      </NotificationContext.Provider>
    </UserContext.Provider>
  )
}

export default App
