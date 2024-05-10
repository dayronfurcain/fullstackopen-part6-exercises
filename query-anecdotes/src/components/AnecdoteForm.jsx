import { useContext } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { createAnecdote } from '../services/anecdotes'
import NotificactionContext from '../contexts/NotificactionContext'

const AnecdoteForm = () => {
  const { notificationDispatch } = useContext(NotificactionContext)
  const queryClient = useQueryClient()

  const createAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (anecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(anecdote))
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    createAnecdoteMutation.mutate(content)
    notificationDispatch({
      type: 'SHOW_NOTIFICACION',
      payload: `new anecdote '${content}' voted`
    })

    setTimeout(() => {
      notificationDispatch({
        type: 'RESET_NOTIFICACION'
      })
    }, 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
