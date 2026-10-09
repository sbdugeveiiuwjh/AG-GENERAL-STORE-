import React from 'react';
import { Sparkles, ChevronRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';

export const PopularCarousel: React.FC = () => {
  const { products, setSelectedCategory } = useStore();

  const popularProducts = products.filter(p => p.isPopular).slice(0, 6);

  if (popularProducts.length === 0) return null;

  return (
    <section className="py-10 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>सबसे ज्यादा बिकने वाला राशन</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Popular Grocery Products
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-devanagari mt-0.5">
              भटनी बाजार के ग्राहकों द्वारा दैनिक रूप से सबसे अधिक खरीदे जाने वाले जरूरी उत्पाद
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedCategory('all');
              const el = document.getElementById('products');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-xs sm:text-sm font-semibold text-[#1769E0] hover:text-blue-800 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>सभी सामान देखें</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Carousel / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {popularProducts.map(prod => (
            <ProductCard key={`popular-${prod.id}`} product={prod} />
          ))}
        </div>

      </div>
    </section>
  );
};
