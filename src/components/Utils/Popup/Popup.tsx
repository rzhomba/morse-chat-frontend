import React, { ReactNode, useState, useSyncExternalStore } from 'react'
import './Popup.css'
import CloseIcon from '#icons/close.svg'

const createQueue = () => {
  const queue: ReactNode[] = []
  const getQueue = (): ReactNode[] => {
    return queue
  }
  const listeners = new Set<() => void>()
  const addToQueue = (elem: ReactNode) => {
    queue.push(elem)
    listeners.forEach(l => l())
  }
  const extractFromQueue = (): ReactNode => {
    return queue.shift()
  }
  const subscribe = (listener: () => void) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  }
  return { getQueue, addToQueue, extractFromQueue, subscribe }
}

const queue = createQueue()

export const displayPopup = (content: ReactNode): void => {
  queue.addToQueue(content)
}

const Popup = () => {
  const [content, setContent] = useState<ReactNode>(undefined)
  const [visible, setVisibility] = useState(false)

  useSyncExternalStore((): () => void => {
    return queue.subscribe(() => {
      setContent(queue.extractFromQueue())
      setVisibility(true)
    })
  }, queue.getQueue)

  const closePopup = () => {
    setVisibility(false)
    console.log('hidden')
  }

  return (
    <div className={`Popup ${visible ? '' : 'PopupHidden'}`}>
      <div className="PopupModal">
        <button className="PopupClose" onClick={() => closePopup()}>
          <CloseIcon/>
        </button>
        {content}
      </div>
    </div>
  )
}

export default Popup
