import { useState } from 'react'
import Image from 'next/image'
import StepWizard from 'react-step-wizard'
import { Head } from 'components'
import {
  Nav,
  PageName,
  PipeName,
  SpreadsheetId,
  Start,
  Summary,
} from 'components/Steps'

export default function Home() {
  const [data, setData] = useState({})
  const [progress, setProgress] = useState(0)

  return (
    <div className='flex container mx-auto h-screen w-screen justify-center items-center overflow-hidden relative'>
      <Head />
      <main className='flex flex-col text-center justify-between items-center h-96 max-w-sm min-w-sm px-2 sm:px-0'>
        <div className='mb-20'>
          <Image
            src='/logo.svg'
            alt='PipeSheet Logo'
            width={400}
            height={120}
          />
        </div>

        <StepWizard
          className='flex flex-col-reverse justify-between h-3/5'
          nav={<Nav progress={progress} setProgress={setProgress} />}
          isLazyMount
        >
          <Start />
          <PipeName data={data} setData={setData} />
          <SpreadsheetId data={data} setData={setData} />
          <PageName data={data} setData={setData} />
          <Summary data={data} setData={setData} setProgress={setProgress} />
        </StepWizard>
      </main>
    </div>
  )
}
