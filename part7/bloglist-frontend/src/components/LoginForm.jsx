import { useContext } from 'react'
import Notification from './Notification'
import NotificationContext from '../NotificationContext'
import UserContext from '../UserContext'
import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { useNavigate } from 'react-router'

const LoginForm = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useContext(UserContext)
  const { createNotification } = useContext(NotificationContext)

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      login(user)
      setUsername('')
      setPassword('')
      navigate('/blogs')
    } catch (error) {
      createNotification('ERRORMESSAGE', 'Login failed')
      console.log(error)
    }
  }

  return (
    <div>
      <h2>log in to application</h2>
      <Notification />
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            {' '}
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit"> login </button>
      </form>
    </div>
  )
}

export default LoginForm
