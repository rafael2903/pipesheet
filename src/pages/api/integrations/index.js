import base from '../middleware/cors'
import Integrations from 'controllers/integrations'
import api from 'config/api'

const handler = base()
  .post(async (req, res) => {
    const { pipeId, spreadsheetId, sheetId, title } = req.body

    try {
      const response = await Integrations.create({
        pipeId,
        spreadsheetId,
        sheetId,
        title,
      })

      await api.post('/synchronize')

      res.status(201).json({ response })
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
