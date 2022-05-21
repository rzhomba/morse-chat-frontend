import React from 'react'
import './Message.css'

const Message = (prop: { user: string, type: 'message' | 'join' | 'leave', content?: string }) => {
  if (prop.type === 'message') {
    return (<div className="Message">
        <span className="MsgUser">{prop.user}</span>
        {': '}
        <span className="MsgContent">{prop.content}</span>
      </div>
    )
  }
  const action = prop.type === 'join' ? 'joined the room' : 'left the room'
  return (
    <div className="Message">{`${prop.user} ${action}`}</div>
  )
}

export default Message
