import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async({cookies, fetch}) => {

    if (cookies.get("auth_cookie")) {
        const user = await fetch("/api/profile");
        if (user.ok) {
            return {
                user: await user.json()
            }
        }
    }
}