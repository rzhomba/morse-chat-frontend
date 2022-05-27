import React from 'react'
import { selectChat } from '../../../store/chat/chatSlice'
import { useAppSelector } from '../../../utils/hooks'
import Message from './Message'
import './MessagesList.css'

const MessagesList = () => {
  const { chatMessages, chatUsers, chatUser } = useAppSelector(selectChat)

  return (
    <div className="MessagesList">
      {chatMessages.map((v, i) => (
        <Message
          user={v.user}
          postfix={
            v.user === chatUser
              ? 'YOU'
              : chatUsers.find(u => u.name === v.user)?.role === 'admin'
                ? 'ADM'
                : 'MEM'
          }
          type={v.type}
          content={v.content}
          key={`msg${i}`}/>
      ))}
    </div>
  )
}

export default MessagesList
