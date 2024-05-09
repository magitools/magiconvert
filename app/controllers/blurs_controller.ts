import { blurCreateValidator } from '#validators/blur_create'
import { encode } from "blurhash"
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
  async show({ request, auth, view }: HttpContext) {
    const user = auth.getUserOrFail()
    const unpoly = request.header("X-Up-Mode", "root") !== "root"
    const blur = await db.selectFrom("blurs").selectAll().where("user_id", "=", user.id).where("id", "=", request.param("id")).executeTakeFirstOrThrow()
    return view.render("pages/app/blur/show", { blur, unpoly })
  }
  async destroy({ response, request, auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const blur = await db.selectFrom("blurs").selectAll().where("id", "=", request.param("id")).executeTakeFirst()
    if (!blur || blur.user_id != user.id) {
      return response.status(404).redirect().back()
    }
    await db.deleteFrom("blurs").where("id", "=", request.param("id")).execute()
    return response.redirect().back()
  }

  async store({ request, response, auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const payload = await request.validateUsing(blurCreateValidator)
    await payload.image.move(app.tmpPath())
    if (!payload.image.filePath) {
      return "ko";
    }
    const { encodedString, metadata }: { encodedString: string, metadata: Record<string, unknown> } = await new Promise((resolve, reject) => {
      sharp(payload.image.filePath).raw().ensureAlpha().toBuffer((err, buffer, { width, height, format }) => {
        if (err) return reject(err)
        resolve({ encodedString: encode(new Uint8ClampedArray(buffer), width, height, 4, 4), metadata: { width, height, format } })
      })
    })
    await db.insertInto("blurs").values({ user_id: user.id, value: encodedString, metadata: JSON.stringify(metadata), created_at: new Date().getTime(), updated_at: new Date().getTime() }).execute()
    return response.redirect().toRoute("app_blur.index")
  }
}
