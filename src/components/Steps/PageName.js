import { container, header, button, base_input } from 'styles/Steps.module.scss'
import { Select } from 'components'
import { useState } from 'react'
import SelectSearch from 'react-select-search/dist/cjs/SelectSearch'
import Button from 'components/Button'

const data = [
  { value: 'oi', name: 'Página 1' },
  { value: 'ola', name: 'Página 2' },
]
export default function PipeName({ nextStep }) {
  const [selected, setSelected] = useState('oi')

  return (
    <div className="flex w-80 flex-col justify-between">
      <h2 className="text-xl my-2">Escolha qual página receberá os dados</h2>
      <Select
        options={data}
        value={selected}
        onChange={setSelected}
        placeholder="Selecione sua página"
      />

      <Button onClick={nextStep}>Continuar</Button>
    </div>
  )
}
