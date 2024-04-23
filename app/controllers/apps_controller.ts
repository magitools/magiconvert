import type { HttpContext } from '@adonisjs/core/http'
import { db } from '#services/db'

export default class AppsController {
  async index({ view, auth }: HttpContext) {
    await auth.authenticate()
    return view.render('pages/home')
  }
}
