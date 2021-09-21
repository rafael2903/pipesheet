import nc from 'next-connect'
import Integrations from 'models/integrations'
import { client } from 'config/gql'
import { getAllCards, getPhases } from 'queries'
import { fetchSpreadsheet } from 'config/spreadsheet'

function getFormatedCards(cards) {
  const dateFieldsTypes = ['date', 'datetime', 'due_date']

  return cards.map(({ node }) => ({
    ['Título']: node.title,
    ['id']: node.id,
    ['Fase atual']: node.current_phase.name,
    ['Etiquetas']: node.labels.map((label) => label.name).join(','),
    ['Data de vencimento do card']: node.due_date,
    ['Criado em']: node.createdAt,
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

async function getHeadersInfo(pipe) {
  const phasesFields = pipe.phases
    .map((phase) => phase.fields)
    .reduce((accumulator, currentItem) => [...accumulator, ...currentItem])
  const fields = [...pipe.start_form_fields, ...phasesFields]

  const fieldsLabels = fields.map((field) => field.label)

  const phasesHeaders = pipe.phases
    .map((phase) => [
      `Tempo total na fase ${phase.name} (dias)`,
      `Primeira vez que entrou na fase ${phase.name}`,
      `Última vez que saiu da fase ${phase.name}`,
    ])
    .reduce((accumulator, currentItem) => [...accumulator, ...currentItem])

  const headers = [
    'Título',
    'id',
    'Fase atual',
    'Etiquetas',
    'Data de vencimento do card',
    'Criado em',
    'Atualizado em',
    'Responsáveis',
    ...fieldsLabels,
    ...phasesHeaders,
  ]

  return headers
}

async function fetchAllCards(pipeId) {
  let cards = []
  let hasNextPage = true
  let endCursor
  let pipe

  while (hasNextPage) {
    const variables = endCursor ? { pipeId, after: endCursor } : { pipeId }
    const response = await client.request(getAllCards, variables)
    hasNextPage = response.allCards.pageInfo.hasNextPage
    endCursor = response.allCards.pageInfo.endCursor
    cards = [...cards, ...response.allCards.edges]
    pipe ||= response.pipe
  }

  return { allCards: cards, pipe }
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

      const { allCards, pipe } = await fetchAllCards(pipeId)
      const cards = getFormatedCards(allCards)
      const headers = await getHeadersInfo(pipe)

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

      res.status(200).send()
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
