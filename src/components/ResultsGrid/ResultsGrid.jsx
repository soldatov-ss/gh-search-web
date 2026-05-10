import UserCard from '../cards/UserCard'
import RepoCard from '../cards/RepoCard'
import IssueCard from '../cards/IssueCard'
import './ResultsGrid.css'

const CARD_MAP = {
  users: UserCard,
  repositories: RepoCard,
  issues: IssueCard,
}

export default function ResultsGrid({ items, entityType, totalCount }) {
  const Card = CARD_MAP[entityType]
  if (!Card) return null

  return (
    <section className="results-grid" aria-label="Search results">
      <p className="results-grid__count" aria-live="polite" aria-atomic="true">
        {totalCount.toLocaleString()} results
      </p>
      <ul className="results-grid__list" role="list">
        {items.map((item) => (
          <li key={item.id}>
            <Card item={item} />
          </li>
        ))}
      </ul>
    </section>
  )
}
