import nc from 'next-connect';
import { fetchDatabase } from 'config/spreadsheet';

const handler = nc()
    .post(async (req, res) => {

    const { id } = req.query

    try {

        const spreadsheet = await fetchDatabase();
        const sheet = spreadsheet.sheetsByTitle['Integrations'];
        const rows = await sheet.getRows();

        const integrations = rows.map(({ id, pipeId, spreadsheetId, sheetId, webhookId }) => ({ id, pipeId, spreadsheetId, sheetId, webhookId }));
        const integration = integrations.find(integration => integration.id === id);

        res.status(200).json({ integration });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default handler;
