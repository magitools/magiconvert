import { STRIPE_KEY, STRIPE_PRODUCT_ID } from "$env/static/private";
import type { ServerLoad } from "@sveltejs/kit";
import Stripe from "stripe";
const stripe = new Stripe(STRIPE_KEY, {
    apiVersion: "2022-11-15"
})
export const load: ServerLoad = async () => {
    const product = await stripe.products.retrieve(STRIPE_PRODUCT_ID);
    const price = await stripe.prices.retrieve(product.default_price?.toString()!)
    return { product, price }
}