# Expense Tracker API

A simple RESTful API for tracking expenses, categories, and user authentication built with Deno and Drizzle ORM. This project provides endpoints for managing users, categories, and expenses, and demonstrates a lightweight, opinionated structure for a backend API.

Project reference: https://roadmap.sh/projects/expense-tracker-api

## Features

- User authentication (JWT)
- CRUD for expense categories
- CRUD for expenses (amount, date, category, notes)
- Validation middleware and simple request validation
- Database migrations using Drizzle

## Tech Stack

- Runtime: `Deno`
- ORM / Migrations: `Drizzle`
- Database: (configured via Drizzle migrations in `drizzle/`)
- Authentication: JWT (`src/utils/jwt.ts`)

## Repository Structure (important files)

- `main.ts` - app entry
- `src/app.ts` - Express-like app setup and middleware
- `src/routes/` - API route handlers (`auth.ts`, `category.ts`, `expense.ts`)
- `src/db/` - database setup and `schema.ts`
- `drizzle/` - SQL migrations
- `env.ts` - environment configuration
- `src/utils/` - helpers: `jwt.ts`, `validator.ts`

## Getting Started

Prerequisites

- Install Deno (https://deno.land)

Environment

1. Copy or configure environment variables as required by `env.ts`.
2. Ensure your database is running and credentials in `env.ts` (or environment variables) are correct.

Run the app

From the project root, run the app using Deno (adjust permissions as needed):

```
deno run --allow-net --allow-env --allow-read main.ts
```

Note: If a `deno.json` task is defined for starting the app (check `deno.json`), you can use:

```
deno task start
```

Database migrations

Migrations live in the `drizzle/` directory. Apply them using your preferred Drizzle/DB tooling or a migration runner configured in the project.

## API Overview

The API exposes routes under `/` (see `src/routes`):

- `POST /auth/register` - register user
- `POST /auth/login` - login and receive JWT
- `GET /categories` - list categories (protected)
- `POST /categories` - create category (protected)
- `GET /expenses` - list expenses (protected)
- `POST /expenses` - create expense (protected)

Refer to the route files in `src/routes/` for exact request/response shapes and required fields.

Example: Create expense (JSON)

```
POST /expenses
Authorization: Bearer <token>

{
  "amount": 12.50,
  "date": "2025-11-19",
  "categoryId": 1,
  "notes": "Lunch"
}
```

## Development

- Run the server with live reload (if you prefer): use a watcher or `deno task` if configured.
- Lint and format with Deno built-ins: `deno fmt`, `deno lint`.

## Contributing

Contributions are welcome. Open an issue or submit a PR with clear intent and tests where applicable.

## License

This project does not include a license file. Add a `LICENSE` to specify terms.

---

Project reference: https://roadmap.sh/projects/expense-tracker-api
