import { Cart, CartProduct } from '../types/Cart'
import { createStore } from 'zustand/vanilla'
import { persist } from 'zustand/middleware'

export type CartState = {
    cart: Cart
    feedback?: boolean
}

export type CartActions = {
    addProductToCart: (product: CartProduct, items?: number) => void
    removeProductFromCart: (id: number, price: number) => void
    changeItems: (id: number, items: number) => void
    showFeedback: (value: boolean) => void
}

export type CartStore = CartState & CartActions

export const defaultInitState: CartState = {
    cart: {
        content: [],
        total: 0,
    },
    feedback: false,
}

export const createCartStore = (
    initState: CartState = defaultInitState
) => {
    return createStore<CartStore>()(
        persist(
            (set, get) => ({
                ...initState,
                addProductToCart(product, items = 1) {
                    set((state) => ({
                        cart: {
                            content: [...state.cart.content, { ...product, items }],
                            total: state.cart.total + product.price * items,
                        },
                    }))
                },
                removeProductFromCart(id, price) {
                    set((state) => ({
                        cart: {
                            content: state.cart.content.filter(
                                (product) => product.id !== id
                            ),
                            total:
                                state.cart.content.length === 1
                                    ? 0
                                    : state.cart.total - price,
                        },
                    }))
                },
                changeItems(id, items) {
                    set((state) => {
                        const product = state.cart.content.find((p) => p.id === id)
                        if (!product) return state

                        const diff = items - (product.items ?? 0);
                        return {
                            cart: {
                                content: state.cart.content.map((p) =>
                                    p.id === id ? { ...p, items } : p
                                ),
                                total: state.cart.total + product.price * diff,
                            },
                        }
                    })
                },
                showFeedback(value) {
                    set({ feedback: value })
                },
            }),
            {
                name: 'cart-storage',
            }
        )
    )
}
