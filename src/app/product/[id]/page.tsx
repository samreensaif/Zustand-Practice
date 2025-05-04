"use client"

import { useCartStore } from '@/stores/CartStore/cartStore';
import { Stars } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import React from 'react'



function ProductDetail() {


    const searchParams = useSearchParams();
    const id = parseInt(searchParams.get('id') || '0');
    const price = parseFloat(searchParams.get('price') || '0');
    const image = searchParams.get('image');
    const name = searchParams.get('name' ); // name query parameter ko access karna
    const addToCart = useCartStore((state) => state.addToCart);
    const imageSrc = image || '/sn1.jpg';
  return (
    <>
    
    <div>
      <div className="grid items-start grid-cols-1 lg:grid-cols-3 px-5 py-10">
        
          <Image
            src={imageSrc}
            alt={name || ''}
            width={500}
            height={500}
            className="w-full h-full object-contain"
          />

        <div className="py-6 px-8 max-lg:max-w-2xl">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">{name} </h2>
            <p className="text-sm text-slate-500 mt-2">Well-Versed Commerce</p>
          </div>

          <div className="flex items-center space-x-1 mt-6">
            <Stars />

            <button type="button" className="px-2.5 py-1.5 bg-slate-100 text-xs text-slate-900 rounded-md flex items-center !ml-4">
              
              87 Reviews
            </button>
          </div>

          <div className="mt-8">
            <div className="flex items-center flex-wrap gap-4">
              <p className="text-slate-900 text-4xl font-semibold">${price}</p>
              <p className="text-slate-400 text-sm mt-2 line-through">$42 <span className="ml-1">Tax included</span></p>
            </div>
          </div>

          

          <div className="mt-8 space-y-4">
            <button type="button" 
            onClick={() => name && image && addToCart({ id, name, price,image })}
            className="w-full px-4 py-2.5 border border-slate-800 
            bg-transparent hover:bg-slate-50 text-slate-900 text-sm font-medium rounded-md">Add to cart</button>
            
          </div>

          <div className="mt-8">
              <Link href="/checkout" >
              
            <button type="button" className="w-full px-4 py-2.5 border border-slate-800 
            bg-transparent hover:bg-slate-50 text-slate-900 text-sm font-medium rounded-md">Buy Now</button>

</Link>

          </div>

          <div className="mt-8">
            <div>
              <h3 className="text-xl font-semibold text-slate-900">Product Description</h3>
              <p className="text-sm text-slate-500 mt-4">Elevate your casual style with our premium men's t-shirt. Crafted for comfort and designed with a modern fit, this versatile shirt is an essential addition to your wardrobe. The soft and breathable fabric ensures all-day comfort, making it perfect for everyday wear. Its classNameic crew neck and short sleeves offer a timeless look.</p>
            </div>

            
          </div>
        </div>
      </div>
    </div>
    
    
    </>
  )
}

export default ProductDetail