import { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import Spinner from 'react-spinner-material'
import Image from 'next/image'
import Link from 'next/link'
import { BsArrowLeft } from 'react-icons/bs'
import { AiOutlineSync } from 'react-icons/ai'
import { DeleteButton } from 'components'
import api from 'config/api'
import notyf from 'config/notyf'

export default function IntegrationsPage() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [synchronizing, setSynchronizing] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    api
      .get('/integrations')
      .then((response) => response.data)
      .then(({ integrations }) => setData(integrations))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false))
  }, [])

  const synchronize = async () => {
    setSynchronizing(true)
    api
      .post('/synchronize')
      .then(() => notyf.success('Integrações sincronizadas'))
      .catch((error) =>
        notyf.error(`Erro ao sincronizar integrações: ${error.message}`)
      )
      .finally(() => setSynchronizing(false))
  }

  const columns = [
    {
      name: 'Título da integração',
      selector: function integrationTitle(row) {
        return (
          <div style={{ whiteSpace: 'normal', textAlign: 'start' }}>
            {row.title}
          </div>
        )
      },
    },
    {
      name: 'Id do pipe',
      selector: 'pipeId',
    },
    {
      name: 'Id da planilha',
      selector: function idColumn(row) {
        return (
          <div style={{ whiteSpace: 'normal', textAlign: 'start' }}>
            {row.spreadsheetId}
          </div>
        )
      },
    },
    {
      name: '',
      selector: 'id',
      cell: ({ id }) => DeleteButton(id, setData),
    },
  ]

  return (
    <div className='container mx-auto mt-14 justify-center flex flex-col mb-12'>
      <Link href='/'>
        <a style={{ width: 'fit-content', margin: '0 auto' }}>
          <Image src='/logo.svg' alt='PipeSheet Logo' width={200} height={70} />
        </a>
      </Link>
      <div className='flex flex-col  text-center items-center justify-center h-auto max-w-full min-w-lg px-2 sm:px-0'>
        <div className='flex flex-row items-center w-full mb-5'>
          <div className='flex items-center'>
            <Link href='/'>
              <a style={{ height: 26 }}>
                <BsArrowLeft title='Voltar' size='26px' />
              </a>
            </Link>
          </div>
          <h1 className='ml-10 text-3xl p-2'>Integrações</h1>
          <button onClick={synchronize}>
            <AiOutlineSync
              size='20px'
              color='#0F9D58'
              className={synchronizing ? 'mt-2 animate-spin' : 'mt-2'}
              title='Sincronizar agora'
            />
          </button>
        </div>

        {loading ? (
          <div className='mt-20'>
            <Spinner radius={30} color={'#3c85ff'} stroke={3} visible={true} />
          </div>
        ) : error ? (
          <h2>Erro: {error}</h2>
        ) : (
          <DataTable noHeader columns={columns} data={data} />
        )}
      </div>
    </div>
  )
}
