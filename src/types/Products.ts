export type Products = Product[]

export type Product = {
    id: number,
    name: string,
    description: string,
    price: number,
    image: string,
    category: string,
    stock: number,
    rating: number,
    brand?: string

}