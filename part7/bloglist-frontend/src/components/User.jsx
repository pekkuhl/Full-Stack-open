import { useParams, NavLink } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import userService from '../services/users'

const User = () => {
  const id = useParams().id
  const users = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
  })

  if (users.isError) {
    return <div> error loading the user </div>
  }

  if (users.isSuccess) {
    let userData = users.data
    const user = userData.find((user) => user.id === id)

    if (!user) {
      return <div> user not found </div>
    }
    return (
      <div>
        <h2>{user.name}</h2>
        <ul>
          {user.blogs.map((blog) => {
            return <li key={blog.id}>{blog.title}</li>
          })}
        </ul>
        <NavLink to={'/users'}>
          <button>back to users</button>
        </NavLink>
      </div>
    )
  }
}

export default User
