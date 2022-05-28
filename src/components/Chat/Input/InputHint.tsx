import React, { createRef, useEffect } from 'react'
import './InputHint.css'
import { useAppSelector } from '../../../utils/hooks'
import { selectInput } from '../../../store/input/inputSlice'
import { selectSettings } from '../../../store/settings/settingsSlice'
import { morseToStr, validateMorse } from '../../../utils/dictionary'

const InputHint = () => {
  const { inputContent } = useAppSelector(selectInput)
  const { decodingEnabled } = useAppSelector(selectSettings)

  const hintBody = createRef<HTMLDivElement>()
  useEffect(() => {
    if (hintBody.current) {
      hintBody.current.scrollTop = hintBody.current.scrollHeight
    }
  }, [inputContent])

  const validated = validateMorse(inputContent)
  const content = decodingEnabled ? morseToStr(validated) : validated

  return (
    <div className="InputHint">
      <div className="InputHintUser">
        {inputContent.length > 0 ? 'YOU:' : ''}
      </div>
      <div className="InputHintBody" ref={hintBody}>
        {content}
      </div>
    </div>
  )
}

export default InputHint
