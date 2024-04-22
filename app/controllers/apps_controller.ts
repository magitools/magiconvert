import type { HttpContext } from '@adonisjs/core/http'
import { db } from '#services/db'

export default class AppsController {
  async index({ response }: HttpContext) {
    const users = await db.selectFrom("users").selectAll().execute()
    console.log(users)
    return "ok"
  }
}
