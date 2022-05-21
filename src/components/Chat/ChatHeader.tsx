import React from 'react'
import './ChatHeader.css'
import UsersIcon from '#icons/users.svg'

const ChatHeader = () => {
  const usersPlaceholder = ['HETR', 'QWOB', 'ASDF', 'ITME']

  return (
    <div className="Header">
      <UsersIcon className="UsersIcon"/>
      <div className="UsersList">
        {usersPlaceholder.join(', ')}
      </div>
      <div className="UsersCount">
        {usersPlaceholder.length}/4
      </div>
    </div>
  )
}

export default ChatHeader
