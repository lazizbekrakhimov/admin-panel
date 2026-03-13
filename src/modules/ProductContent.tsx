"use client"
import { useEffect, useState } from "react"
import useDebounce from "../hooks/debounce";
import { CategoryType, ProductType } from "../@types";
import Link from "next/link";

const ProductContent = ({ product, category }: { product: ProductType[], category: CategoryType[] }) => {
    const [search, setSearch] = useState("");
    const [categoryId, setCategoryId] = useState("0");
    const debouncedSearch = useDebounce(search, 500);
    const [productList, setProductList] = useState<ProductType[]>(product);

    useEffect(() => {
    const fetchProducts = async () => {
        let url = `http://localhost:4000/products?`
        if (debouncedSearch) url += `name_like=${debouncedSearch}&`
        if (categoryId !== "0") url += `categoryId=${categoryId}`

        const res = await fetch(url)
        const data = await res.json()
        setProductList(data)
    }

    fetchProducts()
}, [debouncedSearch, categoryId])

    return (
        <div className="p-5">
            <div className="flex gap-3 justify-center mb-5">
                <input
                    className="border p-2 rounded"
                    placeholder="Search"
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    className="border p-2 rounded"
                    onChange={(e) => setCategoryId(e.target.value)}
                    value={categoryId}
                >
                    <option value="0">All</option>
                    {category.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
            </div>

            <div className="grid grid-cols-3 gap-5 justify-center">
                {productList.map(product => (
                    <Link href={`products/${product.id}`} key={product.id} className="border p-3 rounded hover:scale-105 transition cursor-pointer">
                        <span>#{product.id}</span>
                        <h2>{product.name} - {product.price}</h2>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default ProductContent;