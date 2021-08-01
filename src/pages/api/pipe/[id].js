import { GraphQLClient } from 'graphql-request'
import { endpoint, headers } from 'config/gql'
import { getPipe } from 'queries'

export default async function handler(req, res) {
  const { id } = req.query

  if (req.method === 'GET') {
    const client = new GraphQLClient(endpoint, { headers })

    try {
      const { pipe } = await client.request(getPipe, { pipeId: id })

      if (pipe) {
        const { name, phases } = pipe
        res.status(200).json({ name, phases })
      } else {
        res.status(404).json({ message: 'Pipe not found.' })
      }
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  } else {
    res.status(405)
    res.end()
  }
}
