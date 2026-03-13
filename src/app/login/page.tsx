import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default function LoginPage() {
    async function login(fd: FormData) {
        "use server"
        const username = fd.get("username")
        const password = fd.get("password")

        if (username === "admin" && password === "admin123") {
            const store = await cookies()
            store.set("auth", "1", { httpOnly: true, path: "/" })
            redirect("/admin")
        } else {
            redirect("/login?error=1")
        }
    }

    return (
        <div className="p-5 max-w-sm">
            <h1 className="text-xl font-bold mb-4">Login</h1>
            <form action={login} className="flex flex-col gap-3">
                <input name="username" type="text" placeholder="Username" className="border p-2 rounded" />
                <input name="password" type="password" placeholder="Parol" className="border p-2 rounded" />
                <button type="submit" className="bg-black text-white p-2 rounded">Kirish</button>
                <p className="text-sm text-gray-400">admin / admin123</p>
            </form>
        </div>
    )
}
