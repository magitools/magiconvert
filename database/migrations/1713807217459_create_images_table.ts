import { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('images')
    .addColumn('id', 'integer', (col) => col.primaryKey().notNull())
    .addColumn('original_path', 'varchar')
    .addColumn('converted_path', 'varchar')
    .addColumn('user_id', 'integer', (col) => col.notNull())
    .addColumn('created_at', 'timestamp', (col) => col.notNull())
    .addColumn('updated_at', 'timestamp', (col) => col.notNull())
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('images').execute()
}
