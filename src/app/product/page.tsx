"use client"
import React, { SetStateAction, useState } from 'react'

import Shirts from '@/components/Shirts'
import Sneakers from '@/components/Sneakers'
import { Button } from '@/components/ui/button'

export default function Product() {
  
  const [activeCategory, setActiveCategory] = useState("All")

  // Function to handle category button clicks
  const handleCategoryClick = (category: SetStateAction<string>) => {
    setActiveCategory(category)
  }

  // Function to determine which section to render
  const renderProductSection = () => {
    switch (activeCategory) {
      case "Shirt":
        return <Shirts />
      case "Sneaker":
        return <Sneakers/>
      default:
        // For "All" category, show both sections
        return (
          <>
            <Shirts />
            <div className="mt-12">

            <Sneakers/>
            </div>


           
          </>
        )
    }
  }

  
  
  
  return (
    
<>


<div className='flex gap-5  mt-5 justify-center items-center'>
{["All","Shirt", "Sneaker"].map((category) => (
  <button
    key={category}
    className={`px-4 py-2 rounded-md ${
      activeCategory === category ? "bg-blue-500 text-white" : "bg-gray-200"
    }`}
    onClick={() => handleCategoryClick(category)}
  >
    {category}
  </button>
))}
  
</div>

{renderProductSection()}


</>


    
  )
}

