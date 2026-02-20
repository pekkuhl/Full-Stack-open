import { useState } from "react"



const CreateBlogsForm = ({createNewBlog}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  return (
  <div>
      <h1>Create new blog</h1>
      <form onSubmit={(e) => {
        e.preventDefault()
        createNewBlog(title, author, url)
        setTitle('')
        setAuthor('')
        setUrl('')
      }}>
        <div>
        <label> title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        </div>
        <div>
        <label> author:
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
        </label>
        </div>
        <div>
        <label>url:
          <input type="text" value={url} onChange={(e) => setUrl(e.target.value)}/>
        </label>
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )}

  

export default CreateBlogsForm