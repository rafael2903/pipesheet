import { container, base_input, header, button } from 'styles/Steps.module.scss'

export default function Summary() {
  return (
    <div className={container}>
      <h2 className={header}>
        O pipe tanana será conectado com a planilha tanana2. Qualquer alteração
        feita no pipe refletirá na planilha{' '}
      </h2>
      <input
        className={base_input}
        type="text"
        placeholder="Dê um nome a sua integração"
      />
      <button className={button}>Ativar sincronização</button>
    </div>
  )
}
