import Link from "next/link";

export default function Home() {
  return (
    <div className="text-3xl gap-10 bg-green-300 font-bold flex flex-col justify-center items-center h-screen w-full">
      <h2>Shopping Website</h2>
      <Link
        href="/product"
        className="text-lg text-blue-600 hover:text-blue-800 mt-4"
      >
        Go to Men-Shirts
      </Link>
      <Link
        href="/sneakersproduct"
        className="text-lg text-blue-600 hover:text-blue-800 mt-4"
      >
        Go to Men-Sneakers
      </Link>
    </div>
  );
}
