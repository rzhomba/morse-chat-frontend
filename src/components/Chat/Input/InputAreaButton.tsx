import React, { useEffect, useState } from 'react'
import './InputAreaButton.css'
import { addContent, stopInput } from '../../../store/input/inputSlice'
import { useAppDispatch } from '../../../utils/hooks'
import timing from '../../../utils/timing'

interface InputAreaButtonState {
  timeoutId: ReturnType<typeof setTimeout> | undefined
  lastPressed: Date | undefined
  isPressed: boolean
  btnText: string
}

const InputAreaButton = () => {
  const initialState: InputAreaButtonState = {
    timeoutId: undefined,
    lastPressed: undefined,
    isPressed: false,
    btnText: 'Enter'
  }
  const [{
    timeoutId,
    lastPressed,
    isPressed,
    btnText
  }, setState] = useState<InputAreaButtonState>(initialState)

  const dispatch = useAppDispatch()

  const onBtnDown = () => {
    const pressed = new Date()

    // Inserts a space before the character input (on button down)
    if (lastPressed) {
      const msElapsed = pressed.getTime() - lastPressed.getTime()

      let content = ''
      if (msElapsed >= timing.wordSpace) {
        content = '/'
      } else if (msElapsed >= timing.letterSpace) {
        content = ' '
      }

      dispatch(addContent(content))
    }

    setState(prevState => ({
      ...prevState,
      lastPressed: pressed,
      isPressed: true
    }))
  }

  const onBtnUp = () => {
    const pressed = new Date()

    // Inserts the character to input
    if (lastPressed) {
      const msElapsed = pressed.getTime() - lastPressed.getTime()

      let content = ''
      if (msElapsed <= timing.dotLength) {
        content = '.'
      } else if (msElapsed <= timing.dashLength) {
        content = '-'
      }

      dispatch(addContent(content))
    }

    // Clears the previous timer and sets a new one that sends the message after a period of user inactivity
    clearTimeout(timeoutId)
    const tId = setTimeout(sendInput, timing.sendTimeout)

    setState(prevState => ({
      ...prevState,
      timeoutId: tId,
      lastPressed: pressed,
      isPressed: false
    }))
  }

  const sendInput = () => {
    setState(() => initialState)
    dispatch(stopInput())
  }

  // Binding key events to document and implementing some keyboard specific logic
  useEffect(() => {
    const handleKey = (e: KeyboardEvent, handler: () => void) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        handler()
      }
    }
    let keyPressed = false
    const handleKeyDown = (e: KeyboardEvent) => {
      if (keyPressed) {
        return
      }
      keyPressed = true
      handleKey(e, onBtnDown)
    }
    const handleKeyUp = (e: KeyboardEvent) => {
      handleKey(e, onBtnUp)
      keyPressed = false
    }
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [lastPressed])

  // Show remaining time to send the message
  useEffect(() => {
    if (lastPressed && !isPressed) {
      const updateCounter = () => {
        const msPassed = (new Date()).getTime() - lastPressed.getTime()
        const msLeft = timing.sendTimeout - msPassed
        const timeLeft = (msLeft / 1000).toFixed(1)

        setState(prevState => ({ ...prevState, btnText: timeLeft }))
      }

      const timerId = setInterval(updateCounter, 100)
      setTimeout(() => clearInterval(timerId), timing.sendTimeout)

      return () => clearInterval(timerId)
    } else {
      setState(prevState => ({ ...prevState, btnText: initialState.btnText }))
    }
  }, [isPressed])

  return (
    <button className={`Button InputAreaButton ${isPressed ? 'InputAreaButtonActive' : ''}`}
            onMouseDown={() => onBtnDown()}
            onMouseUp={() => onBtnUp()}
            onTouchStart={e => {
              onBtnDown()
              e.preventDefault()
            }}
            onTouchEnd={e => {
              onBtnUp()
              e.preventDefault()
            }}>
      {btnText}
    </button>
  )
}

export default InputAreaButton
