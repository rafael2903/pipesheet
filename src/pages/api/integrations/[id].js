import nc from 'next-connect'
import Integrations from 'controllers/integrations'

const handler = nc()
  .get(async (req, res) => {
    const { id } = req.query

    try {
      const integration = await Integrations.find(id)
      res.status(200).json({ integration })
    } catch (error) {
      res.status(404).json({ error: error.message })
    }
  })
  .delete(async (req, res) => {
    const { id } = req.query

    try {
      await Integrations.destroy(id)
      res.status(200).json({ message: 'Delete complete' })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  })

export default handler
