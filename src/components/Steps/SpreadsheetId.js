import { Button, TextInput } from 'components'

export default function SpreadsheetId({ nextStep }) {
  return (
    <div className="flex flex-col justify-between">
      <h2 className="text-xl my-2">Escolha qual planilha receberá os dados</h2>
      <TextInput placeholder="Id da planilha" />
      <Button onClick={nextStep}>Continuar</Button>
    </div>
  )
}
