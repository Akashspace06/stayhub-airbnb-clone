import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, Star } from 'lucide-react';

export interface PropertyCardProps {
  id: string;
  title: string;
  city: string;
  country: string;
  pricePerNight: number;
  rating: number;
  imageUrl: string;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  id,
  title,
  city,
  country,
  pricePerNight,
  rating,
  imageUrl,
}) => {
  const [isFav, setIsFav] = useState(false);

  return (
    <Link href={`/listings/${id}`} className="group block cursor-pointer">
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-neutral-200">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsFav(!isFav);
          }}
          className="absolute right-3 top-3 p-1.5 z-10 transition-transform active:scale-90"
        >
          <Heart
            className={`h-6 w-6 stroke-white stroke-[2] drop-shadow-md transition-colors ${
              isFav ? 'fill-rose-500 stroke-rose-500' : 'fill-black/30'
            }`}
          />
        </button>
      </div>

      <div className="mt-3 flex justify-between items-baseline">
        <h3 className="font-semibold text-neutral-900 truncate">
          {city}, {country}
        </h3>
        <div className="flex items-center gap-1 text-sm font-medium text-neutral-800">
          <Star className="h-3.5 w-3.5 fill-neutral-900 text-neutral-900" />
          <span>{rating ? rating.toFixed(2) : 'New'}</span>
        </div>
      </div>
      <p className="text-sm text-neutral-500 truncate">{title}</p>
      <div className="mt-1">
        <span className="font-bold text-neutral-900">${pricePerNight}</span>
        <span className="text-sm text-neutral-600"> night</span>
      </div>
    </Link>
  );
};