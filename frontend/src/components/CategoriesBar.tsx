import React, { useState } from 'react';
import { Flame, Waves, Trees, Sparkles, Castle, Palmtree, Mountain, Building2 } from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'All Stays', icon: Flame },
  { id: 'beachfront', label: 'Beachfront', icon: Waves },
  { id: 'cabins', label: 'Cabins', icon: Trees },
  { id: 'luxury', label: 'Luxe', icon: Sparkles },
  { id: 'mansions', label: 'Mansions', icon: Castle },
  { id: 'tropical', label: 'Tropical', icon: Palmtree },
  { id: 'countryside', label: 'Countryside', icon: Mountain },
  { id: 'cities', label: 'Iconic Cities', icon: Building2 },
];

interface CategoriesBarProps {
  onSelectCategory?: (category: string) => void;
}

export const CategoriesBar: React.FC<CategoriesBarProps> = ({ onSelectCategory }) => {
  const [selected, setSelected] = useState('all');

  const handleSelect = (id: string) => {
    setSelected(id);
    if (onSelectCategory) onSelectCategory(id);
  };

  return (
    <div className="sticky top-[73px] z-30 bg-white/95 backdrop-blur-md border-b border-neutral-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8 overflow-x-auto py-4 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selected === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => handleSelect(cat.id)}
                className={`flex flex-col items-center gap-2 border-b-2 pb-2 transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'border-neutral-900 text-neutral-950 font-semibold'
                    : 'border-transparent text-neutral-500 hover:border-neutral-300 hover:text-neutral-800'
                }`}
              >
                <Icon className={`h-6 w-6 ${isSelected ? 'stroke-[2.2] text-neutral-950' : 'text-neutral-500'}`} />
                <span className="text-xs">{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};