import { container, base_input, header, button } from 'styles/Steps.module.scss'
import { TextInput, Button } from 'components'

export default function Summary() {
  return (
    <div className="flex flex-col justify-between">
      <h2 className="text-xl my-2">
        O pipe tanana será conectado com a planilha tanana2. Qualquer alteração
        feita no pipe refletirá na planilha{' '}
      </h2>
      <TextInput placeholder="Dê um nome a sua integração" />
      <Button>Ativar sincronização</Button>
    </div>
  )
}
