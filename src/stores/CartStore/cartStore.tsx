import { create } from "zustand"

type CartItem = {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

type WishlistItem = {
  id: number
  name: string
  price: number
  image: string
  productType: string // Add product type to distinguish between shirts and sneakers
}

type CartState = {
  items: CartItem[]
  wishlist: WishlistItem[]
  addToCart: (item: Omit<CartItem, "quantity">) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
  count: number
  addToWishlist: (item: WishlistItem) => void // Updated to include productType
  removeFromWishlist: (id: number, productType: string) => void // Updated to include productType
  isInWishlist: (id: number, productType: string) => boolean // Updated to include productType
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  wishlist: [],
  count: 0,

  addToCart: (item) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id)
      if (existing) {
        return {
          items: state.items.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)),
        }
      }
      return {
        items: [...state.items, { ...item, quantity: 1 }],
        count: state.count + 1,
      }
    }),

  removeFromCart: (id) =>
    set((state) => {
      const itemToRemove = state.items.find((i) => i.id === id)
      const updatedItems = state.items.filter((i) => i.id !== id)
      return {
        items: updatedItems,
        count: itemToRemove ? state.count - 1 : state.count,
      }
    }),

  clearCart: () => set({ items: [], count: 0 }),

  addToWishlist: (item) =>
    set((state) => {
      // Check if item already exists in wishlist by id AND productType
      const exists = state.wishlist.some((i) => i.id === item.id && i.productType === item.productType)
      if (!exists) {
        return {
          wishlist: [...state.wishlist, item],
        }
      }
      return state
    }),

  removeFromWishlist: (id, productType) =>
    set((state) => ({
      wishlist: state.wishlist.filter((i) => !(i.id === id && i.productType === productType)),
    })),

  isInWishlist: (id, productType) => {
    // Check if item is in the wishlist by id AND productType
    return get().wishlist.some((item) => item.id === id && item.productType === productType)
  },
}))
