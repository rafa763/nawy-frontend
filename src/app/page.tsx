"use client";

import { useState, useEffect } from "react";
import ApartmentCard from "../components/ApartmentCard";
import Pagination from "../components/Pagination";

interface Apartment {
  id: string;
  name: string;
  description: string;
  price: number;
  rooms: number;
  size: number;
  imageUrl: string;
}

export default function Home() {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalApartments, setTotalApartments] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchApartments() {
      setLoading(true);
      try {
        const response = await fetch(
          `http://54.234.49.50:8080/api/v1/property?page=${currentPage}&size=${pageSize}`
        );
        const data = await response.json();
        setApartments(data.data);
        setTotalApartments(data.total);
      } catch (error) {
        console.error("Error fetching apartments:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchApartments();
  }, [currentPage, pageSize]);

  const totalPages = Math.ceil(totalApartments / pageSize);

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Available Apartments
      </h1>
      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {apartments.map((apartment) => (
              <ApartmentCard key={apartment.id} {...apartment} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            pageSize={pageSize}
            onPageSizeChange={setPageSize}
          />
        </>
      )}
    </>
  );
}
