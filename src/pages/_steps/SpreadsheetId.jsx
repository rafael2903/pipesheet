import { useState } from 'react'
import { Button, TextInput } from 'components'

export default function SpreadsheetId({ nextStep, setData }) {
  const [spreadsheetId, setSpreadsheetId] = useState('')

  function goToNextStep(e) {
    e.preventDefault()
    setData((prev) => ({ ...prev, spreadsheetId }))
    nextStep()
  }
  return (
    <form
      onSubmit={goToNextStep}
      className='flex w-80 flex-col justify-between items-center'
    >
      <h2 className='text-xl my-2 text-gray-700'>
        Escolha qual planilha receberá os dados
      </h2>
      <TextInput
        value={spreadsheetId}
        onChange={(e) => setSpreadsheetId(e.target.value)}
        placeholder='Id da planilha'
      />
      <Button type='submit'>Continuar</Button>
    </form>
  )
}
