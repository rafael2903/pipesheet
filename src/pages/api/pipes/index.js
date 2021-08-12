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
      res.status(200).json({ pipes })
    } else {
      res
        .status(404)
        .json({
          error:
            "Organization not found. Check the 'PIPEFY_ORGANIZATION_ID' environment variable",
        })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default handler
