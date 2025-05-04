"use client"

import { IoCartOutline } from "react-icons/io5";
import React from 'react'
import { Badge } from "./ui/badge";
import { useCartStore } from "@/stores/CartStore/cartStore";
import { CartSheet } from "./cartSheet";

function Cart() {
  const count = useCartStore(state => state.count)

  return (
    <div className="fixed top-10 right-10">
      <CartSheet>
        {/* Ensure single child wrapper */}
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
