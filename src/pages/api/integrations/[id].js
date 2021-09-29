import nc from 'next-connect'
import Integrations from 'models/integrations'
import { getAllCards, getPhases } from 'queries'
import { client } from 'config/gql'
import { fetchSpreadsheet } from 'config/spreadsheet'

function getFormattedCards(cards, dateFieldsLabels) {
  const SECONDS_IN_A_DAY = 86400

  return cards.map(({ node }) => ({
    ['Id']: node.id,
    ['Título']: node.title,
    ['Fase atual']: node.current_phase.name,
    ['Etiquetas']: node.labels.map((label) => label.name).join(','),
    ['Responsáveis']: node.assignees.map((assignee) => assignee.name).join(','),
    ['Criado em']: new Date(node.createdAt).toLocaleString('pt-BR'),
    ['Atualizado em']: new Date(node.updated_at).toLocaleString('pt-BR'),
    ['Data de vencimento do card']: new Date(node.due_date).toLocaleString(
      'pt-BR'
    ),
    ...node.fields.reduce(
      (accumulator, currentItem) => ({
        ...accumulator,
        [currentItem.name]: dateFieldsLabels.includes(currentItem.name)
          ? currentItem.value
          : currentItem.report_value,
      }),
      {}
    ),
    ...node.phases_history.reduce(
      (accumulator, currentItem) => ({
        ...accumulator,
        [`Tempo total na fase ${currentItem.phase.name} (dias)`]: (
          currentItem.duration / SECONDS_IN_A_DAY
        )
          .toFixed(6)
          .replace('.', ','),
        [`Primeira vez que entrou na fase ${currentItem.phase.name}`]: new Date(
          currentItem.firstTimeIn
        ).toLocaleString('pt-BR'),
        [`Última vez que saiu da fase ${currentItem.phase.name}`]: new Date(
          currentItem.lastTimeOut
        ).toLocaleString('pt-BR'),
      }),
      {}
    ),
  }))
}

function getPipePhasesAndFields(pipe) {
  const phases = pipe.phases
  const phasesFields = phases
    .map((phase) => phase.fields)
    .reduce((accumulator, currentItem) => [...accumulator, ...currentItem])
  const fields = [...pipe.start_form_fields, ...phasesFields]
  return { phases, fields }
}

function getDateFieldsLabels(fields) {
  return fields
    .filter(
      (field) =>
        field.type === 'date' ||
        field.type === 'datetime' ||
        field.type === 'due_date'
    )
    .map((field) => field.label)
}

function getHeaders(phases, fields) {
  const fieldsLabels = fields.map((field) => field.label)

  const phasesHeaders = phases
    .map((phase) => [
      `Tempo total na fase ${phase.name} (dias)`,
      `Primeira vez que entrou na fase ${phase.name}`,
      `Última vez que saiu da fase ${phase.name}`,
    ])
    .reduce((accumulator, currentItem) => [...accumulator, ...currentItem])

  const headers = [
    'Id',
    'Título',
    'Fase atual',
    'Etiquetas',
    'Responsáveis',
    'Criado em',
    'Atualizado em',
    'Data de vencimento do card',
    ...fieldsLabels,
    ...phasesHeaders,
  ]

  return headers
}

async function fetchAllCards(pipeId) {
  let allCards = []
  let hasNextPage, endCursor

  do {
    const variables = endCursor ? { pipeId, after: endCursor } : { pipeId }
    const response = await client.request(getAllCards, variables)
    const { pageInfo, edges } = response.allCards
    hasNextPage = pageInfo.hasNextPage
    endCursor = pageInfo.endCursor
    allCards.push(...edges)
  } while (hasNextPage)

  return allCards
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

      const allCards = await fetchAllCards(pipeId)
      const { pipe } = await client.request(getPhases, { pipeId })

      const { phases, fields } = getPipePhasesAndFields(pipe)
      const dateFieldsLabels = getDateFieldsLabels(fields)
      const headers = getHeaders(phases, fields)

      const cards = getFormattedCards(allCards, dateFieldsLabels)

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
