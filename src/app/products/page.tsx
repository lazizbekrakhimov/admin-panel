import { CategoryType, ProductType } from "../../@types"
import ProductContent from "../../components/ProductContent"
import { GetAll } from "../../service"

export const revalidate = 60

const Products = async () => {
    const product: ProductType[] = await GetAll("/products")
    const category: CategoryType[] = await GetAll("/category")

    return <ProductContent product={product} category={category} />
}

export default Products
