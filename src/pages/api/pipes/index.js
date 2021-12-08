import base from '../middleware/cors'
import { client } from 'config/gql'
import { getAllPipes } from 'queries'
import hiddenPipes from 'config/hiddenPipes.json'

const handler = base().get(async (req, res) => {
  const organizationId = process.env.PIPEFY_ORGANIZATION_ID
  const hiddenPipesIds = hiddenPipes.pipes.map((hiddenPipe) => hiddenPipe.id)

  try {
    const { organization } = await client.request(getAllPipes, {
      organizationId,
    })

    if (organization) {
      const { pipes } = organization
      const availablePipes = pipes.filter(
        (pipe) => !hiddenPipesIds.includes(pipe.id)
      )

      const compareFunction = (pipe1, pipe2) => {
        if (pipe1.name > pipe2.name) return 1
        if (pipe1.name < pipe2.name) return -1
        return 0
      }

      availablePipes.sort(compareFunction)

      res.status(200).json({ pipes: availablePipes })
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
