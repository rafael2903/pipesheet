import nc from 'next-connect';
import { google } from 'googleapis';

function authenticate() {
  const auth = new google.auth.JWT(
    process.env.CLIENT_EMAIL,
    null,
    process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
    ['https://www.googleapis.com/auth/spreadsheets']
  );

  auth.authorize((error) => {
    if (error) throw error;
  });

  return auth;
}

const handler = nc()
    .get(async (req, res) => {
    const auth = authenticate();
    const googleAPI = google.sheets({ version: 'v4', auth });
    const { id } = req.query;

    try {
        const { data } = await googleAPI.spreadsheets.get({ spreadsheetId: id });
        const { title } = data.properties;

        const sheets = data.sheets.map(({ properties }) => ({ title: properties.title, sheetId: properties.sheetId }));

        res.status(200).json({ title, sheets })
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

export default handler;
