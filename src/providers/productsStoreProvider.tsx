'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import { type ProductsStore, createProductsStore } from '../stores/productsStore'

export type ProductsStoreApi = ReturnType<typeof createProductsStore>

export const ProductsStoreContext = createContext<ProductsStoreApi | undefined>(
    undefined,
)

export interface ProductsStoreProviderProps {
    children: ReactNode
}

export const ProductsStoreProvider = ({
    children,
}: ProductsStoreProviderProps) => {
    const storeRef = useRef<ProductsStoreApi | null>(null)
    if (storeRef.current === null) {
        storeRef.current = createProductsStore()
    }

    return (
        <ProductsStoreContext.Provider value={storeRef.current}>
            {children}
        </ProductsStoreContext.Provider>
    )
}

export const useProductsStore = <T,>(
    selector: (store: ProductsStore) => T,
): T => {
    const productsStoreContext = useContext(ProductsStoreContext)

    if (!productsStoreContext) {
        throw new Error(`useStore must be used within ProductsStoreProvider`)
    }

    return useStore(productsStoreContext, selector)
}
