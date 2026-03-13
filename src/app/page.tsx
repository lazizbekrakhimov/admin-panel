import Link from "next/link"

export default function Home() {
    return (
        <div className="p-5">
            <h1>Bosh sahifa</h1>
            <Link href="/products">Products &rarr;</Link>
        </div>
    )
}
