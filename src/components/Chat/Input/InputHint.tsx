import React, { createRef, useEffect } from 'react'
import './InputHint.css'
import { useAppSelector } from '../../../utils/hooks'
import { selectInput } from '../../../store/input/inputSlice'

const InputHint = () => {
  const { inputContent } = useAppSelector(selectInput)

  const hintBody = createRef<HTMLDivElement>()
  useEffect(() => {
    if (hintBody.current) {
      hintBody.current.scrollTop = hintBody.current.scrollHeight
    }
  }, [inputContent])

  return (
    <div className="InputHint">
      <div className="InputHintUser">
        {inputContent.length > 0 ? 'YOU:' : ''}
      </div>
      <div className="InputHintBody" ref={hintBody}>
        {inputContent}
      </div>
    </div>
  )
}

export default InputHint
