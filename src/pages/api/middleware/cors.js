import nc from 'next-connect'
import cors from 'cors'

export default function base() {
  return nc().use(cors())
}
