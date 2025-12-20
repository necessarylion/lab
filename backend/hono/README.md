To install dependencies:

```sh
bun install
```

To run:

```sh
bun run dev
```

open http://localhost:3000

Migrations (Knex + MySQL):

1. Set DATABASE_URL environment variable (MySQL URL) e.g. mysql://user:pass@host:3306/dbname
2. Run migrations: `bunx --bun knex migrate:latest --knexfile=knexfile.js`
