import { useEffect, useState } from 'react'
import Circle from 'assets/circle.svg'

export default function Nav({ currentStep, totalSteps, goToStep }) {
  const [steps, setSteps] = useState(Array(totalSteps).fill(false))

  useEffect(() => {
    setSteps((prev) => prev.map((_, idx) => idx < currentStep))
  }, [currentStep])

  return (
    <nav className='flex w-80 gap-2 justify-center mt-5'>
      {steps.map((step, idx) => (
        <button 
          className=' inline' 
          onClick={() => idx < currentStep && goToStep(idx + 1)}
          style={{ cursor: idx < currentStep ? 'pointer' : 'default' }} 
          key={idx}
        >
          <Circle
            className={`inline fill-current ${
              step ? 'text-blue-500' : 'text-blue-100'
            }`}
          />
        </button>
      ))}
    </nav>
  )
}
