"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
]

const NavLinks = ({ isLoggedIn, logout }: { isLoggedIn: boolean, logout: () => Promise<void> }) => {
    const pathname = usePathname()

    const linkClass = (href: string) =>
        `font-bold transition ${pathname === href ? "text-white" : "text-gray-400 hover:text-white"}`

    return (
        <nav className='flex items-center justify-between px-14 w-full'>
            <span className='font-bold text-white text-lg'>Logo</span>
            <div className='flex items-center gap-7'>
                {navLinks.map(({ href, label }) => (
                    <Link key={href} href={href} className={linkClass(href)}>{label}</Link>
                ))}
                {isLoggedIn && (
                    <Link className={linkClass('/admin')} href="/admin">Admin</Link>
                )}
            </div>
            <div>
                {isLoggedIn ? (
                    <form action={logout} style={{ display: 'inline' }}>
                        <button className='font-bold px-4 py-2 border-2 border-red-500 text-red-500 rounded-lg duration-300 hover:bg-red-500 hover:text-white transition cursor-pointer'>Logout</button>
                    </form>
                ) : (
                    <Link className='font-bold px-5 py-2 border-2 bg-white text-black border-white rounded-lg duration-300 hover:bg-black hover:text-white transition' href="/login">Login</Link>
                )}
            </div>
        </nav>
    )
}

export default NavLinks