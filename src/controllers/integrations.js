import { nanoid } from 'nanoid'
import {
  PutItemCommand,
  ScanCommand,
  DeleteItemCommand,
  GetItemCommand,
} from '@aws-sdk/client-dynamodb'
import ddbClient from 'config/ddbClient'

class Integrations {
  static formatItem(item) {
    Object.keys(item).forEach((key) => {
      if (item[key].M) {
        item[key] = item[key].M
        this.formatItem(item[key])
      } else item[key] = item[key].S || item[key].N || item[key].BOOL
    })
  }

  static formatItems(items) {
    items.forEach((item) => this.formatItem(item))
  }

  static async create({ pipeId, spreadsheetId, sheetId, title, columns }) {
    const integrationId = nanoid()

    const input = {
      id: { S: integrationId },
      title: { S: title },
      pipeId: { N: pipeId },
      spreadsheetId: { S: spreadsheetId },
      sheetId: { N: sheetId.toString() },
      columns: {
        M: {
          id: { BOOL: columns.id },
          title: { BOOL: columns.title },
          currentPhase: { BOOL: columns.currentPhase },
          labels: { BOOL: columns.labels },
          assignees: { BOOL: columns.assignees },
          createdAt: { BOOL: columns.createdAt },
          updatedAt: { BOOL: columns.updatedAt },
          dueDate: { BOOL: columns.dueDate },
          startFormFields: { BOOL: columns.startFormFields },
          phasesFormsFields: { BOOL: columns.phasesFormsFields },
          phasesHistory: { BOOL: columns.phasesHistory },
        },
      },
    }

    const params = {
      TableName: 'Integrations',
      Item: input,
    }

    const command = new PutItemCommand(params)
    const response = await ddbClient.send(command)

    return response
  }

  static async all() {
    const params = {
      TableName: 'Integrations',
    }

    const command = new ScanCommand(params)
    const { Items } = await ddbClient.send(command)
    this.formatItems(Items)

    return Items
  }

  static async find(id) {
    const params = {
      TableName: 'Integrations',
      Key: { id: { S: id } },
    }

    const command = new GetItemCommand(params)
    const { Item } = await ddbClient.send(command)

    if (!Item) throw new Error('Integration not found')

    this.formatItem(Item)
    return Item
  }

  static async destroy(id) {
    const params = {
      TableName: 'Integrations',
      Key: { id: { S: id } },
    }

    const command = new DeleteItemCommand(params)
    await ddbClient.send(command)
  }
}

export default Integrations
