import { useState } from 'react'
import blogService from '../services/blogs'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const CommentArea = ({ blog }) => {
  const [comment, setComment] = useState('')
  const queryClient = useQueryClient()

  const createCommentMutation = useMutation({
    mutationFn: blogService.createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  const createComment = (comment) => {
    createCommentMutation.mutate({ id: blog.id, comment })
    setComment('')
  }

  return (
    <div>
      <div>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          autoFocus="true"
        />
        <button type="button" onClick={() => createComment(comment)}>
          add comment
        </button>
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
