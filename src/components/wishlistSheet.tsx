"use client"

import type React from "react"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useCartStore } from "@/stores/CartStore/cartStore"
import { Trash2 } from "lucide-react"
import Image from "next/image"

export function WishlistSheet({ children }: { children: React.ReactNode }) {
  const wishlist = useCartStore((state) => state.wishlist)
  const removeFromWishlist = useCartStore((state) => state.removeFromWishlist)

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your Wishlist</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4 px-4">
          {wishlist.length === 0 ? (
            <p>Your wishlist is empty</p>
          ) : (
            wishlist.map((item) => (
              <div key={`${item.productType}-${item.id}`} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500 capitalize">{item.productType}</p>
                    <p className="font-semibold">${item.price}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromWishlist(item.id, item.productType)}
                  className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
                  aria-label={`Remove ${item.name} from wishlist`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
