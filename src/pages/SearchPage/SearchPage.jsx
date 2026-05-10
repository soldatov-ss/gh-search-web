import SearchBar from '../../components/SearchBar/SearchBar'
import ResultsGrid from '../../components/ResultsGrid/ResultsGrid'
import Pagination from '../../components/Pagination/Pagination'
import EmptyState from '../../components/ui/EmptyState'
import LoadingState from '../../components/ui/LoadingState'
import ErrorState from '../../components/ui/ErrorState'
import NoResults from '../../components/ui/NoResults'
import { useSearch } from '../../hooks/useSearch'
import './SearchPage.css'

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

  const showEmpty = !isActive
  const showLoading = isActive && status === 'loading'
  const showError = isActive && status === 'error'
  const showNoResults = isActive && status === 'success' && results.length === 0
  const showResults = isActive && status === 'success' && results.length > 0

  return (
    <div className={`search-page ${showEmpty ? 'search-page--centered' : ''}`}>
      <header className="search-page__header">
        <h1 className="search-page__title">GitHub Search</h1>
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
