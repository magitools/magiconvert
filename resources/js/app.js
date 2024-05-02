import.meta.glob(["../images/**/*"])
import { decode } from "blurhash"
import "unpoly"
import "unpoly/unpoly.css"
import Alpine from 'alpinejs'
window.Alpine = Alpine
Alpine.start()

up.compiler('canvas[data-hash]', (el) => {
  const hashValue = el.getAttribute("data-hash")
  const metadata = el.getAttribute("data-meta")
  const parsedMeta = JSON.parse(metadata)
  const pixels = decode(hashValue, parsedMeta.width, parsedMeta.height)

  el.width = parsedMeta.width
  el.height = parsedMeta.height

  const ctx = el.getContext("2d")
  const imageData = ctx.createImageData(parsedMeta.width, parsedMeta.height)
  imageData.data.set(pixels)
  ctx.putImageData(imageData, 0, 0)
})
