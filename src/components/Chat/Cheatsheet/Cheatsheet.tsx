import React from 'react'
import { useAppSelector } from '../../../utils/hooks'
import { selectSettings } from '../../../store/settings/settingsSlice'
import './Cheatsheet.css'
import { dictionary } from '../../../utils/dictionary'

export const Cheatsheet = () => {
  const { cheatShown } = useAppSelector(selectSettings)

  const entries = []
  for (const [symbol, code] of dictionary) {
    const elem = (
      <span className="CheatsheetEntry">
        <span className="CheatsheetEntrySymbol">{symbol}:</span>
        <span className="CheatsheetEntryCode">{code}</span>
      </span>
    )
    entries.push(elem)
  }

  return (
    <div className={`Cheatsheet Cheatsheet${cheatShown ? 'Visible' : 'Hidden'}`}>
      {entries}
    </div>
  )
}

export default Cheatsheet
