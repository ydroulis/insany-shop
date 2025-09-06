import { api } from "./api";

export interface SearchResponse {
    suggestions: string[];
    query: string;
}

export const searchProducts = async (query: string): Promise<SearchResponse> => {
    const response = await api.get<SearchResponse>("/search", { params: { q: query } });
    return response.data;
};
