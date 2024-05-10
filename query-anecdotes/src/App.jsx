import { useContext } from 'react'
import NotificactionContext from './contexts/NotificactionContext'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './services/anecdotes'

const App = () => {
  const { notificationDispatch } = useContext(NotificactionContext)
  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: 1
  })

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      const updatedAnecdotes = anecdotes.map((anecdote) =>
        anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
      )
      queryClient.setQueryData(['anecdotes'], updatedAnecdotes)
    }
  })

  const handleVote = (anecdote) => {
    const { id, votes, content } = anecdote
    updateAnecdoteMutation.mutate({ id, votes: votes + 1 })
    notificationDispatch({
      type: 'SHOW_NOTIFICACION',
      payload: `anecdote '${content}' voted`
    })

    setTimeout(() => {
      notificationDispatch({
        type: 'RESET_NOTIFICACION'
      })
    }, 5000)
  }

  if (result.isLoading) {
    return <div>loading data ...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
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
