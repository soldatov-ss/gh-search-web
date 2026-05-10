function formatNumber(n) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return String(n)
}

export default function RepoCard({ item }) {
  return (
    <a
      className="card repo-card"
      href={item.html_url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View repository ${item.full_name}`}
    >
      {item.owner && (
        <div className="repo-card__header">
          <img
            className="repo-card__avatar"
            src={item.owner.avatar_url}
            alt=""
            width="36"
            height="36"
            loading="lazy"
          />
          <span className="repo-card__owner">{item.owner.login}</span>
        </div>
      )}

      <h3 className="repo-card__name">{item.name}</h3>

      {item.description && (
        <p className="repo-card__description">{item.description}</p>
      )}

      <div className="repo-card__stats">
        {item.language && (
          <span className="repo-card__stat">
            <span className="repo-card__dot" aria-hidden="true" />
            {item.language}
          </span>
        )}
        <span className="repo-card__stat" title="Stars">
          ★ {formatNumber(item.stargazers_count)}
        </span>
        <span className="repo-card__stat" title="Forks">
          ⑂ {formatNumber(item.forks_count)}
        </span>
      </div>
    </a>
  )
}
