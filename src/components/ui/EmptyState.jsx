export default function EmptyState() {
  return (
    <div className="empty-state">
      <svg className="empty-state__icon" viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <circle cx="28" cy="28" r="18" stroke="currentColor" strokeWidth="4" />
        <line x1="41" y1="41" x2="58" y2="58" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      </svg>
      <h2 className="empty-state__title">Search GitHub</h2>
      <p className="empty-state__subtitle">
        Type at least 3 characters to search repositories, users, or issues.
      </p>
    </div>
  )
}
