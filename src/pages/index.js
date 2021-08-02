import Head from 'next/head'
import Image from 'next/image'
import {
  container,
  main,
  title,
  description,
  grid,
  card,
  footer,
  logo,
} from '../styles/Home.module.scss'

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
        <h1 className={title}>
          <Image
            src="/logo.svg"
            alt="PipeSheet Logo"
            width={300}
            height={200}
          />
        </h1>

        <p className={description}>
          Tenha os dados dos seus pipes em suas planilhas
        </p>

        <div className={grid}>
          <a href="https://nextjs.org/docs" className={card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
