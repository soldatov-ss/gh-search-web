import axios from 'axios'
import config from '../config'

const client = axios.create({
  baseURL: config.apiBaseUrl,
  headers: { 'Content-Type': 'application/json' },
})

export async function searchGitHub({ text, type, page = 1, perPage = config.search.defaultPerPage, signal }) {
  const { data } = await client.post(
    '/api/search/',
    { text, type, page, per_page: perPage },
    { signal }
  )
  return data
}

export async function clearCache() {
  const { data } = await client.post('/api/clear-cache/')
  return data
}

