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
2. Run migrations: `bunx --bun knex migrate:latest --knexfile=knexfile.ts`

Create a new TypeScript migration:

`bunx --bun knex migrate:make <name> --knexfile=knexfile.ts --extension=ts`

Notes:

- Knex CLI can work with a `knexfile.ts` in this project, but if you have pre-existing migration rows in your DB that point to `.js` files the migrator may complain about missing `.js` files. I added a small compatibility shim `migrations/20251220000000_init.js` that delegates to the TypeScript migration to avoid that error.
- When creating new migrations, use `--extension=ts` to generate `.ts` files.
