const CommentArea = ({ blog }) => {
  console.log(blog)

  return (
    <div>
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
