import axios from 'axios'

const api = axios.create({
  baseURL:
    (process.env.NEXT_PUBLIC_VERCEL_URL || 'https://localhost:3000') + '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
