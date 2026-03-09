import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    newNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return ''
    }
  }
})

export const { newNotification, clearNotification } = notificationSlice.actions

export const setNotification = (string, seconds) => {
  const secondsToMs = seconds * 1000
  return (dispatch) => {
    dispatch(newNotification(string))
    setTimeout(() => {
      dispatch(clearNotification())
    }, secondsToMs)
  }
}

export default notificationSlice.reducer