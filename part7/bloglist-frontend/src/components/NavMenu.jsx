import { useContext } from 'react'
import UserContext from '../UserContext'
import { Link } from 'react-router'
import { Container, Button } from 'react-bootstrap'
import { Navbar, Nav } from 'react-bootstrap'

const NavMenu = ({ handleLogout }) => {
  const { user } = useContext(UserContext)
  const navStyle = {
    background: 'lightgrey',
  }
  return (
    <div style={navStyle}>
      <Navbar className="bg-body-tertiary mb-3">
        <Container>
          <Nav className="me-auto gap-3">
            <Navbar.Text>
              <Link to={'/blogs'} style={{ color: 'rgb(81, 83, 197)' }}>
                blogs
              </Link>
            </Navbar.Text>
            <Navbar.Text>
              <Link to={'/users'} style={{ color: 'rgb(81, 83, 197)' }}>
                users
              </Link>
            </Navbar.Text>
            <Navbar.Text>logged in as {user && user.name}</Navbar.Text>
            <Navbar.Text>
              <Button
                variant="secondary"
                size="sm"
                type="button"
                onClick={handleLogout}
              >
                logout
              </Button>
            </Navbar.Text>
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}

export default NavMenu
