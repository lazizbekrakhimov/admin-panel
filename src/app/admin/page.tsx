
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import AdminClient from "../../components/AdminClient"
import { CategoryType, ProductType } from "../../@types"
import { GetAll, GetStatic } from "../../service"

const AdminPage = async () => {
    const store = await cookies()
    if (store.get("auth")?.value !== "1") redirect("/login")

    const products: ProductType[] = await GetAll("/products")
    const categories: CategoryType[] = await GetStatic("/category")

    return <AdminClient products={products} categories={categories} />
}

export default AdminPage
