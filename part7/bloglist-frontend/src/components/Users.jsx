import { useQuery } from '@tanstack/react-query'
import userService from '../services/users'
import { NavLink } from 'react-router'
import { Table, Button } from 'react-bootstrap'

const Users = () => {
  const users = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
  })
  console.log(users)
  if (users.isLoading) {
    return <div> loading users </div>
  }
  if (users.isError) {
    return <div> failed to load users </div>
  }
  if (users.isSuccess) {
    console.log(users.data)
    return (
      <div>
        <Table bordered>
          <thead>
            <tr>
              <th scope="col" style={{ backgroundColor: 'rgb(201, 210, 252)' }}>
                Users{' '}
              </th>
              <th scope="col" style={{ backgroundColor: 'rgb(201, 210, 252)' }}>
                Blogs created
              </th>
            </tr>
          </thead>
          <tbody>
            {users.data.map((user) => (
              <tr key={user.username}>
                <th scope="row">
                  <NavLink to={`/users/${user.id}`}>{user.name}</NavLink>{' '}
                </th>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <NavLink to="/blogs">
          <Button>Close users</Button>
        </NavLink>
      </div>
    )
  }
}

export default Users
