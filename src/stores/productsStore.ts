import { Products } from '@/types/Products'
import { createStore } from 'zustand/vanilla'

export type ProductsState = {
  products: Products
}

export type ProductsActions = {
  setProducts: (products: Products) => void
}

export type ProductsStore = ProductsState & ProductsActions

export const defaultInitState: ProductsState = {
  products: [],
}

export const createProductsStore = (
  initState: ProductsState = defaultInitState,
) => {
  return createStore<ProductsStore>()((set) => ({
    ...initState,
    setProducts: (products: Products) => set({ products }),
  }))
}