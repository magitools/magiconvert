import { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('blurs')
    .addColumn('id', 'integer', (col) => col.primaryKey().notNull())
    .addColumn('user_id', 'integer', (col) => col.notNull())
    .addColumn('value', 'varchar', (col) => col.notNull())
    .addColumn('created_at', 'timestamp', (col) => col.notNull())
    .addColumn('updated_at', 'timestamp', (col) => col.notNull())
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('blurs').execute()
}
