import { useContext } from 'react'
import Notification from './Notification'
import NotificationContext from '../NotificationContext'
import UserContext from '../UserContext'
import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { useNavigate } from 'react-router'
import { Button, Form, Container } from 'react-bootstrap'

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
    <Container>
      <h2>log in to application</h2>
      <Notification />
      <Form onSubmit={handleLogin}>
        <div>
          <Form.Label>
            username
            <Form.Control
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </Form.Label>
        </div>
        <div>
          <Form.Label>
            password
            <Form.Control
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </Form.Label>
        </div>
        <Button type="submit"> login </Button>
      </Form>
    </Container>
  )
}

export default LoginForm
