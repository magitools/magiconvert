import {randomUUID} from "node:crypto"
import {Redis} from "@upstash/redis"
import {UPSTASH_TOKEN, UPSTASH_URL} from "$env/static/private"
import type { RequestHandler } from "@sveltejs/kit"

export const GET: RequestHandler = async({url}) => {
    const email = url.searchParams.get("email")
    const challenge = randomUUID()
    const redis = new Redis({
        url: UPSTASH_URL,
        token: UPSTASH_TOKEN
    })
    await redis.append(`challenge_${email}`, challenge)
    return new Response(JSON.stringify({status:"ok", challenge}), {headers: {
        "Content-Type":"application/json"
    }})
}