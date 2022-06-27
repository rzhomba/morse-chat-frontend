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

  const pushListeners = new Set<() => void>()
  const extractListeners = new Set<() => void>()

  const pushElement = (elem: QueueElement): void => {
    queue.push(elem)
    pushListeners.forEach(l => l())
  }

  const extractElement = (): void => {
    queue.shift()
    extractListeners.forEach(l => l())
  }

  const getLast = (): QueueElement | undefined => {
    return queue[0]
  }

  const subscribe = (pushListener: () => void, extractListener: () => void) => {
    pushListeners.add(pushListener)
    extractListeners.add(extractListener)
    return () => {
      pushListeners.delete(pushListener)
      extractListeners.delete(extractListener)
    }
  }

  return {
    getQueue,
    pushElement,
    extractElement,
    getLast,
    subscribe
  }
}

const popupQueue = createPopupQueue()

export const displayPopup = (element: QueueElement): void => {
  popupQueue.pushElement(element)
}

export const closePopup = (): void => {
  popupQueue.extractElement()
}

const Popup = () => {
  const [title, setTitle] = useState<string | undefined>(undefined)
  const [content, setContent] = useState<ReactNode>(undefined)
  const [visible, setVisibility] = useState(false)

  useSyncExternalStore((): () => void => {
    return popupQueue.subscribe(() => {
      const element = popupQueue.getLast()
      setTitle(element?.title)
      setContent(element?.content)
      setVisibility(true)
    }, () => {
      setVisibility(false)
      setTitle(undefined)
      setContent(undefined)
    })
  }, popupQueue.getQueue)

  const closePopup = () => {
    popupQueue.extractElement()
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) {
      return
    }

    closePopup()
  }

  return (
    <div className={`Popup ${visible ? '' : 'PopupHidden'}`} onClick={(e) => handleClick(e)}>
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
