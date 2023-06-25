import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import {prisma} from "$lib/server/prisma"

export const load: LayoutServerLoad = async ({ cookies }) => {

    if (!cookies.get("auth_cookie")) {
        throw redirect(302, "/login")
    }
    const {id} = JSON.parse(cookies.get("auth_cookie")!);
    const user = await prisma.user.findUnique({where: {id}})

    if (user) {
        return {
            user
        }
    }
    throw redirect(302, "/login")
}