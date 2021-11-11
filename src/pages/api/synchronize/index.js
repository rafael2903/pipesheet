import base from '../middleware/cors'
import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda'
import Integrations from 'controllers/integrations'

const handler = base().post(async (req, res) => {
  try {
    const integrations = await Integrations.all()

    if (integrations.length) {
      const client = new LambdaClient({
        region: 'us-west-1',
        credentials: {
          accessKeyId: process.env.PIPESHEET_AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.PIPESHEET_AWS_SECRET_ACCESS_KEY,
        },
      })
      const command = new InvokeCommand({
        FunctionName: 'pipesheet-dev-synchronize',
        InvocationType: 'Event ',
        Payload: JSON.stringify({ integrations }),
      })
      const response = await client.send(command)

      res.status(200).json(response)
    } else {
      res.status(200).json({ message: 'No integrations to synchronize' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message })
  }
})

export default handler
