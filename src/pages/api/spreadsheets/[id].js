import nc from 'next-connect'
import fetchSpreadsheet from 'config/spreadsheet'

const handler = nc().get(async (req, res) => {
  const { id } = req.query

  try {
    const spreadsheet = await fetchSpreadsheet(id)
    const { title } = spreadsheet
    const sheets = spreadsheet.sheetsByIndex.map((sheet) => ({
      title: sheet.title,
      sheetId: sheet.sheetId,
    }))

    res.status(200).json({ title, sheets })
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
})

export default handler
