"use client"

import { IoCartOutline } from "react-icons/io5";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import React from 'react'
import { Badge } from "./ui/badge";
import { useCartStore } from "@/stores/CartStore/cartStore";
import { CartSheet } from "./cartSheet";
import { WishlistSheet } from "./wishlistSheet";

function Cart() {
  const count = useCartStore(state => state.count);
  const wishlist = useCartStore(state => state.wishlist);

  return (
    <div className="fixed top-10 right-10 flex gap-4">
      {/* Wishlist Icon */}
      <WishlistSheet>
        <div className="relative">
         
            <IoHeartOutline size={50} />
          
          {wishlist.length > 0 && 
            <Badge className="absolute top-0 right-0 bg-red-500">
              {wishlist.length}
            </Badge>
          }
        </div>
      </WishlistSheet>

      {/* Cart Icon */}
      <CartSheet>
        <div className="relative">
          <IoCartOutline size={50} />
          {count > 0 && 
            <Badge className="absolute top-0 right-0">
              {count}
            </Badge>
          }
        </div>
      </CartSheet>
    </div>
  )
}

export default Cart;