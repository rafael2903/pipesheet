import nc from 'next-connect'
import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda'

const handler = nc().post(async (req, res) => {
  try {
    const client = new LambdaClient({
      region: 'us-west-1',
    })
    const command = new InvokeCommand({
      FunctionName: 'pipesheet-dev-synchronize',
      InvocationType: 'Event ',
    })
    const response = await client.send(command)

    res.status(200).json(response)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message })
  }
})

export default handler
