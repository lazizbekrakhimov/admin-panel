import Link from "next/link"
import { notFound } from "next/navigation"
import { CategoryType, ProductType } from "../../../@types"
import { GetAll } from "../../../service"

// 2-usul: SSR
const ProductDetail = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params
    const products: ProductType[] = await GetAll("/products")
    const categories: CategoryType[] = await GetAll("/category")

    const product = products.find(item => item.id === id)
    if (!product) notFound()

    const category = categories.find(item => item.id === product.categoryId)

    return (
        <div className="p-5">
            <Link href="/products">← Orqaga</Link>
            <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
            <p>Narxi: {product.price} so&apos;m</p>
            <p>Kategoriya: {category?.name}</p>
        </div>
    )
}

export default ProductDetail
