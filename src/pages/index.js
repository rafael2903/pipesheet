import Head from 'next/head'
import StepWizard from 'react-step-wizard'
import { PageName, PipeName, SpreadsheetId, Start, Summary } from 'pages/_steps'

export default function Home() {
  return (
    <div className="flex container mx-auto h-screen w-screen justify-center items-center overflow-hidden">
      <Head>
        <!-- Primary Meta Tags -->
        <title>PipeSheet</title>
        <meta name="title" content="PipeSheet">
        <meta name="description" content="Integre seus pipes e planilhas">

        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website">
        <meta property="og:url" content="https://pipesheet.vercel.app/">
        <meta property="og:title" content="PipeSheet">
        <meta property="og:description" content="Integre seus pipes e planilhas">
        <meta property="og:image" content="">

        <!-- Twitter -->
        <meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:url" content="https://pipesheet.vercel.app/">
        <meta property="twitter:title" content="PipeSheet">
        <meta property="twitter:description" content="Integre seus pipes e planilhas">
        <meta property="twitter:image" content="">
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
