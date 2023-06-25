import type { ServerLoad } from "@sveltejs/kit";
import {prisma} from "$lib/server/prisma"

export const load: ServerLoad = async ({cookies}) => {
    const {id} = JSON.parse(cookies.get("auth_cookie")!)
    const user = await prisma.user.findUnique({where:{id}, include: {transactions: true}})
    return {
        user
    }
}