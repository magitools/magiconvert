import type { User } from "@prisma/client";
import { fail, type Actions } from "@sveltejs/kit"
import sharp from "sharp"
import {prisma} from "$lib/server/prisma"

export const actions: Actions = {
    default: async (event) => {
        if (!event.cookies.get("auth_cookie")) {
            throw fail(500, {message: "not enough credits remaining"})
        }
        const user = JSON.parse(event.cookies.get("auth_cookie")!) as {id: number}
        await prisma.user.update({data: {credits: {decrement: 1}}, where: {id: user.id}})
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