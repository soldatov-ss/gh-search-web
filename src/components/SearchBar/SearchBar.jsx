import './SearchBar.css'

const ENTITY_TYPES = [
  { value: 'repositories', label: 'Repository' },
  { value: 'users', label: 'User' },
  { value: 'issues', label: 'Issue' },
]

export default function SearchBar({ query, entityType, onQueryChange, onTypeChange }) {
  return (
    <div className="search-bar">
      <div className="search-bar__input-wrapper">
        <svg className="search-bar__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <line x1="16.5" y1="16.5" x2="22" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          className="search-bar__input"
          type="search"
          placeholder="Search GitHub…"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          aria-label="Search query"
          autoComplete="off"
          spellCheck="false"
        />
        {query && (
          <button
            className="search-bar__clear"
            onClick={() => onQueryChange('')}
            aria-label="Clear search"
            type="button"
          >
            ✕
          </button>
        )}
      </div>

      <select
        className="search-bar__select"
        value={entityType}
        onChange={(e) => onTypeChange(e.target.value)}
        aria-label="Entity type"
      >
        {ENTITY_TYPES.map((t) => (
          <option key={t.value} value={t.value}>
            {t.label}
          </option>
        ))}
      </select>
    </div>
  )
}
