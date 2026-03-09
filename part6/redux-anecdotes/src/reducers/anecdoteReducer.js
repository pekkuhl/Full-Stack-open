import { createSlice } from "@reduxjs/toolkit"

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    vote(state, action) {
      const id = action.payload
      const votedAnecdote = state.find(anecdote => anecdote.id === id)
      const newAnecdote = { ...votedAnecdote, votes: votedAnecdote.votes + 1 }
      return state.map(anecdote => (anecdote.id !== id ? anecdote : newAnecdote))
    },
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { vote, createAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer