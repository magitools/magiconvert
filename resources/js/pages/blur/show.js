import { decode } from "blurhash"
const canvas = document.getElementById("hash")
const hashValue = canvas.getAttribute("data-hash")
const pixels = decode(hashValue, 128, 128)

const ctx = canvas.getContext("2d")
const imageData = ctx.createImageData(128, 128)
imageData.data.set(pixels)
ctx.putImageData(imageData, 0, 0)
