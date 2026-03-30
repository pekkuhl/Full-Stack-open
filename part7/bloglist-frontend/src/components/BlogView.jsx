import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { useParams, NavLink } from 'react-router'
import CommentArea from './CommentArea'
import { Button, Container, Card } from 'react-bootstrap'

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
      <Container className="mb-1">
        <Card className="mb-3">
          <Card.Body>
            <Card.Title>
              {blog.title} by {blog.author}
            </Card.Title>
            <Card.Link>{blog.url}</Card.Link>
            <Card.Text>Likes {blog.likes}</Card.Text>
            <Card.Text>added by {blog.author}</Card.Text>
          </Card.Body>
        </Card>

        <Button
          variant="outline-success"
          className="mb-3"
          type="button"
          onClick={() => updateBlogLike(blog.id)}
        >
          like
        </Button>

        <CommentArea blog={blog} />
        <NavLink to={`/blogs`}>
          <Button type="button" variant="outline-primary">
            back
          </Button>
        </NavLink>
      </Container>
    )
  }
}

export default BlogView
