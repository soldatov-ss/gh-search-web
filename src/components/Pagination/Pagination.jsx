import './Pagination.css'

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  const pages = getPageNumbers(page, totalPages)

  return (
    <nav className="pagination" aria-label="Search result pages">
      <button
        className="pagination__btn"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
      >
        ←
      </button>

      {pages.map((p, i) =>
        p === '…' ? (
          <span key={`ellipsis-${i}`} className="pagination__ellipsis" aria-hidden="true">…</span>
        ) : (
          <button
            key={p}
            className={`pagination__btn${p === page ? ' pagination__btn--active' : ''}`}
            onClick={() => onPageChange(p)}
            aria-label={`Page ${p}`}
            aria-current={p === page ? 'page' : undefined}
          >
            {p}
          </button>
        )
      )}

      <button
        className="pagination__btn"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
      >
        →
      </button>
    </nav>
  )
}

// Returns a page list like [1, 2, '…', 11, 12, 13, '…', 49, 50]
// Always includes first/last two pages and the pages around the current one.
function getPageNumbers(current, total) {
  const alwaysShow = [1, 2, total - 1, total]
  const nearCurrent = [current - 1, current, current + 1]

  const visible = [...new Set([...alwaysShow, ...nearCurrent])]
    .filter((p) => p >= 1 && p <= total)
    .sort((a, b) => a - b)

  // Insert '…' wherever consecutive pages have a gap
  const withGaps = []
  for (const p of visible) {
    const prev = withGaps.at(-1)
    if (typeof prev === 'number' && p - prev > 1) withGaps.push('…')
    withGaps.push(p)
  }
  return withGaps
}
