import { TextInput, Button } from 'components'
import { useState } from 'react'

export default function Summary() {
  const [integrationName, setIntegrationName] = useState('')

  return (
    <div className="flex w-80 flex-col justify-between">
      <h2 className="text-xl my-2">
        O pipe tanana será conectado com a planilha tanana2. Qualquer alteração
        feita no pipe refletirá na planilha{' '}
      </h2>
      <TextInput
        value={integrationName}
        onChange={setIntegrationName}
        placeholder="Dê um nome a sua integração"
      />
      <Button>Ativar sincronização</Button>
    </div>
  )
}
