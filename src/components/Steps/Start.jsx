import { Button } from 'components'
import Link from 'next/link'

export default function Start({ nextStep }) {
  return (
    <div className='flex flex-col w-80 justify-between items-center'>
      <h2 className='text-xl text-gray-700 mt-2 mb-4'>
        Tenha os dados dos seus pipes em suas planilhas!
      </h2>

      <Button onClick={nextStep}>Criar integração</Button>

      <span className='mt-2 w-full'>
        <Link href='/integrations' passHref>
          <Button onClick={() => {}} variation='secondary'>
            Ver integrações
          </Button>
        </Link>
      </span>
    </div>
  )
}
