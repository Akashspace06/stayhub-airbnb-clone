import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { CategoriesBar } from '../components/CategoriesBar';
import { PropertyCard } from '../components/PropertyCard';
import { fetchApi } from '../services/api';

interface Property {
  id: string;
  title: string;
  city: string;
  country: string;
  pricePerNight: number;
  imageUrls?: string[];
  imageUrl?: string;
}

const DEFAULT_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Cliffside Sunset Villa overlooking the Aegean',
    city: 'Santorini',
    country: 'Greece',
    pricePerNight: 420,
    imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2',
    title: 'Architectural Alpine Chalet with Matterhorn View',
    city: 'Zermatt',
    country: 'Switzerland',
    pricePerNight: 650,
    imageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '3',
    title: 'Kyoto Bamboo Forest Machiya',
    city: 'Kyoto',
    country: 'Japan',
    pricePerNight: 280,
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '4',
    title: 'Malibu Waterfront Architectural Haven',
    city: 'Malibu',
    country: 'United States',
    pricePerNight: 850,
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '5',
    title: 'Positano Cliffside Suite with Sea View',
    city: 'Amalfi Coast',
    country: 'Italy',
    pricePerNight: 510,
    imageUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '6',
    title: 'Tulum Eco-Luxury Jungle Villa with Pool',
    city: 'Tulum',
    country: 'Mexico',
    pricePerNight: 390,
    imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '7',
    title: 'Reykjavik Glass Igloo Aurora Stays',
    city: 'Reykjavik',
    country: 'Iceland',
    pricePerNight: 470,
    imageUrl: 'https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '8',
    title: 'Cotswolds Stone Thatched Cottage',
    city: 'Cotswolds',
    country: 'United Kingdom',
    pricePerNight: 320,
    imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
  },
];

export default function HomePage() {
  const [properties, setProperties] = useState<Property[]>(DEFAULT_PROPERTIES);

  useEffect(() => {
    fetchApi<Property[]>('/listings')
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProperties(data);
        }
      })
      .catch((err) => {
        console.warn('Backend listings not reached, using demo catalog:', err);
      });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <CategoriesBar />
      
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {properties.map((prop) => (
            <PropertyCard
              key={prop.id}
              id={prop.id}
              title={prop.title}
              city={prop.city}
              country={prop.country}
              pricePerNight={prop.pricePerNight}
              rating={4.96}
              imageUrl={
                prop.imageUrl ||
                prop.imageUrls?.[0] ||
                'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80'
              }
            />
          ))}
        </div>
      </main>
    </div>
  );
}