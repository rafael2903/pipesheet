import nc from 'next-connect'
import Integrations from 'models/integrations'
import api from 'config/api'

const handler = nc()
  .post(async (req, res) => {
    const { pipeId, spreadsheetId, sheetId, title } = req.body
    try {
      const integration = await Integrations.create({
        pipeId,
        spreadsheetId,
        sheetId,
        title,
      })

      await api.post(`/integrations/${integration.id}`);

      res.status(200).json({ integration })
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
