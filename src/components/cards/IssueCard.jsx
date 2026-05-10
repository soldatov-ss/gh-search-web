function formatDate(iso) {
  return new Date(iso).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default function IssueCard({ item }) {
  return (
    <a
      className="card issue-card"
      href={item.html_url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View issue #${item.number}: ${item.title}`}
    >
      <div className="issue-card__header">
        <span className={`badge badge--${item.state}`}>{item.state}</span>
        <span className="issue-card__number">#{item.number}</span>
      </div>

      <h3 className="issue-card__title">{item.title}</h3>

      {item.body && (
        <p className="issue-card__body">
          {item.body.slice(0, 120)}{item.body.length > 120 ? '…' : ''}
        </p>
      )}

      {item.user && (
        <div className="issue-card__footer">
          <img
            className="issue-card__avatar"
            src={item.user.avatar_url}
            alt=""
            width="20"
            height="20"
            loading="lazy"
          />
          <span className="issue-card__author">{item.user.login}</span>
          <span className="issue-card__date">{formatDate(item.created_at)}</span>
        </div>
      )}
    </a>
  )
}
