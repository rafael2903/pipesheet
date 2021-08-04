import Head from 'next/head'
import Image from 'next/image'
import StepWizard from 'react-step-wizard'
import {
  container,
  main,
  title,
  description,
  footer,
  logo,
} from 'styles/Home.module.scss'
import {
  PageName,
  PipeName,
  SpreadsheetId,
  Start,
  Summary,
  Nav,
} from 'components/Steps'

export default function Home() {
  return (
    <div className={container}>
      <Head>
        <title>PipeSheet</title>
        <meta
          name="description"
          content="PipeSheet - Integre seus pipes e planilhas"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={main}>
        <Image
          className={title}
          src="/logo.svg"
          alt="PipeSheet Logo"
          width={101}
          height={80}
        />

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
