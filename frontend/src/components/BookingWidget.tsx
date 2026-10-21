import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface BookingWidgetProps {
  listingId: string;
  pricePerNight: number;
  rating: number;
  maxGuests: number;
  cleaningFee?: number;
  onReserve: (data: { checkIn: string; checkOut: string; guests: number }) => void;
}

export const BookingWidget: React.FC<BookingWidgetProps> = ({
  pricePerNight,
  rating,
  maxGuests,
  cleaningFee = 50,
  onReserve,
}) => {
  const [checkIn, setCheckIn] = useState('2026-11-01');
  const [checkOut, setCheckOut] = useState('2026-11-06');
  const [guests, setGuests] = useState(2);

  const nights = 5;
  const baseTotal = pricePerNight * nights;
  const serviceFee = Math.round(baseTotal * 0.14);
  const total = baseTotal + cleaningFee + serviceFee;

  return (
    <div className="sticky top-28 rounded-2xl border border-neutral-200 bg-white p-6 shadow-xl">
      <div className="flex items-baseline justify-between">
        <div>
          <span className="text-2xl font-bold">${pricePerNight}</span>
          <span className="text-sm text-neutral-500"> / night</span>
        </div>
        <div className="flex items-center gap-1 text-sm font-semibold">
          <Star className="h-4 w-4 fill-neutral-900" />
          <span>{rating.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-neutral-300 divide-y divide-neutral-300 overflow-hidden">
        <div className="grid grid-cols-2 divide-x divide-neutral-300">
          <div className="p-3">
            <label className="block text-[10px] font-bold uppercase text-neutral-700">Check-in</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full text-xs font-medium focus:outline-none"
            />
          </div>
          <div className="p-3">
            <label className="block text-[10px] font-bold uppercase text-neutral-700">Checkout</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full text-xs font-medium focus:outline-none"
            />
          </div>
        </div>
        <div className="p-3">
          <label className="block text-[10px] font-bold uppercase text-neutral-700">Guests</label>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full text-sm font-medium focus:outline-none bg-transparent"
          >
            {Array.from({ length: maxGuests }, (_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1} guest{i > 0 ? 's' : ''}</option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={() => onReserve({ checkIn, checkOut, guests })}
        className="mt-4 w-full rounded-xl bg-gradient-to-r from-rose-600 to-pink-500 py-3.5 font-semibold text-white shadow-lg hover:opacity-95 active:scale-[0.98] transition-all"
      >
        Reserve
      </button>

      <div className="mt-6 space-y-3 text-sm text-neutral-600">
        <div className="flex justify-between">
          <span>${pricePerNight} x {nights} nights</span>
          <span>${baseTotal}</span>
        </div>
        <div className="flex justify-between">
          <span>Cleaning fee</span>
          <span>${cleaningFee}</span>
        </div>
        <div className="flex justify-between">
          <span>StayHub service fee</span>
          <span>${serviceFee}</span>
        </div>
        <div className="border-t border-neutral-200 pt-3 flex justify-between font-bold text-neutral-900 text-base">
          <span>Total</span>
          <span>${total}</span>
        </div>
      </div>
    </div>
  );
};
