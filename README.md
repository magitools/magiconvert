# Magiconvert

> image conversion service

## Stack

- AdonisJS
- Kysely
- Turso

## Development

- clone the repo
- install dependencies

### If making changes to the database

- Fill in the DATABASE_URL env variable following [this](https://github.com/RobinBlomberg/kysely-codegen?tab=readme-ov-file#generating-type-definitions) documentation
- run `npx kysely-codegen --out-file=types/db.ts`
