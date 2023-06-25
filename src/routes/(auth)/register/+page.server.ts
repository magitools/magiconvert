import { fail, type Actions, redirect } from "@sveltejs/kit"
import { prisma } from "$lib/server/prisma"
import bcryptjs from "bcryptjs"

export const actions: Actions = {
    default: async (event) => {
        const data = Object.fromEntries(await event.request.formData()) as { username: string, email: string, password: string }
        try {
            const user = await prisma.user.create({ data: { ...data, password: await bcryptjs.hash(data.password, 12) } })
            event.cookies.set("auth_cookie", JSON.stringify({id: user.id}), { path: "/" })
            throw redirect(302, "/app")
        } catch (error) {
            console.log(error)
            return fail(500, { message: "user could not be created" })
        }

    }
}