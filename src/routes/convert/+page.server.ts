import sharp from "sharp"

export const actions = {
    default: async (event) => {
        const data = await event.request.formData()
        const blob = data.get("image") as Blob
        const image = await blob.arrayBuffer()


        const width = data.get("width");
        const oWidth = data.get("originalWidth")
        const height = data.get("height")
        const oHeight = data.get("originalHeight")
        const format = data.get("format");
        const result = await sharp(image).resize({ width: (width && width > 0) ? parseInt(width) : parseInt(oWidth), height: (height && height > 0) ? parseInt(height) : parseInt(oHeight) }).toFormat(format!).toBuffer()
        return {
            success: true,
            image: `data:image/webp;base64,${result.toString("base64")}`,
            format
        }
    }
}