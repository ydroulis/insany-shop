import { Categories } from '@/types/Categories'
import { createStore } from 'zustand/vanilla'

export type CategoriesState = {
    categories: Categories
}

export type CategoriesActions = {
    setCategories: (categories: Categories) => void
}

export type CategoriesStore = CategoriesState & CategoriesActions

export const defaultInitState: CategoriesState = {
    categories: [],
}

export const createCategoriesStore = (
    initState: CategoriesState = defaultInitState,
) => {
    return createStore<CategoriesStore>()((set) => ({
        ...initState,
        setCategories: (categories: Categories) => set({ categories }),
    }))
}