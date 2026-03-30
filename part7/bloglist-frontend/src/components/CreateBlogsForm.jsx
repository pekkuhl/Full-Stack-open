import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router'
import { Button, Form } from 'react-bootstrap'

const CreateBlogsForm = ({ createNewBlog }) => {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  return (
    <div>
      <h1>Create new blog</h1>

      <Form
        onSubmit={(e) => {
          e.preventDefault()
          createNewBlog(title, author, url)
          setTitle('')
          setAuthor('')
          setUrl('')
          navigate('/blogs')
        }}
      >
        <div>
          <Form.Label>
            title:
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Label>
        </div>
        <div>
          <Form.Label>
            author:
            <Form.Control
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </Form.Label>
        </div>
        <div>
          <Form.Label>
            url:
            <Form.Control
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </Form.Label>
        </div>
        <Button variant="outline-success" type="submit">
          create
        </Button>
        <NavLink to="/blogs">
          <Button variant="outline-danger">cancel</Button>
        </NavLink>
      </Form>
    </div>
  )
}

export default CreateBlogsForm
