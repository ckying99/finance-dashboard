# Finance Dashboard

A personal finance dashboard for tracking transactions, filtering by category and date range, and visualizing spending with budget comparisons.

## Features

- Add, edit, and delete transactions
- Filter by category and date range
- Spending-by-category bar chart with budget reference lines
- Zustand for UI state, React Query for server state

## Tech Stack

React 19, Vite, Tailwind CSS, shadcn/ui, Recharts, Zustand, React Hook Form + Zod, TanStack React Query

## Getting Started

```bash
npm install
npm run server   # starts json-server on port 3001
npm run dev      # starts Vite dev server
```

The app uses [json-server](https://github.com/typicode/json-server) as a mock REST API backed by `src/data/db.json`.
