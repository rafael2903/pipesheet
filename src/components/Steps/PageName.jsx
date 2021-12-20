import { useState } from 'react'
import { Select, Button } from 'components'
import notyf from 'config/notyf'

export function PageName({ nextStep, previousStep, data, setData }) {
  const { sheets } = data
  const [sheetId, setSheetId] = useState(data.sheetId || sheets[0]?.value)

  function goToNextStep(e) {
    e.preventDefault()
    if (sheetId !== undefined) {
      setData((prev) => ({ ...prev, sheetId }))
      nextStep()
    } else notyf.error('Selecione uma página')
  }

  return (
    <form
      onSubmit={goToNextStep}
      className='flex w-80 flex-col justify-between items-center'
    >
      <h2 className='text-xl my-2 text-gray-700'>
        Escolha qual página da planilha receberá os dados
      </h2>
      <Select
        options={sheets}
        value={sheetId}
        onChange={setSheetId}
        placeholder='Selecione sua página'
      />
      <Button type='submit'>Continuar</Button>
      <Button
        type='button'
        className='mt-2'
        variation={'secondary'}
        onClick={previousStep}
      >
        Voltar
      </Button>
    </form>
  )
}
