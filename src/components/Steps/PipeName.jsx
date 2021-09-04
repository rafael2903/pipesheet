import { useEffect, useState } from 'react'
import { Select, Button } from 'components'
import notyf from 'config/notyf'
import api from 'config/api'

export default function PipeName({ nextStep, setData }) {
  const [pipeId, setPipeId] = useState('')
  const [pipes, setPipes] = useState([])

  useEffect(() => {
    async function getAllPipes() {
      try {
        const { data } = await api.get('/pipes')
        setPipes(
          data.pipes.map((pipe) => ({ name: pipe.name, value: pipe.id }))
        )
      } catch (error) {
        console.log(error.message)
      }
    }
    getAllPipes()
  }, [])

  function goToNextStep(e) {
    e.preventDefault()
    if (pipeId) {
      const pipeName = pipes.find(pipe => pipe.value === pipeId).name;
      setData((prev) => ({ ...prev, pipeId, pipeName }))
      nextStep()
    } else notyf.error('Selecione um pipe')
  }

  return (
    <form
      onSubmit={goToNextStep}
      className='flex w-80 flex-col justify-between items-center'
    >
      <h2 className='text-xl my-2 text-gray-700'>
        Escolha de qual pipe você deseja obter os dados
      </h2>

      <Select
        options={pipes}
        value={pipeId}
        onChange={setPipeId}
        placeholder='Selecione seu pipe'
      />
      <Button type='submit'>Continuar</Button>
    </form>
  )
}
