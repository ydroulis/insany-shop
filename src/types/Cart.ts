
export type CartProduct = {
    id: number
    name: string
    description: string
    price: number
    image: string
    stock: number
    items?: number
}

export type Cart = {
    content: CartProduct[]
    total: number
}