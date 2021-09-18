import { useState } from 'react'
import { TextInput, Button, Loading } from 'components'
import api from 'config/api'
import notyf from 'config/notyf'

export default function Summary({ data, setData, goToStep, setProgress }) {
  const [integrationName, setIntegrationName] = useState('')
  const { pipeId, pipeName, sheetId, spreadsheetId, spreadsheetTitle } = data
  const [isLoading, setIsLoading] = useState(false)

  async function createIntegration(e) {
    e.preventDefault()

    if (integrationName) {
      setIsLoading(true)
      try {
        const data = await api.post('/integrations', {
        pipeId,
        sheetId,
        spreadsheetId,
        title: integrationName,
      })
      setProgress(100)
      setData({})
      goToStep(1)
      notyf.success('Integração criada com sucesso!')
    } catch (error) {
      notyf.error('Houve um erro ao criar a integração.')
    } finally {
      setIsLoading(false)
    }
  } else notyf.error('Digite um nome para sua integração')
}

  return (
    <form
      onSubmit={createIntegration}
      className='flex w-80 flex-col justify-between items-center'
    >
      <h2 className='text-xl my-2 text-gray-700'>
        Os dados do pipe <span style={{ color: '#3c85ff', fontWeight: '500' }}>{pipeName}</span> serão exportados para a planilha <span style={{ color: '#0f9d58', fontWeight: '500'}}>{spreadsheetTitle}</span> e atualizados automaticamente
      </h2>
      <TextInput
        value={integrationName}
        onChange={(e) => setIntegrationName(e.target.value)}
        placeholder='Dê um nome a sua integração'
      />
      <Button type='submit' disabled={isLoading} onClick={createIntegration}>
        {isLoading ? (
          <Loading />
        ) : (
          'Ativar integração'
        )}
      </Button>
    </form>
  )
}
