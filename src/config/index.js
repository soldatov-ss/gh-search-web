const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

if (!apiBaseUrl) {
  throw new Error(
    'VITE_API_BASE_URL is not set. Copy .env.example to .env and set the value before building.'
  )
}

const config = {
  apiBaseUrl,
  search: {
    minQueryLength: 3,
    debounceMs: 300,
    defaultPerPage: 9,
  },
}

export default config
