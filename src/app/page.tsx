"use client"
import Link from "next/link"

export default function Home() {
    return (
        <div className="mt-25 flex flex-col items-center justify-center gap-6 overflow-hidden">
            <div className="w-full overflow-hidden whitespace-nowrap">
                <div className="inline-flex animate-marquee">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <span key={i} className="text-[150px] font-bold mx-10">Admin Panel</span>
                    ))}
                </div>
            </div>
            <p className="text-[40px] text-gray-500">Manage your products easily</p>
            <Link href="/products" className="mt-5 px-10 py-5 text-2xl bg-black text-white border-2 border-black rounded-lg duration-300 hover:bg-white hover:text-black transition animate-pulse">
                <span>View Products →</span>
            </Link>
        </div>
    )
}