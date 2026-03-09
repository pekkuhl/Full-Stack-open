import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    vote(state, action) {
      const voteAnecdote = action.payload
      return state.map(anecdote => (voteAnecdote.id !== anecdote.id ? anecdote : voteAnecdote))
    },
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

const { setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

const { createAnecdote } = anecdoteSlice.actions

export const createNewAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const { vote } = anecdoteSlice.actions

export const voteAnecdote = (id) => {
  return async (dispatch) => {
    const votedAnecdote = await anecdoteService.update(id)
    dispatch(vote(votedAnecdote))
  }
}
export default anecdoteSlice.reducer