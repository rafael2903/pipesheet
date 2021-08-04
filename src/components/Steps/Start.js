import { header, button, container } from 'styles/Steps.module.scss'

export default function Start({ nextStep }) {
  return (
    <div className={container}>
      <h2 className={header}>
        Tenha os dados dos seus pipes em suas planilhas!
      </h2>
      <button className={button} onClick={nextStep}>
        Começar
      </button>
    </div>
  )
}
