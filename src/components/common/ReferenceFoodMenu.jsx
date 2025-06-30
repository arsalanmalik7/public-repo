import React, { useState, useEffect } from 'react';
import { X, Search } from 'lucide-react';

const ReferenceFoodMenuPanel = ({ isOpen, onClose, menuData }) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    console.log('ReferenceFoodMenu - menuData changed:', menuData);
  }, [menuData]);

  // Transform menu data into sections
  const menuSections = React.useMemo(() => {
    console.log('Processing menu data:', menuData);
    if (!menuData?.dishes) {
      console.log('No dishes found in menu data');
      return {};
    }

    return menuData.dishes.reduce((acc, dish) => {
      console.log('Processing dish:', dish);
      if (!dish?.dish_uuid?.type?.[0]) {
        console.log('Invalid dish data:', dish);
        return acc;
      }

      const type = dish.dish_uuid.type[0];
      if (!acc[type]) {
        acc[type] = [];
      }

      acc[type].push({
        name: dish.dish_uuid.name,
        price: `$${dish.dish_uuid.price}`,
        description: dish.dish_uuid.description,
        badges: [
          ...(dish.dish_uuid.allergens || []).map(allergen => ({
            label: allergen,
            color: 'bg-[#FFF3E0] text-[#FF9800] border border-[#FF9800]'
          })),
          ...(dish.dish_uuid.dietary_restrictions || []).map(restriction => ({
            label: restriction,
            color: 'bg-[#E6F4EA] text-[#1B5E20] border border-[#1B5E20]'
          }))
        ],
        note: dish.dish_uuid.substitution_notes || null
      });
      return acc;
    }, {});
  }, [menuData]);

  console.log('Transformed menuSections:', menuSections);

  // Convert sections object to array format
  const formattedMenu = React.useMemo(() => 
    Object.entries(menuSections || {}).map(([section, items]) => ({
      section,
      items
    })), [menuSections]);

  console.log('Formatted menu:', formattedMenu);

  // Filter menu by search
  const filteredMenu = React.useMemo(() => 
    formattedMenu.map(section => ({
      ...section,
      items: section.items.filter(item => {
        const searchLower = search.toLowerCase();
        return (
          item.name.toLowerCase().includes(searchLower) ||
          item.description.toLowerCase().includes(searchLower) ||
          item.badges.some(b => b.label.toLowerCase().includes(searchLower))
        );
      })
    })).filter(section => section.items.length > 0), [formattedMenu, search]);

  console.log('Filtered menu:', filteredMenu);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-y-0 right-0 w-full sm:max-w-sm md:max-w-sm lg:max-w-sm bg-white shadow-lg z-[200] transition-transform duration-300 ease-in-out flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-3 border-b border-gray-200">
        <h2 className="text-base text-left font-semibold text-black">Reference Menu</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-red-500 p-1 rounded-full">
          <X size={20} />
        </button>
      </div>
      {/* Search Bar */}
      <div className="px-3 sm:px-4 pb-2 pt-3">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#C1121F]" />
          <input
            type="text"
            placeholder="Search dishes or ingredients..."
            className="w-full pl-9 pr-3 py-2 rounded-md bg-background text-black text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-[#FFD6A0]"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>
      {/* Menu Sections */}
      <div className="flex-1 overflow-y-auto px-3 sm:px-4 pt-2 pb-4 space-y-6">
        {filteredMenu.length === 0 && (
          <div className="text-center text-gray-500 text-sm mt-8">
            {search ? `No results found for "${search}"` : 'No menu items available'}
          </div>
        )}
        {filteredMenu.map(section => (
          <div key={section.section}>
            <h3 className="text-sm text-left font-semibold text-black mb-3">{section.section}</h3>
            <div className="space-y-4">
              {section.items.map(item => (
                <div key={item.name} className="w-full bg-background rounded-lg px-3 sm:px-4 py-3 flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-black text-base sm:text-base md:text-lg">{item.name}</span>
                    <span className="text-black text-sm font-semibold">{item.price}</span>
                  </div>
                  <div className="text-gray-700 text-sm mb-1">{item.description}</div>
                  {item.note && <div className="text-xs text-[#C1121F] font-medium">{item.note}</div>}
                  <div className="flex flex-wrap gap-2 mt-1">
                    {item.badges.map(badge => (
                      <span key={badge.label} className={`px-2 py-0.5 rounded text-xs font-medium ${badge.color}`}>{badge.label}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReferenceFoodMenuPanel; 