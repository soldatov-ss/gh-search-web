import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { searchGitHub } from '../api/searchApi'
import config from '../config'

export const fetchResults = createAsyncThunk(
  'search/fetchResults',
  async ({ text, type, page, perPage }, { rejectWithValue, signal }) => {
    try {
      return await searchGitHub({ text, type, page, perPage, signal })
    } catch (err) {
      if (err.name === 'CanceledError' || err.name === 'AbortError') throw err
      return rejectWithValue(err.response?.data?.detail || err.message || 'Search failed')
    }
  }
)

function resetResults(state) {
  state.results = []
  state.status = 'idle'
  state.error = null
  state.page = 1
  state.totalCount = 0
}

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: '',
    entityType: 'repositories',
    results: [],
    status: 'idle',
    error: null,
    page: 1,
    perPage: config.search.defaultPerPage,
    totalCount: 0,
  },
  reducers: {
    setQuery(state, action) {
      state.query = action.payload
      if (action.payload.length < config.search.minQueryLength) {
        resetResults(state)
      }
    },
    setEntityType(state, action) {
      state.entityType = action.payload
      resetResults(state)
    },
    setPage(state, action) {
      state.page = action.payload
    },
    clearSearch(state) {
      state.query = ''
      resetResults(state)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResults.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchResults.fulfilled, (state, action) => {
        state.status = 'success'
        state.results = action.payload.items
        state.totalCount = action.payload.total_count
        state.page = action.payload.page
        state.perPage = action.payload.per_page
      })
      .addCase(fetchResults.rejected, (state, action) => {
        if (action.error.name === 'AbortError' || action.error.name === 'CanceledError') return
        state.status = 'error'
        state.error = action.payload
      })
  },
})

export const { setQuery, setEntityType, setPage, clearSearch } = searchSlice.actions
export default searchSlice.reducer
