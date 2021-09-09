import { useState } from 'react'
import ReactTooltip from 'react-tooltip';
import { Button, TextInput, Loading } from 'components'
import notyf from 'config/notyf'
import api from 'config/api'
import Help from 'assets/help.svg'

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
        setData((prev) => ({ 
          ...prev, 
          spreadsheetId, 
          spreadsheetTitle: data.title,
          sheets: data.sheets.map((sheet) => ({
            name: sheet.title,
            value: sheet.sheetId,
          }))
        }))
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
        Digite o id da planilha que receberá os dados
      </h2>

      <div className='w-full relative'>
        <TextInput
          value={spreadsheetId}
          onChange={(e) => setSpreadsheetId(e.target.value)}
          placeholder='Id da planilha'
          className='pr-10'
        />
        <span 
          data-tip={`
            <p style='width: 630px'>Você pode encontrar o id da planilha na url dela, na parte em destaque:
              https://docs.google.com/spreadsheets/d/<span style='color: #12b944; font-weight: bold'>1xD155MAOMQpVeCEpjk0qSTfopz2u19cpGK2nuzah1mU</span>/edit
            </p>
          `}
          data-html
          className='absolute right-2 top-2/4 transform -translate-y-2/4 p-1' 
        >
          <Help 
            
          />
        <ReactTooltip effect='solid' multiline/>
        </span>
      </div>

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