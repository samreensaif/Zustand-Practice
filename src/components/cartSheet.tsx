"use client"

import type React from "react"
import { ShoppingCart, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image"
import { useCartStore } from "@/stores/CartStore/cartStore"

export function CartSheet({ children }: { children: React.ReactNode }) {
  const cartItems = useCartStore(state => state.items);
  const removeFromCart = useCartStore(state => state.removeFromCart);

  // Debug logging
  console.log("Cart items:", cartItems);

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        {/* This ensures that only one child element is passed to SheetTrigger */}
        {children}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Your Cart
          </SheetTitle>
          <SheetDescription>
            {cartItems.length === 0 ? "Your cart is empty." : `You have ${cartItems.length} item(s) in your cart.`}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-8 flex flex-col gap-4">
          {cartItems.length === 0 ? (
            <div className="flex h-40 flex-col items-center justify-center rounded-md border border-dashed">
              <ShoppingCart className="mb-2 h-10 w-10 text-muted-foreground" />
              <p className="text-muted-foreground">Your cart is empty</p>
              <p className="text-sm text-muted-foreground">Add items to your cart to see them here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-md">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {(item.price)} x {item.quantity}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <SheetFooter className="mt-auto flex-col sm:flex-row sm:justify-between">
            <div className="mb-4 flex items-center justify-between sm:mb-0">
              <span className="text-sm font-medium">Total</span>
              <span className="text-lg font-bold">{totalPrice.toFixed(2)}</span>
            </div>
            <Button className="w-full sm:w-auto" disabled={cartItems.length === 0}>
              Checkout
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
