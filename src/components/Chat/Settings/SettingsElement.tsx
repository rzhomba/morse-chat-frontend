import React from 'react'
import './SettingsElement.css'

interface SettingsElementProp {
  icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  label: string
  warning?: boolean
  access?: 'admin' | 'member'
  onClick: () => void
}

const SettingsElement = (prop: SettingsElementProp) => {
  const isAdmin = false // TODO: replace this placeholder later
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
      className={`SettingsElement 
                  ${prop.warning ? 'SettingsElementWarning' : ''} 
                  ${showSetting ? '' : 'SettingsElementHidden'}`}
      onClick={prop.onClick}>
      {<prop.icon/>}
      <div className="SettingsElementLabel">{prop.label}</div>
    </button>
  )
}

export default SettingsElement
