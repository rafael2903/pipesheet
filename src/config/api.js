import axios from 'axios'

const api = axios.create({
  baseURL:
    process.env.NODE_ENV == 'development'
      ? 'http://localhost:3000/api'
      : 'https://pipesheet.netlify.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
