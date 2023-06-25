import { fail, type Actions, redirect } from "@sveltejs/kit";
import bcryptjs from "bcryptjs";
import {prisma} from "$lib/server/prisma"

export const actions: Actions = {
    default: async (event) => {
        const data = Object.fromEntries(await event.request.formData()) as {email: string, password: string}
        try {
            const user = await prisma.user.findUnique({where: {email: data.email}})
            if (!user) {
                return fail(500, {message: "invalid credentials"})
            }
            if (!await bcryptjs.compare(data.password, user.password)) {
                return fail(500, {message: "invalid credentials"})
            }
            event.cookies.set("auth_cookie", JSON.stringify({id: user.id}), { path: "/" })
        } catch (error) {
            console.log(error)
            return fail(500, {message: "something went wrong"})
        } finally {
            throw redirect(302, "/app")
        }
    }
}