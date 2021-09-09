import nc from 'next-connect'
import Integrations from 'models/integrations'
import { client } from 'config/gql'
import { getAllCards, getPhases } from 'queries'
import { fetchSpreadsheet } from 'config/spreadsheet'

const handler = nc()
  .get(async (req, res) => {
    const { id } = req.query

    try {
      const { title, pipeId, spreadsheetId, sheetId, webhookId } =
        await Integrations.find(id)
      const integration = {
        id,
        title,
        pipeId,
        spreadsheetId,
        sheetId,
        webhookId,
      }
      res.status(200).json({ integration })
    } catch (error) {
      res.status(404).json({ error: error.message })
    }
  })
  .post(async (req, res) => {   // rota que o pipefy vai fazer o request
    const { id } = req.query

    try {
      const { pipeId, spreadsheetId, sheetId } = await Integrations.find(id)
      const { pipe } = await client.request(getPhases, { pipeId })

      const phases = pipe.phases.map((phase) => phase.name)
      const fields = pipe.phases
        .map((phase) => phase.fields)
        .reduce((accumulator, currentItem) => [...accumulator, ...currentItem])
        .map((field) => field.label)

      const { allCards } = await client.request(getAllCards, { pipeId })
      const cards = allCards.edges.map(({ node }) => ({
        ['Título']: node.title,
        id: node.id,
        done: node.done,
        current_phase: node.current_phase.name,
        labels: node.labels.map((label) => label.name).join(', '),
        due_date: node.due_date,
        createdAt: node.createdAt,
        createdBy: node.createdBy.name,
        updated_at: node.updated_at,
        assignees: node.assignees.map((assignee) => assignee.name).join(', '),
        ...node.fields.reduce(
          (accumulator, currentItem) => ({...accumulator, [currentItem.name]: currentItem.value,}),{}
        ),
        ...node.phases_history.reduce(
          (accumulator, currentItem) => ({
            ...accumulator,
            [`Tempo total na fase ${currentItem.phase.name} (dias)`]:
                currentItem.firstTimeIn,
            [`Primeira vez que entrou na fase ${currentItem.phase.name}`]:
                currentItem.duration,
            [`Última vez que saiu da fase ${currentItem.phase.name}`]:
                currentItem.lastTimeOut,
          }),
          {}
        ),
      }))

      const spreadsheet = await fetchSpreadsheet(spreadsheetId)
      const sheet = spreadsheet.sheetsById[sheetId]
 
      await sheet.clear()
      await sheet.setHeaderRow(['id', 'Título'])
      await sheet.addRows(cards);

      res.status(200).json({ cards })
    } catch (error) {
      res.status(500).json({ error: error.message })
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
