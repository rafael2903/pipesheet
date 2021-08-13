import { Select, Button } from 'components'
import { useEffect, useState } from 'react'
import api from 'config/api'

export default function PipeName({ nextStep }) {
  const [pipeId, setPipeId] = useState('')
  const [pipes, setPipes] = useState([])

  useEffect(() => {
    getAllPipes()
  }, [])

  async function getAllPipes() {
    try {
      const { data } = await api.get('/api/pipes')
      setPipes(data.pipes.map((pipe) => ({ name: pipe.name, value: pipe.id })))
    } catch (error) {
      console.log('erro:', error.message)
    }
  }

  return (
    <div className="flex w-80 flex-col justify-between">
      <h2 className="text-xl my-2">Escolha qual pipe deseja utilizar</h2>
      <Select
        options={pipes}
        value={pipeId}
        onChange={setPipeId}
        placeholder="Selecione seu pipe"
      />

      <Button onClick={nextStep}>Continuar</Button>
    </div>
  )
}
