"use client";

import Link from "next/link";
import Image from "next/image";
import SearchBar from "./SearchBar";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          <div className="flex-1 flex justify-left items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image
                src="/assets/nawy.png"
                alt="Nawy Real Estate Logo"
                width={120}
                height={60}
                className="h-10 w-auto"
              />
              <span className="sr-only">Nawy Real Estate</span>
            </Link>
          </div>
          <div className="flex-1 flex justify-center">
            <SearchBar />
          </div>
          <div className="flex-1 text-right">
            <Link
              href="/add-property"
              className="text-blue-500 hover:text-blue-700"
            >
              Create Property
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
