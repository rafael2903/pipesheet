import { useEffect, useState, useRef } from 'react'
import Circle from 'assets/circle.svg'
import LoadingBar from 'react-top-loading-bar'

export default function Nav({ progress, setProgress, currentStep, totalSteps, goToStep }) {
  const [steps, setSteps] = useState(Array(totalSteps).fill(false))

  useEffect(() => {
    // setSteps((prev) => prev.map((_, idx) => idx < currentStep))
    setProgress(((currentStep-1)/totalSteps)*100)
  }, [currentStep, totalSteps, setProgress])

  const ref = useRef(null)

  return (
    // <nav className='flex w-80 gap-2 justify-center mt-5'>
    //   {steps.map((step, idx) => (
    //     <button 
    //       className=' inline' 
    //       onClick={() => idx < currentStep && goToStep(idx + 1)}
    //       style={{ cursor: idx < currentStep ? 'pointer' : 'default' }} 
    //       key={idx}
    //     >
    //       <Circle
    //         className={`inline fill-current ${
    //           step ? 'text-blue-500' : 'text-blue-100'
    //         }`}
    //       />
    //     </button>
    //   ))}
    // </nav>
    <LoadingBar
        color='#2563eb'
        progress={progress}
        height={3}
        onLoaderFinished={() => setProgress(0)}
    />
  )
}
