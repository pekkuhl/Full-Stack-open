import { NavLink } from 'react-router'
import { Table } from 'react-bootstrap'

const Blog = ({ blog }) => {
  return (
    <>
      <tr>
        <td>
          <NavLink to={`/blogs/${blog.id}`}>{blog.title}</NavLink>
        </td>
        <td>{blog.author}</td>
      </tr>
    </>
  )
}

export default Blog
