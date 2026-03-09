const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await fetch(baseUrl)

  if (!response.ok) {
    throw new Error ('Failed to fetch anecdotes')
  }

  return await response.json()
}

const create = async(content) => {
  const config = {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
      content,
      votes: 0
    })
  }

  const response = await fetch(baseUrl, config)
  if (!response.ok) {
    throw new Error('Failed to create new anecdote')
  }

  return await response.json()
}

const update = async(anecdote) => {
  const updatedAnecdote = {
    ...anecdote,
    votes: anecdote.votes +1
  }

  const config = {
    method: 'PUT',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(updatedAnecdote)
  }

  const response = await fetch(`${baseUrl}/${anecdote.id}`, config)
  if (!response.ok) {
    throw new Error('Voting failed')
  }

  return await response.json()
}

export default { getAll, create, update }