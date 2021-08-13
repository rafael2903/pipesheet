import { nav } from 'styles/Steps.module.scss'

export default function Nav({ currentStep }) {
  return (
    <div className={nav}>
      <h2>{currentStep}</h2>
    </div>
  )
}
