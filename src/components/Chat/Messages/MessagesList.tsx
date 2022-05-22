import React from 'react'
import { selectChat } from '../../../store/chat/chatSlice'
import { useAppSelector } from '../../../utils/hooks'
import Message from './Message'
import './MessagesList.css'

const MessagesList = () => {
  const currentUser = '' // TODO: implement this

  const { messages } = useAppSelector(selectChat)

  return (
    <div className="MessagesList">
      {messages.map((v, i) => (
        <Message
          user={v.user === currentUser ? `${v.user} (YOU)` : v.user}
          type={v.type as 'message' | 'join' | 'leave'}
          content={v.content}
          key={`msg${i}`}/>
      ))}
    </div>
  )
}

export default MessagesList
