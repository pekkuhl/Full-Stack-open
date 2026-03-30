import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { useParams, NavLink } from 'react-router'

const BlogView = ({ updateBlogLike }) => {
  const blogs = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  })

  const blogX = useParams().blog

  if (blogs.isSuccess) {
    console.log(blogX)
    const blogData = blogs.data
    const blog = blogData.find((b) => b.id === blogX)
    console.log('->', blogData)

    return (
      <div>
        <h2>{blog.title}</h2>
        <p>{blog.url}</p>
        <p>
          {blog.likes}
          <button onClick={() => updateBlogLike(blog.id)}>like</button>
        </p>
        <p>added by {blog.author}</p>
        <NavLink to={`/blogs`}>
          <button>back</button>
        </NavLink>
      </div>
    )
  }
}

export default BlogView
