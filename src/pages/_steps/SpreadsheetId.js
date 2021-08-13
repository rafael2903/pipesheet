import { Button, TextInput } from 'components'
import { useState } from 'react'

export default function SpreadsheetId({ nextStep }) {
  const [spreadsheetId, setSpreadsheetId] = useState('')

  return (
    <div className="flex w-80 flex-col justify-between">
      <h2 className="text-xl my-2">Escolha qual planilha receberá os dados</h2>
      <TextInput
        value={spreadsheetId}
        onChange={(e) => setSpreadsheetId(e.target.value)}
        placeholder="Id da planilha"
      />
      <Button onClick={nextStep}>Continuar</Button>
    </div>
  )
}
