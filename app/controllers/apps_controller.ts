import type { HttpContext } from '@adonisjs/core/http'
import { db } from '#services/db'

export default class AppsController {
  async index({ view }: HttpContext) {
    return view.render('pages/home')
  }
}
