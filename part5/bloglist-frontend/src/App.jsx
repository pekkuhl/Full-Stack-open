import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import loginService from './services/login'
import CreateBlogsForm from './components/CreateBlogsForm'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)



  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

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
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (error) {
      setErrorMessage("Wrong username or password")
      setTimeout(() => {
        setErrorMessage(null)
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
      setMessage(`added a new blog succesfully: ${title} by ${author}`)
      setTimeout(() => {
        setMessage(null)
      },3000)
    }
    catch (error) {
      setErrorMessage('Failed to add a new blog')
      setTimeout(() => {
        setErrorMessage(null)
      },3000)
      console.log(error)
    }
    
  }



  
 

  return (
    <div>
      {!user && (
      <LoginForm
      handleLogin={handleLogin}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      errorMessage={errorMessage}
      />)}

      {user && (
      <div>
      <Blogs
      blogs={blogs}
      user={user}
      handleLogout={handleLogout}
      errorMessage={errorMessage}
      message={message}
      />

      <CreateBlogsForm
      createNewBlog={createNewBlog}/>
      </div>
      )}
    </div>
  )
}

export default App