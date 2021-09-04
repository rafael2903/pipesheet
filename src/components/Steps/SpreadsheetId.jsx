import { useState } from 'react'
import { Button, TextInput, Loading } from 'components'
import notyf from 'config/notyf'
import api from 'config/api'

export default function SpreadsheetId({ nextStep, setData }) {
  const [spreadsheetId, setSpreadsheetId] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  function goToNextStep(e) {
    e.preventDefault()    
    
    if (spreadsheetId) {
      setIsLoading(true)

      api
      .get(`/spreadsheets/${spreadsheetId}`)
      .then(({ data }) => {
        setData((prev) => ({ ...prev, spreadsheetId, spreadsheetTitle: data.title }))
        nextStep()
      })
      .catch(() => notyf.error('Digite um id válido'))
      .finally(() => setIsLoading(false))

    } else notyf.error('Digite o id da planilha')
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
      {/* <Button type='submit'>Continuar</Button> */}

      <Button type='submit' disabled={isLoading}>
        {isLoading ? (
          <Loading />
        ) : (
          'Continuar'
        )}
      </Button>
    </form>
  )
}
