"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

interface Apartment {
  id: string;
  name: string;
  description: string;
  price: number;
  rooms: number;
  size: number;
  imageUrl: string;
  address: {
    street: string;
    city: string;
    zip: string;
    country: string;
  };
  developer: {
    name: string;
    description: string;
  };
  project: {
    name: string;
  };
}

export default function ApartmentDetails() {
  const { id } = useParams();
  const [apartment, setApartment] = useState<Apartment | null>(null);

  useEffect(() => {
    async function fetchApartmentDetails() {
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/property/${id}`
        );
        const data = await response.json();
        setApartment(data);
      } catch (error) {
        console.error("Error fetching apartment details:", error);
      }
    }

    if (id) {
      fetchApartmentDetails();
    }
  }, [id]);

  if (!apartment) {
    return <>Loading...</>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-64 sm:h-80 lg:h-96">
        <div className="relative h-64 sm:h-80 lg:h-96">
          <Image
            src={
              apartment.imageUrl
                ? apartment.imageUrl
                : "/assets/placeholder.png"
            }
            alt={apartment.name}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {apartment.name}
        </h1>
        <p className="text-gray-600 mb-6">{apartment.description}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Details
            </h2>
            <ul className="text-gray-600">
              <li>Price: ${apartment.price}/month</li>
              <li>Rooms: {apartment.rooms}</li>
              <li>Size: {apartment.size} m²</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Address
            </h2>
            {apartment.address ? (
              <address className="text-gray-600 not-italic">
                {apartment.address.street}
                <br />
                {apartment.address.city}, {apartment.address.zip}
                <br />
                {apartment.address.country}
              </address>
            ) : (
              <p className="text-gray-600">Address not available</p>
            )}
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Developer
          </h2>
          {apartment.developer ? (
            <>
              <p className="text-gray-600">{apartment.developer.name}</p>
              <p className="text-gray-600">{apartment.developer.description}</p>
            </>
          ) : (
            <p className="text-gray-600">Developer information not available</p>
          )}
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Project</h2>
          {apartment.project ? (
            <p className="text-gray-600">{apartment.project.name}</p>
          ) : (
            <p className="text-gray-600">Project information not available</p>
          )}
        </div>
      </div>
    </div>
  );
}
