import { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('users')
    .addColumn('id', 'integer', (col) => col.primaryKey().notNull())
    .addColumn('email', 'varchar', (col) => col.notNull())
    .addColumn('github_id', 'varchar', (col) => col.unique())
    .addColumn('google_id', 'varchar', (col) => col.unique())
    .addColumn('created_at', 'timestamp', (col) => col.notNull())
    .addColumn('updated_at', 'timestamp', (col) => col.notNull())
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('users').execute()
}