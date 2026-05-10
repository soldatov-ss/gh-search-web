import { useState } from 'react'
import SearchBar from '../../components/SearchBar/SearchBar'
import ResultsGrid from '../../components/ResultsGrid/ResultsGrid'
import Pagination from '../../components/Pagination/Pagination'
import EmptyState from '../../components/ui/EmptyState'
import LoadingState from '../../components/ui/LoadingState'
import ErrorState from '../../components/ui/ErrorState'
import NoResults from '../../components/ui/NoResults'
import { useSearch } from '../../hooks/useSearch'
import { clearCache } from '../../api/searchApi'
import './SearchPage.css'

const CACHE_BTN_LABELS = {
  idle: 'Clear cache',
  loading: 'Clearing…',
  success: 'Cache cleared!',
  error: 'Failed — retry?',
}

export default function SearchPage() {
  const {
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
  } = useSearch()

  const [cacheStatus, setCacheStatus] = useState('idle')

  async function handleClearCache() {
    if (cacheStatus === 'loading') return
    setCacheStatus('loading')
    try {
      await clearCache()
      setCacheStatus('success')
    } catch {
      setCacheStatus('error')
    } finally {
      setTimeout(() => setCacheStatus('idle'), 2000)
    }
  }

  const showEmpty = !isActive
  const showLoading = isActive && status === 'loading'
  const showError = isActive && status === 'error'
  const showNoResults = isActive && status === 'success' && results.length === 0
  const showResults = isActive && status === 'success' && results.length > 0

  return (
    <div className={`search-page ${showEmpty ? 'search-page--centered' : ''}`}>
      <header className="search-page__header">
        <div className="search-page__toolbar">
          <h1 className="search-page__title">GitHub Search</h1>
          <button
            className={`search-page__cache-btn search-page__cache-btn--${cacheStatus}`}
            onClick={handleClearCache}
            disabled={cacheStatus === 'loading'}
          >
            {CACHE_BTN_LABELS[cacheStatus]}
          </button>
        </div>
        <SearchBar
          query={query}
          entityType={entityType}
          onQueryChange={handleQueryChange}
          onTypeChange={handleTypeChange}
        />
      </header>

      <main className="search-page__main">
        {showEmpty && <EmptyState />}
        {showLoading && <LoadingState />}
        {showError && <ErrorState message={error} />}
        {showNoResults && <NoResults query={query} />}
        {showResults && (
          <>
            <ResultsGrid items={results} entityType={entityType} totalCount={totalCount} />
            <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
          </>
        )}
      </main>
    </div>
  )
}
