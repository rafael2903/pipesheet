import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import StepWizard from 'react-step-wizard'
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
      <Head>
        <title>PipeSheet</title>
        <meta name='title' content='PipeSheet' />
        <meta name='description' content='Integre seus pipes e planilhas' />

        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://pipesheet.vercel.app/' />
        <meta property='og:title' content='PipeSheet' />
        <meta
          property='og:description'
          content='Integre seus pipes e planilhas'
        />
        <meta property='og:image' content='/cover.png' />

        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:url' content='https://pipesheet.vercel.app/' />
        <meta property='twitter:title' content='PipeSheet' />
        <meta
          property='twitter:description'
          content='Integre seus pipes e planilhas'
        />
        <meta property='twitter:image' content='/cover.png' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='flex flex-col text-center justify-between items-center h-96 max-w-sm min-w-sm px-2 sm:px-0'>
        <div className='mb-14'>
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
