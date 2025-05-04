"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Shirts from "@/components/Shirts";
import Sneakers from "@/components/Sneakers";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

// Main component that will be wrapped in Suspense
const ProductContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("All");

  // Update activeCategory based on URL params
  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setActiveCategory(category);
    }
  }, [searchParams]);

  // Handle category selection
  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    router.push(`/product?category=${category}`);
  };

  // Render the appropriate product section
  const renderProductSection = () => {
    switch (activeCategory) {
      case "Shirt":
        return <Shirts />;
      case "Sneaker":
        return <Sneakers />;
      default:
        return (
          <>
            <Shirts />
            <div className="mt-12">
              <Sneakers />
            </div>
          </>
        );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-5 justify-center items-center mb-8">
        <Link 
          href="/" 
          className="text-blue-600 hover:text-blue-800 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </Link>
        
        {["All", "Shirt", "Sneaker"].map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeCategory === category
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {renderProductSection()}
    </div>
  );
};

// Wrapper component with Suspense boundary
const ProductPage = () => {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    }>
      <ProductContent />
    </Suspense>
  );
};

export default ProductPage;