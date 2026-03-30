import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const Notification = () => {
  const { notification } = useContext(NotificationContext)

  const successMessageStyle = {
    color: 'green',
    background: 'white',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  }

  const errorMessageStyle = {
    color: 'red',
    background: 'white',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  }

  let notificationStyle = {}
  if (notification.messageType === 'success') {
    notificationStyle = successMessageStyle
  } else if (notification.messageType === 'error') {
    notificationStyle = errorMessageStyle
  }

  if (!notification.message) {
    return null
  }

  return <div style={notificationStyle}>{notification.message}</div>
}

export default Notification
