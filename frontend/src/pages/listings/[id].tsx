import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Header } from '../../components/Header';
import { BookingWidget } from '../../components/BookingWidget';
import {
  Star,
  Share2,
  Heart,
  ShieldCheck,
  Wifi,
  Tv,
  Car,
  Utensils,
  Wind,
  MapPin,
  Sparkles,
} from 'lucide-react';

const PROPERTY_DETAILS: Record<string, any> = {
  '1': {
    id: '1',
    title: 'Cliffside Sunset Villa overlooking the Aegean Sea',
    city: 'Santorini',
    country: 'Greece',
    description: `Perched on the volcanic cliffs of Oia, this cave-style villa features breathtaking caldera views, private infinity jacuzzi, and minimalist Cycladic architecture.

Wake up to the turquoise waters of the Aegean, enjoy breakfast on your private terrace, and watch world-famous sunsets directly from your lounge chairs. Completely renovated with modern luxuries, central AC, ultra-fast fiber WiFi, and luxury bedding.`,
    pricePerNight: 420,
    cleaningFee: 80,
    rating: 4.98,
    reviewCount: 142,
    hostName: 'Elena Rostova',
    hostAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    maxGuests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,
    images: [
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80',
    ],
  },
};

export default function ListingDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const property = (id && PROPERTY_DETAILS[id as string]) || PROPERTY_DETAILS['1'];

  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleReserve = async (bookingData: { checkIn: string; checkOut: string; guests: number }) => {
    try {
      const response = await fetch('http://localhost:8085/api/v1/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('stayhub_token') || ''}`,
        },
        body: JSON.stringify({
          listingId: property.id,
          checkInDate: bookingData.checkIn,
          checkOutDate: bookingData.checkOut,
          guestCount: bookingData.guests,
        }),
      });

      setBookingSuccess(true);
      setTimeout(() => setBookingSuccess(false), 5000);
    } catch (err) {
      console.error(err);
      setBookingSuccess(true); // Demo feedback
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Title Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
            {property.title}
          </h1>
          <div className="mt-2 flex flex-wrap items-center justify-between text-sm text-neutral-600">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-neutral-900 text-neutral-900" />
              <span className="font-semibold text-neutral-900">{property.rating}</span>
              <span>·</span>
              <span className="underline font-medium">{property.reviewCount} reviews</span>
              <span>·</span>
              <span>{property.city}, {property.country}</span>
            </div>
            <div className="flex items-center gap-4 mt-2 sm:mt-0 font-medium">
              <button className="flex items-center gap-1.5 hover:underline">
                <Share2 className="h-4 w-4" /> Share
              </button>
              <button className="flex items-center gap-1.5 hover:underline">
                <Heart className="h-4 w-4" /> Save
              </button>
            </div>
          </div>
        </div>

        {/* 5-Image Gallery Grid */}
        <div className="grid h-[420px] grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-2xl">
          <div className="relative col-span-2 row-span-2">
            <img src={property.images[0]} alt="Hero" className="h-full w-full object-cover hover:brightness-95 transition" />
          </div>
          {property.images.slice(1, 5).map((img: string, idx: number) => (
            <div key={idx} className="relative overflow-hidden">
              <img src={img} alt={`Detail ${idx + 1}`} className="h-full w-full object-cover hover:brightness-95 transition" />
            </div>
          ))}
        </div>

        {/* 2-Column Split: 65% Left / 35% Right */}
        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-12">
          
          {/* Left Column (8 / 12 cols = 65%) */}
          <div className="lg:col-span-8 space-y-8 divide-y divide-neutral-200">
            
            {/* Host overview */}
            <div className="flex items-center justify-between pb-6">
              <div>
                <h2 className="text-xl font-bold text-neutral-900">
                  Entire villa hosted by {property.hostName}
                </h2>
                <p className="text-sm text-neutral-500 mt-1">
                  {property.maxGuests} guests · {property.bedrooms} bedrooms · {property.beds} beds · {property.bathrooms} baths
                </p>
              </div>
              <img src={property.hostAvatar} alt={property.hostName} className="h-14 w-14 rounded-full object-cover border" />
            </div>

            {/* Highlights */}
            <div className="pt-6 space-y-4">
              <div className="flex items-start gap-4">
                <Sparkles className="h-6 w-6 text-rose-500 mt-1" />
                <div>
                  <h4 className="font-semibold text-neutral-900">Guest favorite</h4>
                  <p className="text-sm text-neutral-500">One of the most loved homes on StayHub based on ratings, reviews, and reliability.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <ShieldCheck className="h-6 w-6 text-rose-500 mt-1" />
                <div>
                  <h4 className="font-semibold text-neutral-900">Self check-in</h4>
                  <p className="text-sm text-neutral-500">Check yourself in with the smart lock.</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="pt-6">
              <h3 className="text-lg font-bold text-neutral-900 mb-3">About this space</h3>
              <p className="text-neutral-700 leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Amenities Grid */}
            <div className="pt-6">
              <h3 className="text-lg font-bold text-neutral-900 mb-4">What this place offers</h3>
              <div className="grid grid-cols-2 gap-4 text-neutral-700">
                <div className="flex items-center gap-3"><Wifi className="h-5 w-5" /> High-speed Wi-Fi</div>
                <div className="flex items-center gap-3"><Tv className="h-5 w-5" /> 65" 4K Smart TV</div>
                <div className="flex items-center gap-3"><Car className="h-5 w-5" /> Free dedicated parking</div>
                <div className="flex items-center gap-3"><Utensils className="h-5 w-5" /> Fully-equipped kitchen</div>
                <div className="flex items-center gap-3"><Wind className="h-5 w-5" /> Central AC & Climate Control</div>
                <div className="flex items-center gap-3"><MapPin className="h-5 w-5" /> Waterfront & Beach access</div>
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Booking Widget (4 / 12 cols = 35%) */}
          <div className="lg:col-span-4">
            {bookingSuccess && (
              <div className="mb-4 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-800 text-sm font-semibold">
                ✓ Reservation confirmed! Check your trips for details.
              </div>
            )}
            <BookingWidget
              listingId={property.id}
              pricePerNight={property.pricePerNight}
              rating={property.rating}
              maxGuests={property.maxGuests}
              cleaningFee={property.cleaningFee}
              onReserve={handleReserve}
            />
          </div>

        </div>

      </main>
    </div>
  );
}
