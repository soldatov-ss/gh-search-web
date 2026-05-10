import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import debounce from 'lodash/debounce'
import { fetchResults, setQuery, setEntityType, setPage } from '../store/searchSlice'
import config from '../config'

const MAX_GITHUB_RESULTS = 1000

export function useSearch() {
  const dispatch = useDispatch()
  const { query, entityType, page, perPage, results, status, error, totalCount } =
    useSelector((state) => state.search)

  const debouncedFetch = useMemo(
    () =>
      debounce((text, type, currentPage, perPageCount) => {
        dispatch(fetchResults({ text, type, page: currentPage, perPage: perPageCount }))
      }, config.search.debounceMs),
    [dispatch]
  )

  useEffect(() => {
    return () => debouncedFetch.cancel()
  }, [debouncedFetch])

  useEffect(() => {
    if (query.length >= config.search.minQueryLength) {
      debouncedFetch(query, entityType, page, perPage)
    }
  }, [query, entityType, page, perPage, debouncedFetch])

  const handleQueryChange = (value) => dispatch(setQuery(value))
  const handleTypeChange = (value) => dispatch(setEntityType(value))
  const handlePageChange = (newPage) => dispatch(setPage(newPage))

  const rawTotalPages = perPage > 0 ? Math.ceil(totalCount / perPage) : 0
  const totalPages = Math.min(rawTotalPages, Math.floor(MAX_GITHUB_RESULTS / perPage))
  const isActive = query.length >= config.search.minQueryLength

  return {
    query,
    entityType,
    page,
    results,
    status,
    error,
    totalCount,
    totalPages,
    isActive,
    handleQueryChange,
    handleTypeChange,
    handlePageChange,
  }
}
