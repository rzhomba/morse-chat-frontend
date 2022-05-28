import React from 'react'
import { useAppSelector } from '../../../utils/hooks'
import { selectChat } from '../../../store/chat/chatSlice'
import { selectSettings } from '../../../store/settings/settingsSlice'
import Message from './Message'
import './MessagesList.css'
import { morseToStr } from '../../../utils/dictionary'

const MessagesList = () => {
  const { chatMessages, chatUsers, chatUser } = useAppSelector(selectChat)
  const { decodingEnabled } = useAppSelector(selectSettings)

  return (
    <div className="MessagesList">
      {chatMessages.map((v, i) => (
        <Message
          user={v.user}
          postfix={
            v.user === chatUser?.name
              ? 'YOU'
              : chatUsers.find(u => u.name === v.user)?.role === 'admin'
                ? 'ADM'
                : 'MEM'
          }
          type={v.type}
          content={decodingEnabled && v.content ? morseToStr(v.content) : v.content}
          key={`msg${i}`}/>
      ))}
    </div>
  )
}

export default MessagesList
