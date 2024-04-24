import { db } from '#services/db'
import type { HttpContext } from '@adonisjs/core/http'

export default class ImagesController {
  async index({ view, auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const images = await db.selectFrom("images").selectAll().where("user_id", "=", user.id).execute()
    return view.render("pages/images/index", { images })
  }

  async create() { }

  async store() { }

  async destroy() { }
}
