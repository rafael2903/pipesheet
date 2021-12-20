import { useEffect } from 'react'
import LoadingBar from 'react-top-loading-bar'

export function Nav({
  progress,
  setProgress,
  currentStep,
  totalSteps,
  goToStep,
}) {
  useEffect(() => {
    setProgress(((currentStep - 1) / totalSteps) * 100)
  }, [currentStep, totalSteps, setProgress])

  return (
    <LoadingBar
      color='#2563eb'
      progress={progress}
      height={3}
      onLoaderFinished={() => setProgress(0)}
    />
  )
}
