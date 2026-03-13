"use client"
import { useState } from "react"
import { CategoryType, ProductType } from "../@types"
import { createProduct, deleteProduct, updateProduct } from "../service"

const AdminClient = ({ products, categories }: { products: ProductType[], categories: CategoryType[] }) => {
    const [editing, setEditing] = useState<ProductType | null>(null)
    const [showForm, setShowForm] = useState(false)

    return (
        <div>
            <button onClick={() => setShowForm(!showForm)} className="bg-black text-white px-3 py-1 rounded mb-4">
                + Yangi product
            </button>

            {showForm && (
                <form action={async (fd) => { await createProduct(fd); setShowForm(false) }} className="flex gap-2 mb-4">
                    <input name="name" placeholder="Nomi" required className="border p-1 rounded" />
                    <input name="price" placeholder="Narxi" required className="border p-1 rounded" />
                    <select name="categoryId" className="border p-1 rounded">
                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                    <button type="submit" className="bg-green-600 text-white px-3 py-1 rounded">Saqlash</button>
                </form>
            )}

            <table className="w-full border-collapse border text-sm">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2 text-left">ID</th>
                        <th className="border p-2 text-left">Nomi</th>
                        <th className="border p-2 text-left">Narxi</th>
                        <th className="border p-2 text-left">Kategoriya</th>
                        <th className="border p-2">Amallar</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(p => {
                        const cat = categories.find(c => c.id === p.categoryId)
                        return (
                            <tr key={p.id}>
                                {editing?.id === p.id ? (
                                    <td colSpan={5} className="border p-2">
                                        <form action={async (fd) => { fd.append("id", p.id); await updateProduct(fd); setEditing(null) }} className="flex gap-2">
                                            <input name="name" defaultValue={p.name} required className="border p-1 rounded flex-1" />
                                            <input name="price" defaultValue={p.price} required className="border p-1 rounded w-28" />
                                            <select name="categoryId" defaultValue={p.categoryId} className="border p-1 rounded">
                                                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                            </select>
                                            <button type="submit" className="bg-green-600 text-white px-2 py-1 rounded">OK</button>
                                            <button type="button" onClick={() => setEditing(null)} className="bg-gray-300 px-2 py-1 rounded">Bekor</button>
                                        </form>
                                    </td>
                                ) : (
                                    <>
                                        <td className="border p-2">{p.id}</td>
                                        <td className="border p-2">{p.name}</td>
                                        <td className="border p-2">{p.price}</td>
                                        <td className="border p-2">{cat?.name}</td>
                                        <td className="border p-2 text-center">
                                            <button onClick={() => setEditing(p)} className="text-blue-600 mr-3">Tahrirlash</button>
                                            <form action={async (fd) => { fd.append("id", p.id); await deleteProduct(fd) }} style={{ display: "inline" }}>
                                                <button type="submit" className="text-red-600">O'chirish</button>
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
