"use server"

import { revalidatePath } from "next/cache";

const BASE = "http://localhost:4000"

export const GetAll = async (URL: string) => {
    const res = await fetch(BASE + URL, {
        next: { revalidate: 60 }
    });
    const data = await res.json();
    return data
}

export const GetStatic = async (URL: string) => {
    const res = await fetch(BASE + URL, { cache: "force-cache" })
    return res.json()
}

export async function createProduct(data: FormData) {
    await fetch(`${BASE}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: data.get("name"),
            price: data.get("price"),
            categoryId: data.get("categoryId"),
        }),
    })
    revalidatePath("/products")
    revalidatePath("/admin")
}

export async function updateProduct(data: FormData) {
    const id = data.get("id")
    await fetch(`${BASE}/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id,
            name: data.get("name"),
            price: data.get("price"),
            categoryId: data.get("categoryId"),
        }),
    })
    revalidatePath("/products")
    revalidatePath("/admin")
}

export async function deleteProduct(data: FormData) {
    const id = data.get("id")
    await fetch(`${BASE}/products/${id}`, { method: "DELETE" })
    revalidatePath("/products")
    revalidatePath("/admin")
}
