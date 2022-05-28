import React, { useEffect, useState } from 'react'
import './InputAreaButton.css'
import { selectInput, addContent, stopInput } from '../../../store/input/inputSlice'
import { selectSettings } from '../../../store/settings/settingsSlice'
import { useAppDispatch, useAppSelector } from '../../../utils/hooks'
import { resumeSound, stopSound } from '../../../utils/sound'
import timing from '../../../utils/timing'
import { SocketIO } from '../../../utils/socket-io'

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

  const { inputContent } = useAppSelector(selectInput)
  const { soundEnabled } = useAppSelector(selectSettings)
  const dispatch = useAppDispatch()

  const onBtnDown = () => {
    const pressed = new Date()

    soundEnabled && resumeSound()

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

    // Clears send timer
    clearTimeout(timeoutId)

    setState(prevState => ({
      ...prevState,
      lastPressed: pressed,
      isPressed: true
    }))
  }

  const onBtnUp = () => {
    const pressed = new Date()

    soundEnabled && stopSound()

    // Inserts the character to input
    let content = ''
    if (lastPressed) {
      const msElapsed = pressed.getTime() - lastPressed.getTime()
      if (msElapsed <= timing.dotLength) {
        content = '.'
      } else if (msElapsed <= timing.dashLength) {
        content = '-'
      }

      dispatch(addContent(content))
    }

    // Sets a new timer that sends the message after a period of user inactivity
    const tId = setTimeout(() => sendInput(inputContent + content), timing.sendTimeout)

    setState(prevState => ({
      ...prevState,
      timeoutId: tId,
      lastPressed: pressed,
      isPressed: false
    }))
  }

  const sendInput = (message: string) => {
    SocketIO.instance().client().emit('message', message)
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
