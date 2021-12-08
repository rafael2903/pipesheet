import base from '../middleware/cors'
import Integrations from 'controllers/integrations'
import api from 'config/api'
import hiddenPipes from 'config/hiddenPipes.json'

const pipeNotAvailable = (pipeId) => {
  const hiddenPipesIds = hiddenPipes.pipes.map((hiddenPipe) => hiddenPipe.id)
  return hiddenPipesIds.includes(pipeId)
}

const handler = base()
  .post(async (req, res) => {
    const { pipeId, spreadsheetId, sheetId, title } = req.body

    if (pipeNotAvailable(pipeId))
      res
        .status(401)
        .json({
          error: `Pipe ${pipeId} is not available for data export. Check "hiddenPipes.json" if you think this is a mistake`,
        })

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
