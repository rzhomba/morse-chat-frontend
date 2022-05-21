import React from 'react'
import './InputArea.css'
import InputAreaButton from './InputAreaButton'
import SoundToggleButton from './SoundToggleButton'
import InputHint from './InputHint'

const InputArea = () => {
  return (
    <div className="InputArea">
      <InputHint/>
      <InputAreaButton/>
      <SoundToggleButton/>
    </div>
  )
}

export default InputArea
