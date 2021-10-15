import nc from 'next-connect'
import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda'
import Integrations from 'controllers/integrations'

const handler = nc().post(async (req, res) => {
  try {
    const integrations = await Integrations.all()

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
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message })
  }
})

export default handler
