import React, { useState } from 'react';
import { Search, Globe, Menu, User, Compass } from 'lucide-react';

export const Header: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-rose-600 to-pink-500 text-white shadow-md">
            <Compass className="h-6 w-6 stroke-[2.2]" />
          </div>
          <span className="text-xl font-bold tracking-tight text-neutral-900">
            Stay<span className="text-rose-600">Hub</span>
          </span>
        </div>

        {/* Floating Search Pill */}
        <div className="hidden md:flex items-center rounded-full border border-neutral-300 py-2 pl-6 pr-2 shadow-sm hover:shadow-md transition-shadow divide-x divide-neutral-200">
          <button className="text-sm font-semibold pr-4 text-neutral-800">Anywhere</button>
          <button className="text-sm font-semibold px-4 text-neutral-800">Any week</button>
          <div className="flex items-center gap-3 pl-4">
            <span className="text-sm text-neutral-500">Add guests</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-500 text-white">
              <Search className="h-4 w-4 stroke-[2.5]" />
            </div>
          </div>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-block text-sm font-semibold text-neutral-700 hover:bg-neutral-100 rounded-full px-3 py-2 cursor-pointer">
            Become a Host
          </span>
          <button className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-full">
            <Globe className="h-4 w-4" />
          </button>
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-3 rounded-full border border-neutral-300 p-1.5 pl-3 hover:shadow-md"
            >
              <Menu className="h-4 w-4 text-neutral-700" />
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-600 text-white">
                <User className="h-4 w-4" />
              </div>
            </button>
          </div>
        </div>

      </div>
    </header>
  );
};
