import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default function LoginPage() {
    async function login(fd: FormData) {
        "use server"
        const username = fd.get("username")
        const password = fd.get("password")

        if (username === "lazizbek" && password === "lazizbek123") {
            const store = await cookies()
            store.set("auth", "1", { httpOnly: true, path: "/" })
            redirect("/admin")
        } else {
            redirect("/login?error=1")
        }
    }

    return (
        <div className="mt-40 flex items-center justify-center">
            <div className=" p-8 w-full max-w-sm flex flex-col gap-4">
                <h1 className="text-3xl font-bold text-center mb-2">Login</h1>
                <form action={login} className="flex flex-col gap-3">
                    <input name="username" type="text" placeholder="Username" className="border border-gray-300 p-2 rounded-lg outline-none focus:border-black transition" />
                    <input name="password" type="password" placeholder="Password" className="border border-gray-300 p-2 rounded-lg outline-none focus:border-black transition" />
                    <button type="submit" className="mt-4 px-5 py-2 bg-black text-white text-lg border-2 border-black rounded-lg duration-300 hover:bg-white hover:text-black transition">Login</button>
                </form>
            </div>
        </div>
    )
}
