import { useState } from 'react';
import { galleryItems, galleryCategories } from '@/data/sampleData';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const ref = useScrollReveal<HTMLDivElement>();

  const filtered =
    activeCategory === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <div ref={ref}>
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8 reveal">
        {galleryCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 text-sm font-medium rounded transition-all ${
              activeCategory === cat
                ? 'bg-gold text-ink'
                : 'bg-ink-card border border-ink-border text-muted hover:text-cream hover:border-gold/30'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4 reveal-stagger">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="group relative aspect-square rounded-lg overflow-hidden bg-ink-card border border-ink-border hover:border-gold/30 transition-all duration-300"
          >
            <img
              src={item.image}
              alt={item.caption}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-xs text-cream font-medium">{item.caption}</p>
              <p className="text-[10px] text-gold mt-0.5">{item.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
