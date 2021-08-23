import axios from 'axios'

const api = axios.create({
  baseURL:
    (process.env.NODE_ENV == 'development'
      ? 'http://localhost:3000'
      : process.env.VERCEL_URL) + '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
