# Spin & Discover

A fun mini-app for indecisive moments! Pick a category (Activity, Dad Joke, Quote, or Dog Pic) and spin for a random suggestion. Save favorites with one click.

**APIs used** (from [PublicAPI.dev](https://publicapi.dev/)):

- [Bored API](https://www.boredapi.com/) – Random activity suggestions
- [icanhazdadjoke](https://icanhazdadjoke.com/) – Dad jokes
- [Quotable](https://api.quotable.io/) – Random quotes
- [Dog CEO](https://dog.ceo/dog-api/) – Random dog images

## Tech Stack

- **Turborepo** – Monorepo tooling
- **Next.js 14** – React framework
- **React 18** – UI library
- **Tailwind CSS** – Styling
- **TypeScript** – Type safety
- **Zustand** – Favorites state (with persistence)
- **React Query (TanStack Query)** – Data fetching & caching
- **shadcn/ui** – UI components (Button, Card, Badge, Tabs)
- **Prettier** – Code formatting
- **ESLint** – Linting

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command   | Description              |
| --------- | ------------------------ |
| `npm run dev`  | Start dev server         |
| `npm run build`| Build for production     |
| `npm run lint` | Run ESLint               |
| `npm run format`| Run Prettier (from root) |

## Project Structure

```
React_project/
├── apps/
│   └── web/              # Next.js app
│       ├── app/          # App router pages & layout
│       ├── components/   # React components
│       ├── hooks/        # Custom hooks (React Query)
│       ├── lib/          # API client, utils, types
│       └── store/        # Zustand store
├── turbo.json
└── package.json
```
