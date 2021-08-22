import { useState } from 'react'
import Image from 'next/image'
import Spinner from 'react-spinner-material'
import api from 'config/api'

export default function DeleteButton(id, setData) {
  const [loading, setLoading] = useState(false)

  async function deleteIntegration() {
    setLoading(true)
    try {
      await api.delete(`/integrations/${id}`)
      const { data } = await api.get('/integrations')
      setData(data.integrations)
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  return (
    <button
      style={{
        width: 25,
        margin: '0 auto',
        height: 25,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onClick={deleteIntegration}
    >
      {loading ? (
        <Spinner radius={15} color={'#FF1E1E'} stroke={2} visible={true} />
      ) : (
        <Image
          src='/delete.svg'
          alt='Excluir integração'
          title='Excluir integração'
          width={25}
          height={25}
        />
      )}
    </button>
  )
}
