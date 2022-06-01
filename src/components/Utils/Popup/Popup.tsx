import React, { ReactNode, useState, useSyncExternalStore } from 'react'
import './Popup.css'
import CloseIcon from '#icons/close.svg'

interface QueueElement {
  title: string,
  content: ReactNode
}

const createPopupQueue = () => {
  const queue: QueueElement[] = []
  const getQueue = (): QueueElement[] => {
    return queue
  }
  const listeners = new Set<() => void>()
  const addElement = (elem: QueueElement) => {
    queue.push(elem)
    listeners.forEach(l => l())
  }
  const extractElement = (): QueueElement | undefined => {
    return queue.shift()
  }
  const subscribe = (listener: () => void) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  }
  return { getQueue, addElement, extractElement, subscribe }
}

const popupQueue = createPopupQueue()

export const displayPopup = (element: QueueElement): void => {
  popupQueue.addElement(element)
}

const Popup = () => {
  const [title, setTitle] = useState<string | undefined>(undefined)
  const [content, setContent] = useState<ReactNode>(undefined)
  const [visible, setVisibility] = useState(false)

  useSyncExternalStore((): () => void => {
    return popupQueue.subscribe(() => {
      const element = popupQueue.extractElement()
      setTitle(element?.title)
      setContent(element?.content)
      setVisibility(true)
    })
  }, popupQueue.getQueue)

  const closePopup = () => {
    setVisibility(false)
    console.log('hidden')
  }

  return (
    <div className={`Popup ${visible ? '' : 'PopupHidden'}`}>
      <div className="PopupModal">
        <div className="PopupTitle">
          {title}
          <button className="PopupClose" onClick={() => closePopup()}>
            <CloseIcon/>
          </button>
        </div>
        <div className="PopupContent">
          {content}
        </div>
      </div>
    </div>
  )
}

export default Popup
