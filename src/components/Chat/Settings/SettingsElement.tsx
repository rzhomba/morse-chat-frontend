import React from 'react'
import './SettingsElement.css'

const SettingsElement = (prop: {
  icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>,
  label: string,
  warning?: boolean
  onClick: () => void,
}) => {
  return (
    <button className={`SettingsElement ${prop.warning ? 'SettingsElementWarning' : ''}`} onClick={prop.onClick}>
      {<prop.icon/>}
      <div className="SettingsElementLabel">{prop.label}</div>
    </button>
  )
}

export default SettingsElement
