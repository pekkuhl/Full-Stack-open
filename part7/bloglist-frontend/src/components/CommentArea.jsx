import { useState } from 'react'
import blogService from '../services/blogs'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Form } from 'react-bootstrap'

const CommentArea = ({ blog }) => {
  const [comment, setComment] = useState('')
  const queryClient = useQueryClient()
  const id = blog.id

  const createCommentMutation = useMutation({
    mutationFn: blogService.createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  const createComment = (comment) => {
    createCommentMutation.mutate({ id, comment })
    setComment('')
  }

  return (
    <div>
      <div>
        <Form>
          <Form.Control
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            autoFocus="true"
          />
          <Button
            variant="outline-primary"
            type="button"
            onClick={() => createComment(comment)}
          >
            add comment
          </Button>
        </Form>
      </div>
      <h3>comments</h3>
      <ul>
        {blog.comments.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
    </div>
  )
}

export default CommentArea
