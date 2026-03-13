import Link from "next/link"
import { notFound } from "next/navigation"
import { CategoryType, ProductType } from "../../../@types"
import { GetAll } from "../../../service"

const ProductDetail = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params
    const products: ProductType[] = await GetAll("/products")
    const categories: CategoryType[] = await GetAll("/category")

    const product = products.find(item => item.id === id)
    if (!product) notFound()

    const category = categories.find(item => item.id === product.categoryId)

    return (
        <div className="p-5 max-w-xl mx-auto mt-10">
            <Link href="/products" className="text-gray-500 hover:text-black transition">← Back</Link>
            <div className="border border-gray-400 rounded-xl p-6 mt-4">
                <span className="text-xs text-gray-400">#{product.id}</span>
                <h1 className="text-2xl font-bold mt-1">{product.name}</h1>
                <div className="mt-4 flex flex-col gap-2">
                    <p className="text-gray-600">Price: <span className="font-semibold text-black">{product.price} sum</span></p>
                    <p className="text-gray-600">Category: <span className="font-semibold text-black">{category?.name}</span></p>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail