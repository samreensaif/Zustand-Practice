// src/stores/cartStore.ts
import { create } from 'zustand';

type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];       // Cart mein items store karne ke liye
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;  // Item ko cart mein add karne ka function
  removeFromCart: (id: number) => void; // Item ko cart se remove karne ka function
  clearCart: () => void; // Cart ko clear karne ka function
  count: number; // Total items count
};

export const useCartStore = create<CartState>((set) => ({
  items: [],  // Initial empty cart
  count: 0,   // Initial item count in cart

  addToCart: (item) => set((state) => {
    // Agar item cart mein already hai, to quantity barhao
    const existing = state.items.find((i) => i.id === item.id);
    if (existing) {
      return {
        items: state.items.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + 1 }  // Quantity increase
            : i
        ),
          // Total count increase
      };
    }
    // Agar item pehle se nahi hai, to usko add karo with quantity = 1
    return {
      items: [...state.items, { ...item, quantity: 1 }],
      count: state.count + 1,  // Total count increase
    };
  }),

  removeFromCart: (id) => set((state) => {
    const updatedItems = state.items.filter((i) => i.id !== id);  // Item ko remove karo
    return {
      items: updatedItems,
      count: state.count - 1,  // Total count decrease
    };
  }),

  clearCart: () => set({ items: [], count: 0 }),  // Cart ko clear karna with count reset
}));
