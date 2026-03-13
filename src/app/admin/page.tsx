
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import AdminClient from "../../modules/AdminClient"
import { CategoryType, ProductType } from "../../@types"
import { GetAll, GetStatic } from "../../service"

// 3-usul: Static (kategoriyalar uchun)
const AdminPage = async () => {
    const store = await cookies()
    if (store.get("auth")?.value !== "1") redirect("/login")

    const products: ProductType[] = await GetAll("/products")
    const categories: CategoryType[] = await GetStatic("/category")

    return (
        <div className="p-5">
            <h1 className="text-xl font-bold mb-4">Admin panel</h1>
            <AdminClient products={products} categories={categories} />
        </div>
    )
}

export default AdminPage
