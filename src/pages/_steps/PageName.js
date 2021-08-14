import { Select, Button } from 'components'
import api from 'config/api'
import { useEffect, useState } from 'react'

export default function PageName({ nextStep }) {
  const [sheetId, setSheetId] = useState('')
  const [sheetTitle, setSheetTitle] = useState('')
  const [sheets, setSheets] = useState([])

  useEffect(() => {
    getPages()
  }, [])

  async function getPages() {
    try {
      const { data } = await api.get(`/spreadsheets/:id`)
      setSheets(
        data.sheets.map((sheet) => ({
          name: sheet.title,
          value: sheet.sheetId,
        }))
      )
      setSheetTitle(data.title)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex w-80 flex-col justify-between items-center">
      <h2 className="text-xl my-2">Escolha qual página da planilha receberá os dados</h2>
      <Select
        options={sheets}
        value={sheetId}
        onChange={setSheetId}
        placeholder="Selecione sua página"
      />
      <Button onClick={nextStep}>Continuar</Button>
    </div>
  )
}
