import React from 'react'
const ErrorNotification = ({ errorMessage }) => {
  if (errorMessage === null) {
    return null
  }
  return <div className='errorNotification'>{errorMessage}</div>
}
export default ErrorNotification
