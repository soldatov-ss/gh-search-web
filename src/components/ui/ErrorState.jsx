export default function ErrorState({ message }) {
  return (
    <div className="error-state" role="alert">
      <svg className="error-state__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
        <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="16" r="1" fill="currentColor" />
      </svg>
      <p className="error-state__message">{message || 'Something went wrong. Please try again.'}</p>
    </div>
  )
}
