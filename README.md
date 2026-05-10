# GitHub Search

A React SPA for searching GitHub repositories, users, and issues via a Django backend API.

## Prerequisites

- Node.js 18+
- The backend API running (see backend repo for setup)

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env and set VITE_API_BASE_URL to your backend URL
```

## Running

```bash
# Development server with hot reload
npm run dev

# Production build
npm run build

# Preview the production build locally
npm run preview

# Lint
npm run lint
```

## Environment variables

| Variable | Description | Example |
|---|---|---|
| `VITE_API_BASE_URL` | Base URL of the Django backend | `http://localhost:8000` |

Copy `.env.example` to `.env` and fill in the values. The `.env` file is gitignored and must never be committed.

## API endpoints used

| Method | Path | Purpose |
|---|---|---|
| `POST` | `/api/search/` | Search GitHub (repositories / users / issues) |
| `POST` | `/api/clear-cache/` | Clear the backend search cache |
| `POST` | `/api/users/login/` | Auth (wired in backend, login page not yet built) |

## Project structure

```
src/
├── api/            # Axios client + API functions (searchApi.js)
├── components/
│   ├── SearchBar/  # Text input + entity type dropdown
│   ├── ResultsGrid/# 3-col / 2-col responsive grid
│   ├── cards/      # UserCard, RepoCard, IssueCard + shared CSS
│   ├── Pagination/ # Page navigation with ellipsis
│   └── ui/         # EmptyState, LoadingState, ErrorState, NoResults
├── config/         # Reads VITE_ env vars, validated at build time
├── hooks/          # useSearch — debounce + dispatch logic
├── pages/
│   └── SearchPage/ # Main (and currently only) page
└── store/          # Redux store + searchSlice
```

## Extending

**Add a new entity type** (e.g. `"topics"`):
1. Add `{ value: 'topics', label: 'Topic' }` to `ENTITY_TYPES` in `SearchBar.jsx`
2. Create `TopicCard.jsx` + CSS in `src/components/cards/`
3. Add `topics: TopicCard` to `CARD_MAP` in `ResultsGrid.jsx`

**Add a new page** (e.g. login):
1. Create `src/pages/LoginPage/LoginPage.jsx`
2. Add `<Route path="/login" element={<LoginPage />} />` in `App.jsx`
