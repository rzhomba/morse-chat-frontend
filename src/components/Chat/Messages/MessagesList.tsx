import React from 'react'
import { selectChat } from '../../../store/chat/chatSlice'
import { useAppSelector } from '../../../utils/hooks'
import Message from './Message'
import './MessagesList.css'

const MessagesList = () => {
  const { chatMessages, chatUser } = useAppSelector(selectChat)

  return (
    <div className="MessagesList">
      {chatMessages.map((v, i) => (
        <Message
          user={v.user === chatUser?.name ? `${v.user} (YOU)` : v.user}
          type={v.type as 'message' | 'join' | 'leave'}
          content={v.content}
          key={`msg${i}`}/>
      ))}
    </div>
  )
}

export default MessagesList
