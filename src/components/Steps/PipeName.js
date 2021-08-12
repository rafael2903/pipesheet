import { container, header, button, base_input } from 'styles/Steps.module.scss'
import { Select } from 'components'
import { useState } from 'react'
import SelectSearch from 'react-select-search/dist/cjs/SelectSearch'
import Button from 'components/Button'

const data = [
  { value: 'oi', name: 'Funil' },
  { value: 'ola', name: 'Pos Neg' },
]
export default function PipeName({ nextStep }) {
  const [selected, setSelected] = useState('oi')

  return (
    <div className="flex flex-col justify-between">
      <h2 className="text-xl my-2">Escolha qual pipe deseja utilizar</h2>
      <Select
        options={data}
        value={selected}
        onChange={setSelected}
        placeholder="Selecione seu pipe"
      />

      <Button onClick={nextStep}>Continuar</Button>
    </div>
  )
}
