import { blurCreateValidator } from '#validators/blur_create'
import { decode, encode } from "blurhash"
import type { HttpContext } from '@adonisjs/core/http'
import sharp from "sharp"
import { db } from '#services/db'
import app from '@adonisjs/core/services/app'

export default class BlursController {
  async index({ auth, view }: HttpContext) {
    const user = auth.getUserOrFail()
    const blurs = await db.selectFrom("blurs").selectAll().where("user_id", "=", user.id).execute()

    return view.render("pages/app/blur/index", { blurs })
  }

  async create({ view }: HttpContext) {
    return view.render("pages/app/blur/create")
  }

  async store({ request, response, auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const payload = await request.validateUsing(blurCreateValidator)
    await payload.image.move(app.tmpPath())
    if (!payload.image.filePath) {
      return "ko";
    }
    const encodedString: string = await new Promise((resolve, reject) => {
      sharp(payload.image.filePath).raw().ensureAlpha().toBuffer((err, buffer, { width, height }) => {
        if (err) return reject(err)
        resolve(encode(new Uint8ClampedArray(buffer), width, height, 4, 4))
      })
    })
    const b64 = Buffer.from(decode(encodedString, 200, 200)).toString("base64")
    await db.insertInto("blurs").values({ user_id: user.id, value: encodedString, b_64: b64, created_at: new Date().getTime(), updated_at: new Date().getTime() }).execute()
    return response.redirect().toRoute("app_blur.index")
  }
}
