import { useState } from 'react'
import Lottie from 'react-lottie'
import { TextInput, Button } from 'components'
import loading from 'assets/lotties/loading.json'
import api from 'config/api'

export default function Summary({ data, setData, goToStep }) {
  const [integrationName, setIntegrationName] = useState('')
  const { pipeId, sheetId, spreadsheetId } = data
  const [isLoading, setIsLoading] = useState(false)

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loading,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  async function createIntegration(e) {
    e.preventDefault()
    setIsLoading(true)
    try {
      const data = await api.post('/integrations', {
        pipeId,
        sheetId,
        spreadsheetId,
        title: integrationName,
      })
      alert('Integração criada com sucesso!')
      setData({})
      goToStep(1)
    } catch (error) {
      alert('Houve um erro ao criar integração. Tente novamente.')
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      onSubmit={createIntegration}
      className='flex w-80 flex-col justify-between items-center'
    >
      <h2 className='text-xl my-2 text-gray-700'>
        Os dados do pipe serão sincronizados na planilha
      </h2>
      <TextInput
        value={integrationName}
        onChange={(e) => setIntegrationName(e.target.value)}
        placeholder='Dê um nome a sua integração'
      />
      <Button type='submit' disabled={isLoading} onClick={createIntegration}>
        {isLoading ? (
          <Lottie options={defaultOptions} height={44} width={44} style />
        ) : (
          'Ativar integração'
        )}
      </Button>
    </form>
  )
}
