import { createSlice } from '@reduxjs/toolkit'

const notificacionSlice = createSlice({
  name: 'notificacion',
  initialState: '',
  reducers: {
    addNotification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return ''
    }
  }
})

export const { clearNotification, addNotification } = notificacionSlice.actions

export const setNotification = (message, second) => {
  return async (dispatch) => {
    dispatch(addNotification(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, second * 1000)
  }
}

export default notificacionSlice.reducer
