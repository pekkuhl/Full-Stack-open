import { useQuery } from '@tanstack/react-query'
import userService from '../services/users'
import { NavLink } from 'react-router'

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
        <table style={{ backgroundColor: 'lightgrey' }}>
          <thead>
            <tr>
              <th scope="col">Users</th>
              <th scope="col">Blogs created</th>
            </tr>
          </thead>
          <tbody>
            {users.data.map((user) => (
              <tr key={user.username}>
                <th scope="row">
                  <NavLink to={`/users/${user.id}`}>{user.name}</NavLink>{' '}
                </th>
                <td style={{ textAlign: 'center' }}>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <NavLink to="/blogs">
          <button>Close users</button>
        </NavLink>
      </div>
    )
  }
}

export default Users
