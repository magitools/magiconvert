import { Kysely } from 'kysely'
import { LibsqlDialect } from '@libsql/kysely-libsql'
import type { DB } from '../../types/db.js'
import env from '#start/env'

export const db = new Kysely<DB>({
  dialect: new LibsqlDialect({
    url: env.get('DATABASE_URL'),
    authToken: env.get('DATABASE_TOKEN'),
  }),
})
