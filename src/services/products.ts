import { Product, ProductsResponse } from "@/types/Products";
import { api } from "./api";

export const getProducts = async (
    page?: number,
    limit?: number,
    category?: string
): Promise<ProductsResponse> => {
    const params: Record<string, string | number> = {};
    if (page) params.page = page;
    if (limit) params.limit = limit;
    if (category) params.category = category;

    const response = await api.get<ProductsResponse>("/products", { params });
    return response.data;
};

export const getProductById = async (id: number): Promise<Product> => {
    const response = await api.get<{ product: Product }>(`/products/${id}`);
    return response.data.product;
};
