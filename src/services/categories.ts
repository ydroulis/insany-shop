import { Categories } from "@/types/Categories";
import { api } from "./api";


export const getCategories = async (): Promise<{ categories: Categories }> => {
    const response = await api.get<{ categories: Categories }>("/categories");
    return response.data;
};
