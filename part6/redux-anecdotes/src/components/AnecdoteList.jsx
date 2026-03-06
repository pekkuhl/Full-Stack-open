import { useSelector, useDispatch } from "react-redux"
import { vote } from '../reducers/anecdoteReducer'
import FilterBar from "../components/FilterBar"
import Notification from "./Notification"
import { newNotification } from "../reducers/notificationReducer"
import { clearNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdote)
  const filterTxt = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const upvote = (id) => {

    const anecdote = anecdotes.find(a => a.id === id)
    console.log(anecdote)
    dispatch(vote(id))
    dispatch(newNotification(`You voted "${anecdote.content}"`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  let sortedAnecdotes = anecdotes.map(a => a).sort((a,b) => b.votes - a.votes)
  let filteredAnecdotes = sortedAnecdotes.filter(a => a.content.toLowerCase().includes(filterTxt))

  return (
    <div>
    <h2>Anecdotes</h2>
    <Notification/>
    <FilterBar/>
    <div>
      {filteredAnecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => upvote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      </div>
    </div>
  )
}

export default AnecdoteList