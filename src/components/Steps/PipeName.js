import { container, header, button, base_input } from 'styles/Steps.module.scss'

export default function PipeName({ nextStep }) {
  return (
    <div className={container}>
      <h2 className={header}>Escolha qual pipe deseja utilizar</h2>
      <select
        className={`${base_input}`}
        name="pipe"
        id="pipe"
        placeholder="Escolha um pipe"
      >
        <option value="">Escolha um pipe</option>
        <option value="pipe1">Funil</option>
        <option value="pipe2">Politica de benefícios</option>
      </select>

      <button className={button} onClick={nextStep}>
        Continuar
      </button>
    </div>
  )
}
