import nc from 'next-connect'
import Integrations from 'models/integrations'
import { client } from 'config/gql'
import { getAllCards } from 'queries'
import { fetchSpreadsheet } from 'config/spreadsheet'

function getFormatedCards(cards) {
  const dateFieldsTypes = ['date', 'datetime', 'due_date']

  return cards.edges.map(({ node }) => ({
    ['Título']: node.title,
    ['id']: node.id,
    ['Finalizado']: node.done,
    ['Fase atual']: node.current_phase.name,
    ['Etiquetas']: node.labels.map((label) => label.name).join(','),
    ['Data de vencimento do card']: node.due_date,
    ['Criado em']: node.createdAt,
    ['Criador']: node.createdBy.name,
    ['Atualizado em']: node.updated_at,
    ['Responsáveis']: node.assignees.map((assignee) => assignee.name).join(','),
    ...node.fields.reduce(
      (accumulator, currentItem) => ({
        ...accumulator,
        [currentItem.name]: dateFieldsTypes.includes(currentItem.type)
          ? currentItem.value
          : currentItem.report_value,
      }),
      {}
    ),
    ...node.phases_history.reduce(
      (accumulator, currentItem) => ({
        ...accumulator,
        [`Tempo total na fase ${currentItem.phase.name} (dias)`]:
          currentItem.duration,
        [`Primeira vez que entrou na fase ${currentItem.phase.name}`]:
          currentItem.firstTimeIn,
        [`Última vez que saiu da fase ${currentItem.phase.name}`]:
          currentItem.lastTimeOut,
      }),
      {}
    ),
  }))
}

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
  .post(async (req, res) => {
    // rota que o pipefy vai fazer o request
    const { id } = req.query

    try {
      const { pipeId, spreadsheetId, sheetId } = await Integrations.find(id)
      const { allCards } = await client.request(getAllCards, { pipeId })

      const cards = getFormatedCards(allCards)
      const headers = Object.keys(cards[0])

      const spreadsheet = await fetchSpreadsheet(spreadsheetId)
      const sheet = spreadsheet.sheetsById[sheetId]

      if (sheet.columnCount < headers.length)
        await sheet.resize({
          rowCount: sheet.rowCount,
          columnCount: headers.length,
        })

      if (sheet.rowCount < cards.length)
        await sheet.resize({
          rowCount: cards.length + 500,
          columnCount: sheet.columnCount,
        })

      await sheet.clear()
      await sheet.setHeaderRow(headers)
      await sheet.addRows(cards)

      res.status(200).json({ cards, headers })
    } catch (error) {
      console.error(error)
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
