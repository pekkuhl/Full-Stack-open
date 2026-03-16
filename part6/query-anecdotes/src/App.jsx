import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { getAnecdotes, voteAnecdote } from './requests'
import { useContext } from 'react'
import NotificationContext from './components/NotificationContext'


const App = () => {
  const queryClient = useQueryClient()
  const { notificationDispatch } = useContext(NotificationContext)
  const anecdoteVoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: (votedAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes']})
      notificationDispatch({ type: 'VOTEDANECDOTE', payload: votedAnecdote.content})
      setTimeout(() => {
        notificationDispatch({ type: 'EMPTY'})
      }, 5000);
    }
  })

  const handleVote = (anecdote) => {
    anecdoteVoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1})
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })

  if (result.isLoading) {
    return <div> loading data... </div>
  }

  if (result.isError) {
    return <div> anecdote service not available due to problems in server </div>
  }

  const anecdotes = result.data

  

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
