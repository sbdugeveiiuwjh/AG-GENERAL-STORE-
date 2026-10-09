import React, { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, RotateCcw, MessageCircle, Heart, X, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { getWhatsAppUrl } from '../utils/whatsapp';
import { VoiceSearch } from './VoiceSearch';
import { matchesProductSearch } from '../utils/searchUtils';

export const ProductCatalog: React.FC = () => {
  const {
    products,
    categories,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    onlyInStock,
    setOnlyInStock,
    storeSettings,
    wishlist
  } = useStore();

  const [onlyFavorites, setOnlyFavorites] = useState(false);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Favorites filter
    if (onlyFavorites) {
      result = result.filter(p => wishlist.includes(p.id));
    }

    // Availability filter
    if (onlyInStock) {
      result = result.filter(p => p.inStock);
    }

    // Search query in Hindi, English & Hinglish
    if (searchQuery.trim()) {
      // Global search across all products when search term is provided
      result = result.filter(p => matchesProductSearch(p, searchQuery, categories));
    }

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => {
        const priceA = a.variants[0]?.price || 0;
        const priceB = b.variants[0]?.price || 0;
        return priceA - priceB;
      });
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => {
        const priceA = a.variants[0]?.price || 0;
        const priceB = b.variants[0]?.price || 0;
        return priceB - priceA;
      });
    } else if (sortBy === 'name-asc') {
      result.sort((a, b) => a.nameHi.localeCompare(b.nameHi));
    }

    return result;
  }, [products, categories, onlyInStock, onlyFavorites, wishlist, searchQuery, sortBy]);

  const resetAllFilters = () => {
    setSearchQuery('');
    setOnlyInStock(false);
    setOnlyFavorites(false);
    setSortBy('featured');
  };

  const directInquiryUrl = getWhatsAppUrl(
    storeSettings.whatsappNumber,
    `Namaste ${storeSettings.storeName}! मुझे इस सामान के बारे में पूछना है: "${searchQuery}"। क्या यह उपलब्ध है?`
  );

  return (
    <section id="products" className="py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Title */}
        <div className="mb-6">
          <div className="text-xs font-bold text-[#1769E0] tracking-wider uppercase mb-1">
            दुकान की सूची · Our Grocery Inventory
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            किराना सामान एवं भाव (Products & Rates)
          </h2>
          <p className="text-sm text-slate-500 font-devanagari mt-1">
            {onlyFavorites
              ? `दिखाया जा रहा है: आपके पसंदीदा सामान (${filteredProducts.length} Items)`
              : 'सभी आवश्यक किराना उत्पाद, मसाले, दालें, तेल और दैनिक घरेलू सामान'}
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4 mb-8">
          {/* Top Row: Search input + Voice + Stock toggle + Sort */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-5 relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="catalog-search-input"
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="सर्च करें (उदा: धनिया, जीरा, चावल, Sugar)..."
                className="w-full pl-10 pr-16 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1769E0] transition-all"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-xs text-slate-400 hover:text-slate-600 bg-slate-200 rounded-full w-4 h-4 flex items-center justify-center"
                  >
                    ✕
                  </button>
                )}
                <VoiceSearch onTranscript={text => setSearchQuery(text)} />
              </div>
            </div>

            {/* Sort Options */}
            <div className="md:col-span-3">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1769E0]"
              >
                <option value="featured">क्रम: मुख्य उत्पाद (Featured)</option>
                <option value="price-asc">कीमत: कम से ज्यादा (Price: Low to High)</option>
                <option value="price-desc">कीमत: ज्यादा से कम (Price: High to Low)</option>
                <option value="name-asc">नाम: अ से ज्ञ (Name: A to Z)</option>
              </select>
            </div>

            {/* Stock & Favorites Toggles */}
            <div className="md:col-span-4 flex flex-wrap items-center justify-between md:justify-end gap-2.5">
              <label className="flex items-center gap-1.5 cursor-pointer select-none text-xs sm:text-sm font-medium text-slate-700">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={e => setOnlyInStock(e.target.checked)}
                  className="w-4 h-4 text-[#1769E0] rounded border-slate-300 focus:ring-[#1769E0]"
                />
                <span>केवल उपलब्ध (In Stock)</span>
              </label>

              <button
                type="button"
                onClick={() => setOnlyFavorites(!onlyFavorites)}
                className={`text-xs px-2.5 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1 ${
                  onlyFavorites
                    ? 'bg-rose-500 text-white shadow-xs'
                    : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-white' : 'fill-rose-500'}`} />
                <span>पसंदीदा ({wishlist.length})</span>
              </button>

              {(searchQuery || onlyInStock || onlyFavorites || sortBy !== 'featured') && (
                <button
                  onClick={resetAllFilters}
                  className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1 font-semibold ml-1"
                  title="Reset all filters"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>रीसेट</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Counter */}
        {/* Search Results Banner */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>कुल <b>{filteredProducts.length}</b> उत्पाद उपलब्ध</span>
          </span>
          {searchQuery && (
            <div className="flex items-center gap-2">
              <span className="bg-blue-100 text-[#1769E0] px-2.5 py-1 rounded-lg font-bold">
                खोज परिणाम: "{searchQuery}" ({filteredProducts.length} मिले)
              </span>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-slate-500 hover:text-slate-800 bg-white border border-slate-300 px-2 py-1 rounded-lg font-semibold flex items-center gap-1 hover:bg-slate-100 transition-colors"
              >
                <X className="w-3 h-3" />
                <span>हटाएं</span>
              </button>
            </div>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty Search / Filter State with Suggested Tags */
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 text-center max-w-lg mx-auto space-y-4 shadow-xs">
            <div className="w-16 h-16 bg-blue-50 text-[#1769E0] rounded-full flex items-center justify-center mx-auto">
              <Search className="w-8 h-8 text-blue-500" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">
                "{searchQuery}" नाम से कोई सामान नहीं मिला
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-devanagari mt-1">
                कृपया नीचे दिए गए लोकप्रिय सामान में से किसी पर क्लिक करके खोजें या WhatsApp पर पूछें:
              </p>
            </div>

            {/* Quick Suggested Tags */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
              {[
                'धनिया',
                'जीरा',
                'चावल',
                'चीनी',
                'दालें',
                'सरसों तेल',
                'आटा',
                'हल्दी',
                'नमक',
                'चाय',
                'बिस्कुट',
                'साबुन',
                'बेसन'
              ].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSearchQuery(tag)}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-50 hover:bg-blue-100 text-[#1769E0] border border-blue-200 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
              <button
                onClick={resetAllFilters}
                className="py-2 px-4 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              >
                सारे फिल्टर हटाएं (Reset Filters)
              </button>
              {searchQuery && (
                <a
                  href={directInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-4 rounded-xl text-xs font-semibold bg-[#16A34A] hover:bg-emerald-700 text-white flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white text-transparent" />
                  <span>दुकानदार से WhatsApp पर पूछें</span>
                </a>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
