export type Products = Product[]

export type Product = {
    id: number,
    name: string,
    description: string,
    price: number,
    image: string,
    category: string | undefined,
    stock: number,
    rating: number,
    brand?: string

}