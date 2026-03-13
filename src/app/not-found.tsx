import Link from 'next/link'
import React from 'react'

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
            <h1 className="text-6xl font-bold">404</h1>
            <p className="text-xl text-gray-500">Page not found</p>
            <Link href="/" className="px-6 py-3 bg-black text-white rounded-lg hover:opacity-80 transition">
                Go Home →
            </Link>
        </div>
    )
}

export default NotFound