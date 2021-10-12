import nc from 'next-connect'
import Integrations from 'models/integrations'
import ddbClient from 'config/ddbClient'
import { nanoid } from 'nanoid'
import { PutItemCommand } from '@aws-sdk/client-dynamodb'

const handler = nc()
  .post(async (req, res) => {
    const { pipeId, spreadsheetId, sheetId, title } = req.body
    try {

      const input = {
        id: { "S": nanoid() },
        title: { "S": title },
        pipeId: { "N": pipeId },
        spreadsheetId: { "S": spreadsheetId },
        sheetId: { "N": sheetId.toString() }
      }

      const params = {
        TableName: "Integrations",
        Item: input
      }

      const command = new PutItemCommand(params)

      const response = await ddbClient.send(command)

      res.status(200).json({ response })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  })
  .get(async (req, res) => {
    try {
      const integrations = await Integrations.all()
      res.status(200).json({ integrations })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  })

export default handler
