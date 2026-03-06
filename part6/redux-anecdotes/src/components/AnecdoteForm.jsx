import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { newNotification } from "../reducers/notificationReducer"
import { clearNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.newAnecdote.value
    dispatch(createAnecdote(content))
    dispatch(newNotification('You added a new anecdote!'))
    e.target.newAnecdote.value = ''
    setTimeout(() => {
      dispatch(clearNotification())
    },5000)
  }



  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="newAnecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
    )
}

export default AnecdoteForm