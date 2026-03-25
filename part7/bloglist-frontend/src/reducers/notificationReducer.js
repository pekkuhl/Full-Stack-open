

export const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SUCCESSMESSAGE': {
      return {
        message: action.payload,
        messageType: 'success',
      }
    }
    case 'ERRORMESSAGE': {
      return {
        message: action.payload,
        messageType: 'error',
      }
    }
    case 'EMPTYMESSAGE': {
      return {
        message: null,
      }
    }
    default:
      return state
  }
}