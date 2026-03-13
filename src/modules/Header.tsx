import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import NavLinks from '../components/NavLinks'

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
        <header className='p-5 bg-black flex justify-center gap-7'>
            <NavLinks isLoggedIn={isLoggedIn} logout={logout} />
        </header>
    )
}

export default Header