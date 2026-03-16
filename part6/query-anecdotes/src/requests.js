const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  const response = await fetch(baseUrl)

  if (!response.ok) {
    throw new Error('Fetching anecdotes failed')
  }
  return await response.json()
}

export const addAnecdote = async (newAnecdote) => {
  const config = {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(newAnecdote)
  }

  const response = await fetch(baseUrl, config)

  if (!response.ok) {
    throw new Error('failed to add a new anecdote')
  }

  return await response.json()
}

export const voteAnecdote = async (updatedAnecdote) => {
  const config = {
    method: 'PUT',
    headers: { 'Content-type':'application/json' },
    body: JSON.stringify(updatedAnecdote)
  }

  const response = await fetch(`${baseUrl}/${updatedAnecdote.id}`, config)
  if (!response.ok) {
    throw new Error('failed to vote anecdote')
  }

  return await response.json()
}