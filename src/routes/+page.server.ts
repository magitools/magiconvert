import { redirect } from "@sveltejs/kit"

export const actions = {
    setTheme: async(event) => {
        const theme = event.url.searchParams.get("theme")
        const redirectTo = event.url.searchParams.get("redirectTo")

        if (theme) {
            event.cookies.set("theme", theme, {path:"/"})
        }
        if (redirectTo) {
            throw redirect(303, redirectTo)
        }
    }
}