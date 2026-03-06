import { useSelector, useDispatch } from "react-redux"
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const upvote = (id) => {
    dispatch(vote(id))
  }

  let sortedAnecdotes = anecdotes.map(a => a).sort((a,b) => b.votes - a.votes)

  return (
    <div>
    <h2>Anecdotes</h2>
      {sortedAnecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => upvote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList