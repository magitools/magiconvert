import { redirect } from "@sveltejs/kit"
import sharp from "sharp"

export const actions = {
    convertImage: async (event) => {
        const data = await event.request.formData()
        console.log(data.get("image"))
        const blob = data.get("image") as Blob
        const image = await blob.arrayBuffer()
        console.log(image)
        const width = parseInt(data.get("width")) === 0 ? data.get("originalWidth") : data.get("width")
        const height = parseInt(data.get("height")) === 0 ? data.get("originalHeight") : data.get("height")
        const format = data.get("format");
        const result = await sharp(image).resize({width: parseInt(width), height: parseInt(height)}).toFormat(format!).toBuffer()
        return {
            success: true,
            image: `data:image/webp;base64,${result.toString("base64")}`
        }
    },
    setTheme: async(event) => {
        const theme = event.url.searchParams.get("theme")
        const redirectTo = event.url.searchParams.get("redirectTo")

        if (theme) {
            event.cookies.set("theme", theme, {path:"/"})
        }
        if (redirectTo) {
            throw redirect(303, redirectTo)
        }
    }
}