import vine from '@vinejs/vine'

export const blurCreateValidator = vine.compile(
  vine.object({
    image: vine.file()
  })
)
