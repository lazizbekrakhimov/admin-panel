"use client"
import { CategoryType, ProductType } from "../@types";
import debounce from "../hooks/debounce";
import { useEffect, useState } from "react"
import Link from "next/link";

const ProductContent = ({ product, category }: { product: ProductType[], category: CategoryType[] }) => {
    const [search, setSearch] = useState("");
    const searchValue = debounce(search, 1000);
    const [categoryId, setCategoryId] = useState("");
    const [productList, setProductList] = useState<ProductType[]>(product);

    useEffect(() => {
        if (searchValue || categoryId) {
            fetch(`http://localhost:4000/products?name${searchValue}&categoryId=${categoryId}`).then(res => res.json()).then(data => {
                setProductList(data)
            })
        }
        else {
            setProductList(product)
        }
    }, [searchValue, categoryId])

    return (
        <div className="mt-5 p-5 max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-10">
                <h1 className="text-2xl font-bold">Products</h1>
                <div className="flex gap-4">
                    <input onChange={(e) => setSearch(e.target.value)} className="border border-gray-300 p-2 rounded-lg w-56 outline-none focus:border-gray-500 transition text-sm" placeholder="Search products..." />
                    <select onChange={(e) => setCategoryId(e.target.value === "0" ? "" : e.target.value)} value={categoryId} className="border border-gray-300 p-2 rounded-lg w-56 outline-none focus:border-black transition cursor-pointer text-sm" >
                        <option value="0">All categories</option>
                        {category.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-5">
                {productList.map(product => (
                    <Link href={`products/${product.id}`} key={product.id} className="border border-gray-400 p-4 rounded-xl hover:shadow-lg hover:bg-gray-50 hover:scale-105 transition duration-300 cursor-pointer" >
                        <span className="text-xs text-gray-400">#{product.id}</span>
                        <h2 className="font-semibold mt-1">{product.name}</h2>
                        <div className="flex justify-between items-center">
                            <p className="text-gray-500 text-sm my-1">{product.price} sum</p>
                            <span className="text-sm">View Info →</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default ProductContent;