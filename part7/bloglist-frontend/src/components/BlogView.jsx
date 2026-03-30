import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { useParams, NavLink } from 'react-router'
import CommentArea from './CommentArea'

const BlogView = ({ updateBlogLike }) => {
  const blogs = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  })

  const blogId = useParams().id

  if (blogs.isSuccess) {
    const blogData = blogs.data
    const blog = blogData.find((b) => b.id === blogId)

    return (
      <div>
        <h2>
          {blog.title} {blog.author}
        </h2>
        <p>{blog.url}</p>
        <p>
          {blog.likes}
          <button onClick={() => updateBlogLike(blog.id)}>like</button>
        </p>
        <p>added by {blog.author}</p>
        <CommentArea />
        <NavLink to={`/blogs`}>
          <button>back</button>
        </NavLink>
      </div>
    )
  }
}

export default BlogView
