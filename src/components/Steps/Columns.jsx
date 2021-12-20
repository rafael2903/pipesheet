import { useState } from 'react'
import { Button, Checkbox } from 'components'
import notyf from 'config/notyf'
import styles from './styles.module.css'

export function Columns({ nextStep, previousStep, data, setData }) {
  const [columns, setColumns] = useState([
    { name: 'id', value: Boolean(data.columns?.id), label: 'Id' },
    { name: 'title', value: Boolean(data.columns?.title), label: 'Título' },
    {
      name: 'currentPhase',
      value: Boolean(data.columns?.currentPhase),
      label: 'Fase atual',
    },
    {
      name: 'labels',
      value: Boolean(data.columns?.labels),
      label: 'Etiquetas',
    },
    {
      name: 'assignees',
      value: Boolean(data.columns?.assignees),
      label: 'Responsáveis',
    },
    {
      name: 'createdAt',
      value: Boolean(data.columns?.createdAt),
      label: 'Criado em',
    },
    {
      name: 'updatedAt',
      value: Boolean(data.columns?.updatedAt),
      label: 'Atualizado em',
    },
    {
      name: 'dueDate',
      value: Boolean(data.columns?.dueDate),
      label: 'Data de vencimento',
    },
    {
      name: 'startFormFields',
      value: Boolean(data.columns?.startFormFields),
      label: 'Campos do formulário de início',
    },
    {
      name: 'phasesFormsFields',
      value: Boolean(data.columns?.phasesFormsFields),
      label: 'Campos dos formulários de fases',
    },
    {
      name: 'phasesHistory',
      value: Boolean(data.columns?.phasesHistory),
      label: 'Histórico do card nas fases',
    },
  ])

  function goToNextStep(e) {
    e.preventDefault()
    if (columns.some((column) => column.value)) {
      let formattedColumns = {}
      columns.forEach((column) => {
        formattedColumns[column.name] = column.value
      })
      setData((prev) => ({ ...prev, columns: formattedColumns }))
      nextStep()
    } else notyf.error('Selecione ao menos um dado')
  }

  const handleCheck = (event) => {
    const name = event.target.name
    const checked = event.target.checked

    let newState = [...columns]
    const columnIndex = newState.findIndex((column) => column.name === name)
    newState[columnIndex].value = checked

    setColumns(newState)
  }

  return (
    <form
      onSubmit={goToNextStep}
      className='flex w-80 flex-col justify-between items-center'
    >
      <h2 className='text-xl my-2 text-gray-700'>
        Escolha quais dados dos cards você deseja obter
      </h2>

      <div
        className={`w-full flex flex-wrap justify-center my-4 overflow-y-scroll h-36 ${styles['container']}`}
      >
        {columns.map((column) => (
          <Checkbox
            key={column.name}
            name={column.name}
            checked={column.value}
            label={column.label}
            onChange={handleCheck}
          />
        ))}
      </div>

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
