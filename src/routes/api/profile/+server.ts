import { fail, type RequestHandler } from "@sveltejs/kit";
import {prisma} from "$lib/server/prisma"
export const GET: RequestHandler = async ({cookies}) => {
    if (cookies.get("auth_cookie")) {
        const {id} = JSON.parse(cookies.get("auth_cookie")!)
        const user = await prisma.user.findUnique({where: {id}, select: {email:true, username:true, credits:true, passkeys:true}})
        if (!user) {
            throw fail(500, {message: "invalid credentials"})
        }
        return new Response(JSON.stringify(user), {headers: {
            "Content-Type":"application/json"
        }})
    } else {
        throw fail(500, {message: "invalid credentials"})
    }
}