import { decode } from "blurhash"
const canvas = document.getElementById("hash")
const hashValue = canvas.getAttribute("data-hash")
const metadata = canvas.getAttribute("data-meta")
const parsedMeta = JSON.parse(metadata)
const pixels = decode(hashValue, parsedMeta.width, parsedMeta.height)

canvas.width = parsedMeta.width
canvas.height = parsedMeta.height

const ctx = canvas.getContext("2d")
const imageData = ctx.createImageData(parsedMeta.width, parsedMeta.height)
imageData.data.set(pixels)
ctx.putImageData(imageData, 0, 0)
