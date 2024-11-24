"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface Property {
  id: string;
  name: string;
  description: string;
  price: number;
  rooms: number;
  size: number;
  imageUrl: string;
}

const Loading = () => (
  <div className="text-center text-gray-500">Loading...</div>
);

function SearchPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProperties() {
      setLoading(true);
      try {
        const response = await fetch(
          `http://54.234.49.50:8080/api/v1/property/search?query=${query}`
        );
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    }

    if (query) {
      fetchProperties();
    }
  }, [query]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Search Results</h1>
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <Link
              key={property.id}
              href={`/apartment/${property.id}`}
              className="bg-white rounded-lg shadow-md p-4 block"
            >
              <Image
                src={
                  property.imageUrl
                    ? property.imageUrl
                    : "/assets/placeholder.png"
                }
                alt={property.name}
                layout="responsive"
                width={300}
                height={200}
                className="rounded-lg"
              />
              <h2 className="text-xl font-bold text-gray-800 mt-4">
                {property.name}
              </h2>
              <p className="text-gray-600">{property.description}</p>
              <p className="text-gray-600">Price: ${property.price}/month</p>
              <p className="text-gray-600">Rooms: {property.rooms}</p>
              <p className="text-gray-600">Size: {property.size} m²</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<Loading />}>
      <SearchPageContent />
    </Suspense>
  );
}
