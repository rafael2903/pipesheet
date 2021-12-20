import { useState } from 'react'
import Spinner from 'react-spinner-material'
import { MdOutlineClose } from 'react-icons/md'
import api from 'config/api'

export function DeleteButton(id, setData) {
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
        <MdOutlineClose
          title='Excluir integração'
          color='#FF1E1E'
          size='24px'
        />
      )}
    </button>
  )
}
