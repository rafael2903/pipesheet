import { container, base_input, header, button } from 'styles/Steps.module.scss'
export default function PageName({ nextStep }) {
  return (
    <div className={container}>
      <h2 className={header}>
        Escolha qual página da planilha receberá os dados do pipe
      </h2>
      <select className={base_input} name="page-name" id="page-name">
        <option value="oi">Oi</option>
      </select>
      <button className={button} onClick={nextStep}>
        Continuar
      </button>
    </div>
  )
}
