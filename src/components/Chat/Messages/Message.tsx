import React from 'react'
import './Message.css'
import { IMessage } from '../../../types/message.interface'

interface MessageProp extends IMessage {
  postfix: 'YOU' | 'ADM' | 'MEM'
}

const Message = (prop: MessageProp) => {
  const user = `${prop.user} (${prop.postfix})`
  let content

  if (prop.type === 'message') {
    content = (<div className="Message">
        <span className="MsgUser">{user}</span>
        {': '}
        <span className="MsgContent">{prop.content}</span>
      </div>
    )
  } else {
    const action = prop.type === 'join' ? 'joined the room' : 'left the room'
    content = <span>{`${user} ${action}`}</span>
  }

  return (
    <div className="Message">{content}</div>
  )
}

export default Message
