import { createContext, useReducer } from 'react'

const NotificationContext = createContext()

const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICACION':
      return action.payload
    case 'RESET_NOTIFICACION':
      return ''
    default:
      return state
  }
}

export const NotificationProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ''
  )

  return (
    <NotificationContext.Provider
      value={{ notification, notificationDispatch }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
