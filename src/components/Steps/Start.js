import { header, button, container } from 'styles/Steps.module.scss'
import { Button } from 'components'
import Image from 'next/image'

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

      <div className="flex w-full justify-between">
        <Button variation="red">Deletar</Button>
        <Button onClick={nextStep}>Criar</Button>
      </div>
    </div>
  )
}
