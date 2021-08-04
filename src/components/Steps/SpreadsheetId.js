import { container, base_input, header, button } from 'styles/Steps.module.scss'

export default function SpreadsheetId({ nextStep }) {
  return (
    <div className={container}>
      <h2 className={header}>Digite o ID da planilha a ser conectada</h2>
      <input className={base_input} type="text" />
      <button className={button} onClick={nextStep}>
        Continuar
      </button>
    </div>
  )
}
