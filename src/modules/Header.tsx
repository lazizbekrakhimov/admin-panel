import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const Header = async () => {
    const store = await cookies()
    const isLoggedIn = store.get('auth')?.value === '1'

    async function logout() {
        'use server'
        const store = await cookies()
        store.delete('auth')
        redirect('/')
    }

    return (
        <header className='p-5 bg-black flex justify-center gap-5'>
            <Link className='font-bold text-white' href="/">Home</Link>
            <Link className='font-bold text-white' href="/products">Products</Link>
            {isLoggedIn ? (
                <>
                    <Link className='font-bold text-white' href="/admin">Admin</Link>
                    <form action={logout} style={{ display: 'inline' }}>
                        <button className='font-bold text-red-400'>Logout</button>
                    </form>
                </>
            ) : (
                <Link className='font-bold text-yellow-400' href="/login">Login</Link>
            )}
        </header>
    )
}

export default Header
