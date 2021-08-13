import { Button } from 'components'
import Image from 'next/image'
import Link from 'next/link'

export default function Start({ nextStep }) {
  return (
    <div className="flex w-80 flex-col justify-between">
      <Image
        className=""
        src="/logo.svg"
        alt="PipeSheet Logo"
        width={180}
        height={80}
      />
      <h2 className="text-xl my-4">
        Tenha os dados dos seus pipes em suas planilhas!
      </h2>

      <Button onClick={nextStep}>Criar</Button>
      <p className="text-xs">
        Deseja deletar uma integração já criada?{' '}
        <Link href="/integrations/delete">
          <a className="text-blue-600 hover:underline">Clique aqui.</a>
        </Link>
      </p>
    </div>
  )
}
