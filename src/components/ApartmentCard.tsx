import Link from "next/link";
import Image from "next/image";

interface ApartmentCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  rooms: number;
  size: number;
  imageUrl: string;
}

export default function ApartmentCard({
  id,
  name,
  description,
  price,
  rooms,
  size,
  imageUrl,
}: Readonly<ApartmentCardProps>) {
  return (
    <Link
      href={`/apartment/${id}`}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative h-48">
        <Image
          src={imageUrl ? imageUrl : "/assets/placeholder.png"}
          alt={name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{name}</h2>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-blue-600">${price}</span>
          <div className="text-sm text-gray-500">
            <span className="mr-2">{rooms} rooms</span>
            <span>{size} m²</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
