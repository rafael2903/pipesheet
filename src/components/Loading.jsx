import Lottie from 'react-lottie'
import loading from 'assets/lotties/loading.json'

export default function Loading() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loading,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  return (
    <Lottie
      options={defaultOptions}
      height={44}
      width={44}
      style={{ cursor: 'not-allowed' }}
    />
  )
}
