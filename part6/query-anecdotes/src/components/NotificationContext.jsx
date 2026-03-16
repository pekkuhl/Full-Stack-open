import { createContext, useReducer } from "react"

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'NEWANECDOTE':
      return 'New anecdote created Succesfully'
    case 'VOTEDANECDOTE':
      return `You voted "${action.payload}"`
    case 'TOOSHORT':
      return 'Too short anecdote, must have length 5 or more'
    case 'EMPTY':
      return ''
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={{ notification, notificationDispatch}}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext