export default function NoResults({ query }) {
  return (
    <div className="no-results">
      <p className="no-results__text">
        No results found for <strong>"{query}"</strong>.
      </p>
      <p className="no-results__hint">Try a different search term or entity type.</p>
    </div>
  )
}
