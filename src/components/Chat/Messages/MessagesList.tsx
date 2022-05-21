import React from 'react'
import Message from './Message'
import './MessagesList.css'

const MessagesList = () => {
  const currentUser = 'ASDF'
  const messagesPlaceholder = [
    { user: 'HETR', type: 'join' },
    { user: 'HETR', type: 'message', content: '... --- ...' },
    { user: 'QWOB', type: 'join' },
    { user: 'QWOB', type: 'message', content: '.... ..' },
    { user: 'HETR', type: 'message', content: '.... . -.--' },
    { user: 'ODTE', type: 'join' },
    { user: 'ODTE', type: 'leave' },
    { user: 'HETR', type: 'message', content: '... .- -..' },
    { user: 'ASDF', type: 'join' },
    { user: 'ITME', type: 'join' },
    { user: 'ASDF', type: 'message', content: '-.--- .- / ..- ... - .- .-.. / ..- --.. .... .' }
  ]

  return (
    <div className="MessagesList">
      {messagesPlaceholder.map((v, i) => (
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
