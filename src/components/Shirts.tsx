"use client"
import Link from "next/link"
import Image from "next/image"
import { shirtsData } from "@/constants/shirtData"
import { IoHeart, IoHeartOutline } from "react-icons/io5"
import { useCartStore } from "@/stores/CartStore/cartStore"

export default function Shirts() {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useCartStore()

  const toggleWishlist = (item: any) => {
    if (isInWishlist(item.id, "shirt")) {
      // Pass 'shirt' as the product type
      removeFromWishlist(item.id, "shirt")
    } else {
      addToWishlist({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        productType: "shirt", // Add product type
      })
    }
  }

  return (
    <div className="p-4 mx-auto lg:max-w-6xl md:max-w-4xl">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 sm:mb-8 underline">Premium Shirts</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {shirtsData.map((item, index: number) => {
          const isWishlisted = isInWishlist(item.id, "shirt") // Pass 'shirt' as the product type

          return (
            <div
              key={index}
              className="bg-white flex flex-col rounded overflow-hidden shadow-md hover:scale-[1.01] transition-all relative"
            >
              <Link
                href={`/product/${item.id}?id=${item.id}&name=${item.name}&price=${item.price}&image=${item.image}`}
                className="block"
              >
                <div className="w-full">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={500}
                    height={500}
                    className="w-full aspect-[18/24] object-cover object-top"
                  />
                </div>
                <div className="p-4">
                  <h5 className="text-sm sm:text-base font-semibold text-slate-900 line-clamp-2">{item.name}</h5>
                  <div className="mt-2 flex items-center flex-wrap gap-2">
                    <h6 className="text-sm sm:text-base font-semibold text-slate-900">${item.price}</h6>
                    <div
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        toggleWishlist(item)
                      }}
                      className="bg-slate-100 w-8 h-8 flex items-center justify-center rounded-full cursor-pointer ml-auto hover:bg-slate-200 transition-colors"
                      title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                    >
                      {isWishlisted ? <IoHeart className="text-red-500" /> : <IoHeartOutline />}
                    </div>
                  </div>
                </div>
              </Link>
              <div className="min-h-[50px] p-4 !pt-0">
                <button
                  type="button"
                  className="absolute left-0 right-0 bottom-3 max-w-[88%] mx-auto text-sm px-2 py-2 
                font-medium w-full bg-blue-600 hover:bg-blue-700 text-white hover:cursor-pointer"
                >
                  View Details
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
