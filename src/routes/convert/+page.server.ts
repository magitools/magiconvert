import sharp from "sharp"

export const actions = {
    default: async (event) => {
        const data = await event.request.formData()
        const blob = data.get("image") as Blob
        const image = await blob.arrayBuffer()
        const width = parseInt(data.get("width")) === 0 ? data.get("originalWidth") : data.get("width")
        const height = parseInt(data.get("height")) === 0 ? data.get("originalHeight") : data.get("height")
        const format = data.get("format");
        const result = await sharp(image).resize({width: parseInt(width), height: parseInt(height)}).toFormat(format!).toBuffer()
        return {
            success: true,
            image: `data:image/webp;base64,${result.toString("base64")}`
        }
    }
}