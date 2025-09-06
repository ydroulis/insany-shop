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

export interface Pagination {
    currentPage: number;
    totalPages: number;
    totalProducts: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

export interface ProductsResponse {
    products: Product[];
    pagination: Pagination;
}