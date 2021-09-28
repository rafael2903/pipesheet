import { useEffect, useState } from 'react'
import ReactTooltip from 'react-tooltip'
import { Select, Button } from 'components'
import notyf from 'config/notyf'
import api from 'config/api'

export default function PipeName({ nextStep, previousStep, data, setData }) {
  const [pipeId, setPipeId] = useState(data.pipeId)
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
      const pipeName = pipes.find((pipe) => pipe.value === pipeId).name
      setData((prev) => ({ ...prev, pipeId, pipeName }))
      nextStep()
    } else notyf.error('Selecione um pipe')
  }

  return (
    <form
      onSubmit={goToNextStep}
      className='flex w-80 h-full flex-col justify-between items-center'
    >
      <h2 className='text-xl my-2 text-gray-700'>
        Escolha de qual pipe você deseja obter os dados
      </h2>

      <div className='-mb-4 mt-3 w-full flex justify-end'>
        <p
          className='w-max text-right text-sm text-gray-500 cursor-default py-2'
          data-tip='Se o seu pipe for privado,<br /> adicione o admin como administrador do pipe'
        >
          Não encontrou seu pipe?
        </p>
        <ReactTooltip effect='solid' multiline />
      </div>

      <Select
        options={pipes}
        value={pipeId}
        onChange={setPipeId}
        placeholder='Selecione seu pipe'
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
