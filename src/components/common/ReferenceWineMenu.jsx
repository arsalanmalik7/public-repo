import React, { useState } from 'react';
import { X, Search } from 'lucide-react';
import Card from './card';
import Badge from './badge';

const ReferenceMenuPanel = ({
  isOpen,
  onClose,
  menuData
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  console.log('Raw wine menuData:', menuData);

  // Transform wine data
  const wineData = menuData?.menu?.[0]?.wines?.map(wine => {
    console.log('Processing wine:', wine);
    return {
      name: wine.wine_uuid.product_name,
      year: wine.wine_uuid.vintage.toString(),
      varietals: wine.wine_uuid.varietals.join(', '),
      region: `${wine.wine_uuid.region.country} → ${wine.wine_uuid.region.state} → ${wine.wine_uuid.region.appellation}`,
      category: wine.wine_uuid.category,
      style: wine.wine_uuid.sub_category,
      body: wine.wine_uuid.style.body || 'N/A',
      texture: wine.wine_uuid.style.acidity || 'N/A',
      flavorIntensity: wine.wine_uuid.style.tannin || 'N/A',
      price: { glass: 'N/A', bottle: 'N/A' }, // Add price if available in your data
      tags: [
        ...(wine.wine_uuid.is_organic ? ['Organic'] : []),
        ...(wine.wine_uuid.is_biodynamic ? ['Biodynamic'] : []),
        ...(wine.wine_uuid.is_vegan ? ['Vegan'] : []),
        ...(wine.wine_uuid.is_filtered ? ['Filtered'] : []),
        ...(wine.wine_uuid.has_residual_sugar ? ['Residual Sugar'] : [])
      ],
    };
  }) || [];

  console.log('Transformed wineData:', wineData);

  const filteredWineData = wineData.filter(wine =>
    wine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    wine.varietals.toLowerCase().includes(searchTerm.toLowerCase()) ||
    wine.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
    wine.style.toLowerCase().includes(searchTerm.toLowerCase()) ||
    wine.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  console.log('Filtered wineData:', filteredWineData);

  const whiteWines = filteredWineData.filter(wine => 
    wine.category.toLowerCase().includes('white') || 
    wine.category.toLowerCase().includes('orange')
  );
  const redWines = filteredWineData.filter(wine => 
    wine.category.toLowerCase().includes('red')
  );

  console.log('White wines:', whiteWines);
  console.log('Red wines:', redWines);

  return (
    <div className={`fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-lg z-[102] transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <h2 className="text-lg font-bold text-black">Reference Menu</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-red-500 p-1 rounded-full">
          <X size={22} />
        </button>
      </div>
      <div className="p-4 overflow-y-auto h-[calc(100%-64px)]">
        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search menu items..."
              className="w-full pl-10 pr-4 py-2 rounded-md bg-background border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#e11d48] text-black text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* White Wines */}
        {whiteWines.length > 0 && (
          <div className="mb-6">
            <h3 className="text-md text-left font-semibold text-black mb-3">White Wines</h3>
            <div className="space-y-4">
              {whiteWines.map(wine => (
                <Card key={wine.name} className="p-4 bg-background border border-gray-300 rounded-lg">
                  <div className="text-base text-black text-left">
                    <div className="font-semibold text-base">{wine.name}</div>
                    <div className="text-gray-700 mt-0.5 text-sm">{wine.year}</div>
                    <div className="mt-2"><span className="font-medium">Varietals:</span> {wine.varietals}</div>
                    <div><span className="font-medium">Region:</span> {wine.region}</div>
                    <div><span className="font-medium">Category:</span> {wine.category}</div>
                    <div><span className="font-medium">Style:</span> {wine.style}</div>
                    <div><span className="font-medium">Body:</span> {wine.body}</div>
                    <div><span className="font-medium">Texture:</span> {wine.texture}</div>
                    <div><span className="font-medium">Flavor Intensity:</span> {wine.flavorIntensity}</div>
                    <div className="mt-2"><span className="font-medium">Price:</span></div>
                    <div className="ml-2 text-sm">
                      {wine.price.glass !== 'N/A' && <div><span className="font-medium">By Glass:</span> {wine.price.glass}</div>}
                      <div><span className="font-medium">By Bottle:</span> {wine.price.bottle}</div>
                    </div>
                    {wine.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {wine.tags.map(tag => <Badge key={tag} className="bg-gray-200 text-black text-xs px-2 py-0.5 font-medium rounded">{tag}</Badge>)}
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Red Wines */}
        {redWines.length > 0 && (
          <div className="mb-6">
            <h3 className="text-md text-left font-semibold text-black mb-3">Red Wines</h3>
            <div className="space-y-4">
              {redWines.map(wine => (
                <Card key={wine.name} className="p-4 bg-background border border-gray-300 rounded-lg">
                  <div className="text-base text-black text-left">
                    <div className="font-semibold text-base">{wine.name}</div>
                    <div className="text-gray-700 mt-0.5 text-sm">{wine.year}</div>
                    <div className="mt-2"><span className="font-medium">Varietals:</span> {wine.varietals}</div>
                    <div><span className="font-medium">Region:</span> {wine.region}</div>
                    <div><span className="font-medium">Category:</span> {wine.category}</div>
                    <div><span className="font-medium">Style:</span> {wine.style}</div>
                    <div><span className="font-medium">Body:</span> {wine.body}</div>
                    <div><span className="font-medium">Texture:</span> {wine.texture}</div>
                    <div><span className="font-medium">Flavor Intensity:</span> {wine.flavorIntensity}</div>
                    <div className="mt-2"><span className="font-medium">Price:</span></div>
                    <div className="ml-2 text-sm">
                      {wine.price.glass !== 'N/A' && <div><span className="font-medium">By Glass:</span> {wine.price.glass}</div>}
                      <div><span className="font-medium">By Bottle:</span> {wine.price.bottle}</div>
                    </div>
                    {wine.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {wine.tags.map(tag => <Badge key={tag} className="bg-gray-200 text-black text-xs px-2 py-0.5 font-medium rounded">{tag}</Badge>)}
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {filteredWineData.length === 0 && (
          <div className="text-center text-gray-600 mt-8">
            {searchTerm ? `No results found for "${searchTerm}"` : 'No wine items available'}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReferenceMenuPanel; 