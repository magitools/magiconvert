import type { RequestHandler } from "./$types";
import {STRIPE_KEY, STRIPE_SUCCESS_URL, STRIPE_CANCEL_URL, STRIPE_PRICE_ID} from "$env/static/private"
import Stripe from "stripe"

const stripe = new Stripe(STRIPE_KEY, {
    apiVersion: "2022-11-15"
})

export const POST: RequestHandler = async (event) => {
    const {id} = JSON.parse(event.cookies.get("auth_cookie")!)
    const data = await event.request.json()

    const session = await stripe.checkout.sessions.create({
        line_items: [{price: STRIPE_PRICE_ID, quantity: data.quantity}],
        mode: "payment",
        success_url: STRIPE_SUCCESS_URL,
        cancel_url: STRIPE_CANCEL_URL,
        client_reference_id: id
    })

    return new Response(JSON.stringify({url: session.url}), {
        headers: {
            "Content-Type":"application/json"
        }
    })
}