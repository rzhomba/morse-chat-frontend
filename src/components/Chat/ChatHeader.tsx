import React from 'react'
import { selectChat } from '../../store/chat/chatSlice'
import { useAppSelector } from '../../utils/hooks'
import './ChatHeader.css'
import UsersIcon from '#icons/users.svg'

const ChatHeader = () => {
  const { chatUsers } = useAppSelector(selectChat)

  return (
    <div className="Header">
      <UsersIcon className="UsersIcon"/>
      <div className="UsersList">
        {chatUsers.map(u => u.name).join(', ')}
      </div>
      <div className="UsersCount">
        {chatUsers.length}/4
      </div>
    </div>
  )
}

export default ChatHeader
