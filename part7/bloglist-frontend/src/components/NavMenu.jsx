import { useContext } from 'react'
import UserContext from '../UserContext'
import { Link } from 'react-router'

const NavMenu = ({ handleLogout }) => {
  const { user } = useContext(UserContext)
  const navStyle = {
    background: 'lightgrey',
  }
  return (
    <div style={navStyle}>
      <p>
        <Link to={'/blogs'}>blogs</Link> <Link to={'/users'}>users</Link> logged
        in as {user && user.name}
        <button type="button" onClick={handleLogout}>
          logout
        </button>
      </p>
    </div>
  )
}

export default NavMenu
