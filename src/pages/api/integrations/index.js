import nc from 'next-connect';
import { nanoid } from 'nanoid';
import { client } from 'config/gql'
import { createWebhookMutation } from 'mutations';
import { fetchDatabase } from 'config/spreadsheet';


async function createWebhook(pipeId, integrationId) {

    const url = `http://localhost:3000/api/integrations/${integrationId}`;

    const response = await client.request(createWebhookMutation, { pipeId, url });
    const webhookId = response.createWebhook.webhook.id;

    return webhookId;
}

const handler = nc()
    .post(async (req, res) => {

    const { pipeId,  spreadsheetId, sheetId } = req.body;
    const integrationId = nanoid();

    try {

        const webhookId = await createWebhook(pipeId, integrationId);

        const spreadsheet = await fetchDatabase();
        const sheet = spreadsheet.sheetsByTitle['Integrations'];

        sheet.addRow({ id: integrationId, pipeId,  spreadsheetId, sheetId, webhookId });

        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default handler;
