export default function UserCard({ item }) {
  return (
    <a
      className="card user-card"
      href={item.html_url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View ${item.login}'s GitHub profile`}
    >
      <img
        className="user-card__avatar"
        src={item.avatar_url}
        alt=""
        width="80"
        height="80"
        loading="lazy"
      />
      <div className="user-card__body">
        <p className="user-card__login">{item.login}</p>
        <span className="user-card__type badge">{item.type}</span>
      </div>
      <span className="user-card__cta" aria-hidden="true">View profile →</span>
    </a>
  )
}
