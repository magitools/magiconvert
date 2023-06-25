import { STRIPE_CHECKOUT_HOOK_SIGNATURE, STRIPE_KEY, STRIPE_PRICE_ID } from "$env/static/private";
import { fail, type RequestHandler } from "@sveltejs/kit";
import Stripe from "stripe";
import { prisma } from "$lib/server/prisma"

const stripe = new Stripe(STRIPE_KEY, {
    apiVersion: "2022-11-15"
})
export const POST: RequestHandler = async (event) => {
    const data = await event.request.arrayBuffer()

    if (!event.request.headers.has("stripe-signature")) {
        throw fail(500, { message: "invalid header signature" })
    }
    const hook = stripe.webhooks.constructEvent(Buffer.from(data), event.request.headers.get("stripe-signature")!, STRIPE_CHECKOUT_HOOK_SIGNATURE)
    if (!hook || hook.type !== "checkout.session.completed") {
        throw fail(500, { message: "invalid webhook" })
    }
    const hookData = hook.data.object as Stripe.Checkout.Session
    const price = await stripe.prices.retrieve(STRIPE_PRICE_ID)
    await prisma.user.update({ where: { id: parseInt(hookData.client_reference_id!) }, data: { credits: { increment: hookData.amount_subtotal! / price.unit_amount! } } })
    await prisma.transaction.create({ data: { user: { connect: { id: parseInt(hookData.client_reference_id!) } }, amount: hookData.amount_subtotal!, quantity: hookData.amount_subtotal! / price.unit_amount! } })
    return new Response(JSON.stringify({ message: "ok" }))
}