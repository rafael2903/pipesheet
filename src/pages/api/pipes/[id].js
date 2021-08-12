import nc from 'next-connect'
import { client } from 'config/gql'
import { getPipe } from 'queries'

const handler = nc().get(async (req, res) => {
  const { id } = req.query

  try {
    const { pipe } = await client.request(getPipe, { pipeId: id })

    if (pipe) {
      const { name, phases } = pipe
      res.status(200).json({ name, phases })
    } else {
      res.status(404).json({ error: 'Pipe not found.' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default handler
