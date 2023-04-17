import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async({event, resolve}) => {
    let theme: string | null = null;

    const newTheme = event.url.searchParams.get("theme");
    const cookieTheme = event.cookies.get("theme")

    if (newTheme) {
        theme = newTheme
    } else if (cookieTheme) {
        theme = cookieTheme
    }
    
    if (theme) {
        return resolve(event, {transformPageChunk: ({html}) => {
            return html.replace('data-theme=""', `data-theme="${theme}"`)
        }})
    }
    
    return await resolve(event)
}