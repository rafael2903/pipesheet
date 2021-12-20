import NextHead from 'next/head'

export function Head() {
  return (
    <NextHead>
      <title>PipeSheet</title>
      <meta name='title' content='PipeSheet' />
      <meta name='description' content='Integre seus pipes e planilhas' />
      <meta name='theme-color' content='#ffffff' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />

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
    </NextHead>
  )
}
