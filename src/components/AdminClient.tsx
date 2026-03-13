"use client"
import { useState } from "react"
import { CategoryType, ProductType } from "../@types"
import { createProduct, deleteProduct, updateProduct } from "../service"

const AdminClient = ({ products, categories }: { products: ProductType[], categories: CategoryType[] }) => {
    const [editing, setEditing] = useState<ProductType | null>(null)
    const [showForm, setShowForm] = useState(false)

    return (
        <div className="mt-5 p-5 max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold tracking-wide">Admin Panel / Products</h1>
                <button onClick={() => setShowForm(!showForm)} className="mt-2 px-5 py-2 bg-black text-white border-2 border-black rounded-lg duration-300 hover:bg-white hover:text-black transition cursor-pointer">
                    + Add Product
                </button>
            </div>

            {showForm && (
                <form action={async (item) => { await createProduct(item); setShowForm(false) }} className="flex gap-2 mb-6 p-4">
                    <input name="name" placeholder="Name" required className="border border-gray-300 p-2 rounded-lg outline-none focus:border-black transition flex-1" />
                    <input name="price" placeholder="Price" required className="border border-gray-300 p-2 rounded-lg outline-none focus:border-black transition w-32" />
                    <select name="categoryId" className="border border-gray-300 p-2 rounded-lg outline-none focus:border-black transition">
                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                    <button type="submit" className="cursor-pointer px-4 py-2 bg-black text-white rounded-lg hover:opacity-80 transition text-sm">Save</button>
                    <button type="button" onClick={() => setShowForm(false)} className="cursor-pointer px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm">Cancel</button>
                </form>
            )}

            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-gray-200">
                        <th className="p-3 text-left text-gray-500 font-medium">ID</th>
                        <th className="p-3 text-left text-gray-500 font-medium">Name</th>
                        <th className="p-3 text-left text-gray-500 font-medium">Price</th>
                        <th className="p-3 text-left text-gray-500 font-medium">Category</th>
                        <th className="p-3 text-left text-gray-500 font-medium">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(p => {
                        const cat = categories.find(c => c.id === p.categoryId)
                        return (
                            <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                                {editing?.id === p.id ? (
                                    <td colSpan={5} className="p-3">
                                        <form action={async (item) => { item.append("id", p.id); await updateProduct(item); setEditing(null) }} className="flex gap-2">
                                            <p className="p-3 pr-8 text-gray-400">{p.id}</p>
                                            <input name="name" defaultValue={p.name} required className="border border-gray-300 p-2 rounded-lg outline-none transition w-72 focus:border-gray-500 duration-200" />
                                            <input name="price" defaultValue={p.price} required className="border border-gray-300 p-2 rounded-lg outline-none transition w-52 focus:border-gray-500 duration-200" />
                                            <select name="categoryId" defaultValue={p.categoryId} className="border border-gray-300 p-2 rounded-lg outline-none transition w-51 focus:border-gray-500 duration-200">{categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select>
                                            <button type="submit" className="cursor-pointer px-4 py-2 bg-black text-white rounded-lg hover:opacity-80 transition text-sm">OK</button>
                                            <button type="button" onClick={() => setEditing(null)} className="cursor-pointer px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm">Cancel</button>
                                        </form>
                                    </td>
                                ) : (
                                    <>
                                        <td className="p-3 text-gray-400">{p.id}</td>
                                        <td className="p-3 font-medium">{p.name}</td>
                                        <td className="p-3 text-gray-600">{p.price} sum</td>
                                        <td className="p-3 text-gray-600">{cat?.name}</td>
                                        <td className="p-3 flex gap-5">
                                            <button onClick={() => setEditing(p)} className="text-blue-500 hover:text-blue-700 transition cursor-pointer">Edit</button>
                                            <form action={async (item) => { item.append("id", p.id); await deleteProduct(item) }} style={{ display: "inline" }}>
                                                <button type="submit" className="text-red-500 hover:text-red-700 transition cursor-pointer">Delete</button>
                                            </form>
                                        </td>
                                    </>
                                )}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default AdminClient