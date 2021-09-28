import nc from 'next-connect'
import { client } from 'config/gql'
import { getAllPipes } from 'queries'

const handler = nc().get(async (req, res) => {
  const organizationId = process.env.PIPEFY_ORGANIZATION_ID

  try {
    const { organization } = await client.request(getAllPipes, {
      organizationId,
    })

    if (organization) {
      const { pipes } = organization

      const compareFunction = (pipe1, pipe2) => {
        if (pipe1.name > pipe2.name) return 1
        if (pipe1.name < pipe2.name) return -1
        return 0
      }
      pipes.sort(compareFunction)

      res.status(200).json({ pipes })
    } else {
      res.status(404).json({
        error:
          "Organization not found. Check the 'PIPEFY_ORGANIZATION_ID' environment variable",
      })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default handler
