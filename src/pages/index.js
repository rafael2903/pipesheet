import Head from 'next/head'
import StepWizard from 'react-step-wizard'
import { PageName, PipeName, SpreadsheetId, Start, Summary } from 'pages/_steps'

export default function Home() {
  return (
    <div className="flex container mx-auto h-screen w-screen justify-center items-center overflow-hidden">
      <Head>
        <title>PipeSheet</title>
        <meta
          name="description"
          content="PipeSheet - Integre seus pipes e planilhas"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col text-center h-72 max-w-sm min-w-sm px-2 sm:px-0">
        <StepWizard>
          <Start />
          <PipeName />
          <SpreadsheetId />
          <PageName />
          <Summary />
        </StepWizard>
      </main>
    </div>
  )
}
