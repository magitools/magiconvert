import { db } from '#services/db'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async redirect({ params, ally }: HttpContext) {
    const driver = ally.use(params.provider)
    return driver.redirect()
  }
  async callback({ params, ally, auth, response }: HttpContext) {
    const driver = ally.use(params.provider)
    const driverUser = await driver.user()
    let dbUser = await db
      .selectFrom('users')
      .select('id')
      .where('email', '=', driverUser.email)
      .executeTakeFirst()
    if (!dbUser) {
      let values = {
        email: driverUser.email,
        created_at: new Date().getTime(),
        updated_at: new Date().getTime(),
      }
      switch (params.provider) {
        case 'github':
          values['github_id'] = driverUser.id
          values['username'] = driverUser.original.login
          break
      }
      await db.insertInto('users').values(values).execute()
    }

    dbUser = await db
      .selectFrom('users')
      .selectAll()
      .where('email', '=', driverUser.email)
      .executeTakeFirst()
    await auth.use('web').login(dbUser)
    return response.redirect().toPath('/')
  }
}
