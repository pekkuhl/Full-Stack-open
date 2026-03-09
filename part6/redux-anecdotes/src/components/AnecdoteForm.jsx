import { useDispatch } from "react-redux"
import { createNewAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const content = e.target.newAnecdote.value
    dispatch(createNewAnecdote(content))
    dispatch(setNotification('You added a new anecdote!', 5))
    e.target.newAnecdote.value = ''
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