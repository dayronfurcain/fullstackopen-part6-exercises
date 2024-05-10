import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    updateAnecdote(state, action) {
      const { id } = action.payload
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : action.payload
      )
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    }
  }
})

export const { setAnecdotes, appendAnecdote, updateAnecdote } =
  anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const incrementVote = (anecdote) => {
  return async (dispatch) => {
    const { id, votes } = anecdote
    const updatedAnecdote = await anecdoteService.update(id, {
      votes: votes + 1
    })
    dispatch(updateAnecdote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer
