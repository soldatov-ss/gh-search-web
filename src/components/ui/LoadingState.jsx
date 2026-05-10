export default function LoadingState() {
  return (
    <div className="loading-state" role="status" aria-live="polite">
      <div className="loading-state__spinner" aria-hidden="true" />
      <p className="loading-state__text">Searching…</p>
    </div>
  )
}
