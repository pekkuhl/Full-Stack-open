import Notification from './Notification'

const loginForm = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
}) => (
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

export default loginForm
