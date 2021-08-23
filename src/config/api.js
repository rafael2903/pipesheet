import axios from 'axios'

const api = axios.create({
  baseURL:
    process.env.NODE_ENV == 'development'
      ? 'https://localhost:3000/api'
      : process.env.NEXT_PUBLIC_VERCEL_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
