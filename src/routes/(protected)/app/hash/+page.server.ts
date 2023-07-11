import type { Actions } from "@sveltejs/kit";
import { decode, encode } from "blurhash";
import sharp from "sharp";
import {prisma} from "$lib/server/prisma"

export const actions: Actions = {
    default: async (event) => {
        if (!event.cookies.get("auth_cookie")) {
            throw fail(500, {message: "not enough credits remaining"})
        }
        const user = JSON.parse(event.cookies.get("auth_cookie")!) as {id: number}
        await prisma.user.update({data: {credits: {decrement: 1}}, where: {id: user.id}})
        const data = await event.request.formData()
        const file = data.get("image") as File;
        const blob = data.get("image") as Blob;
        const image = await blob.arrayBuffer()
        const x = data.get("componentX");
        const y = data.get("componentY");
        const {data: pixelArray, info} = await sharp(image).resize({width:700}).raw().ensureAlpha().toBuffer({resolveWithObject:true})
        const hash = encode(new Uint8ClampedArray(pixelArray), info.width, info.height, parseInt(x), parseInt(y));
        const hashArray = decode(hash, info.width, info.height)
        console.log("base64")
        return {
            status: "ok",
            hash,
            preview: {hashArray: [...hashArray], width: info.width, height: info.height}
        }
    }
}