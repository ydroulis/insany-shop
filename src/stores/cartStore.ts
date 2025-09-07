import { Cart, CartProduct } from '../types/Cart'
import { createStore } from 'zustand/vanilla'

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
        content: [

        ],
        total: 0
    },
    feedback: false
}

export const createCartStore = (
    initState: CartState = defaultInitState,
) => {
    return createStore<CartStore>()((set) => ({
        ...initState,
        addProductToCart(product, items = 1) {
            set((state) => ({
                cart: {
                    content: [...state.cart.content, { ...product, items }],
                    total: state.cart.total + (product.price * items)
                }
            }))
        },
        removeProductFromCart(id, price) {
            set((state) => ({
                cart: {
                    content: state.cart.content.filter(product => product.id !== id),
                    total: state.cart.content.length === 1 ? 0 : state.cart.total - price
                }
            }))
        },
        changeItems(id, items) {
            set((state) => {
                return {
                    cart: {
                        content: state.cart.content.map(product => product.id === id ? { ...product, items } : product),
                        total: state.cart.total + (state.cart.content.find(product => product.id === id)?.price || 0) * (items - (state.cart.content.find(product => product.id === id)?.items || 0))
                    }
                }
            })
        },
        showFeedback(value) {
            set({ feedback: value });
        }
    }))
}