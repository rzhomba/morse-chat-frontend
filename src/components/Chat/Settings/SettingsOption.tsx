import React from 'react'
import './SettingsOption.css'
import { useAppSelector } from '../../../utils/hooks'
import { selectChat } from '../../../store/chat/chatSlice'

interface SettingsOptionProp {
  icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  label: string
  warning?: boolean
  access?: 'admin' | 'member'
  onClick: () => void
}

const SettingsOption = (prop: SettingsOptionProp) => {
  const { chatUser } = useAppSelector(selectChat)

  const isAdmin = chatUser?.role === 'admin'
  let showSetting = true
  if (!prop.access) {
    showSetting = true
  } else if (prop.access === 'admin') {
    showSetting = isAdmin
  } else if (prop.access === 'member') {
    showSetting = !isAdmin
  }

  return (
    <button
      className={`SettingsOption 
                  ${prop.warning ? 'SettingsOptionWarning' : ''} 
                  ${showSetting ? '' : 'SettingsOptionHidden'}`}
      onClick={prop.onClick}>
      {<prop.icon/>}
      <div className="SettingsOptionLabel">{prop.label}</div>
    </button>
  )
}

export default SettingsOption
