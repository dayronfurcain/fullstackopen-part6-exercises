import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export const createAnecdote = async (content) => {
  const object = {
    content,
    votes: 0
  }
  const response = await axios.post(baseUrl, object)
  return response.data
}

export const updateAnecdote = async (anecdote) => {
  const response = await axios.patch(`${baseUrl}/${anecdote.id}`, anecdote)
  console.log(response.data)
  return response.data
}
