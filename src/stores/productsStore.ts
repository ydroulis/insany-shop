import { Products, ProductsResponse } from '@/types/Products'
import { createStore } from 'zustand/vanilla'

export type ProductsState = {
  products: Products
  pagination: ProductsResponse['pagination']
}

export type ProductsActions = {
  setProducts: (products: Products) => void
  setPagination: (pagination: ProductsResponse['pagination']) => void
}

export type ProductsStore = ProductsState & ProductsActions

export const defaultInitState: ProductsResponse = {
  products: [],
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0,
    hasNextPage: false,
    hasPreviousPage: false
  }
}

export const createProductsStore = (
  initState: ProductsState = defaultInitState,
) => {
  return createStore<ProductsStore>()((set) => ({
    ...initState,
    setProducts: (products: Products) => set({ products }),
    setPagination: (pagination: ProductsResponse['pagination']) => set({ pagination }),
  }))
}