import { nanoid } from 'nanoid';
import { client } from 'config/gql';
import { createWebhookMutation, deleteWebhookMutation } from 'mutations';
import { fetchDatabase } from 'config/spreadsheet';
import api from 'config/api'

async function createWebhook(pipeId, integrationId) {
  const apiURL = api.defaults.baseURL
  const url = `${apiURL}/integrations/${integrationId}`;

  const response = await client.request(createWebhookMutation, { pipeId, url });
  const webhookId = response.createWebhook.webhook.id;

  return webhookId;
}

class Integrations {
  static async create({ pipeId, spreadsheetId, sheetId, title }) {
    const integrationId = nanoid();

    const webhookId = await createWebhook(pipeId, integrationId);

    const spreadsheet = await fetchDatabase();
    const sheet = spreadsheet.sheetsByTitle['Integrations'];

    const integration = {
      id: integrationId,
      title,
      pipeId,
      spreadsheetId,
      sheetId,
      webhookId,
    };

    sheet.addRow(integration);

    return integration;
  }

  static async all() {
    const spreadsheet = await fetchDatabase();
    const sheet = spreadsheet.sheetsByTitle['Integrations'];
    const rows = await sheet.getRows();

    const integrations = rows.map(
      ({ id, title, pipeId, spreadsheetId, sheetId, webhookId }) => ({
        id,
        title,
        pipeId,
        spreadsheetId,
        sheetId,
        webhookId,
      })
    );

    return integrations;
  }

  static async find(id) {
    const spreadsheet = await fetchDatabase();
    const sheet = spreadsheet.sheetsByTitle['Integrations'];
    const integrations = await sheet.getRows();

    const integration = integrations.find(
      (integration) => integration.id === id
    );

    if (!integration) throw new Error('Integration not found');

    return integration;
  }

  static async destroy(id) {
    const integration = await this.find(id);
    const { webhookId } = integration;
    await client.request(deleteWebhookMutation, { webhookId });
    await integration.delete();
  }
}

export default Integrations;
