import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, MessageCircle, SlidersHorizontal, X } from 'lucide-react';
import { PageLayout } from '@/components/PageLayout';
import { PartCard } from '@/components/PartCard';
import { SectionHeading } from '@/components/SectionHeading';
import { parts, partCategories } from '@/data/sampleData';
import { brands } from '@/data/sampleData';
import { buildWhatsAppLink, getWhatsAppMessageGeneral } from '@/utils/contact';

export function PartsListingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || '';

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(initialCategory);
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [availability, setAvailability] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setCategory(searchParams.get('category') || '');
  }, [searchParams]);

  const allModels = useMemo(() => {
    const models = new Set<string>();
    parts.forEach((p) => p.modelCompatibility.forEach((m) => models.add(m)));
    return Array.from(models).sort();
  }, []);

  const filtered = useMemo(() => {
    return parts.filter((p) => {
      if (search) {
        const q = search.toLowerCase();
        const match =
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.modelCompatibility.some((m) => m.toLowerCase().includes(q));
        if (!match) return false;
      }
      if (category && p.category !== category) return false;
      if (brand && p.brand !== brand) return false;
      if (model && !p.modelCompatibility.includes(model)) return false;
      if (availability && p.availability !== availability) return false;
      return true;
    });
  }, [search, category, brand, model, availability]);

  const clearFilters = () => {
    setCategory('');
    setBrand('');
    setModel('');
    setAvailability('');
    setSearch('');
    setSearchParams({});
  };

  const activeFilters = [category, brand, model, availability].filter(Boolean).length;

  const FilterContent = () => (
    <div className="space-y-5">
      <div>
        <label className="block text-xs font-medium text-muted mb-2 uppercase tracking-wide">Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-3 bg-ink border border-ink-border text-cream text-sm rounded focus:border-gold/50 focus:outline-none transition-colors">
          <option value="">All Categories</option>
          {partCategories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-xs font-medium text-muted mb-2 uppercase tracking-wide">Brand</label>
        <select value={brand} onChange={(e) => setBrand(e.target.value)}
          className="w-full px-4 py-3 bg-ink border border-ink-border text-cream text-sm rounded focus:border-gold/50 focus:outline-none transition-colors">
          <option value="">All Brands</option>
          {brands.map((b) => <option key={b} value={b}>{b}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-xs font-medium text-muted mb-2 uppercase tracking-wide">Tractor Model</label>
        <select value={model} onChange={(e) => setModel(e.target.value)}
          className="w-full px-4 py-3 bg-ink border border-ink-border text-cream text-sm rounded focus:border-gold/50 focus:outline-none transition-colors">
          <option value="">All Models</option>
          {allModels.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-xs font-medium text-muted mb-2 uppercase tracking-wide">Availability</label>
        <select value={availability} onChange={(e) => setAvailability(e.target.value)}
          className="w-full px-4 py-3 bg-ink border border-ink-border text-cream text-sm rounded focus:border-gold/50 focus:outline-none transition-colors">
          <option value="">All</option>
          <option value="In Stock">In Stock</option>
          <option value="Contact for Price">Contact for Price</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
      </div>
      {activeFilters > 0 && (
        <button onClick={clearFilters} className="w-full px-4 py-2.5 text-sm text-muted hover:text-gold transition-colors text-center border border-ink-border rounded">
          Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <PageLayout>
      <div className="container-x py-8 lg:py-12">
        {/* Header */}
        <div className="mb-8">
          <SectionHeading
            eyebrow="Browse Parts"
            title="Tractor Parts"
            subtitle="Browse our available tractor parts and enquire directly."
            center={false}
          />
        </div>

        {/* Search bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search parts, brands or tractor models..."
              className="w-full pl-12 pr-4 py-3.5 bg-ink-card border border-ink-border text-cream text-sm rounded-lg focus:border-gold/50 focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div className="flex gap-6">
          {/* Desktop Filters */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 bg-ink-card border border-ink-border rounded-lg p-5">
              <div className="flex items-center gap-2 mb-5">
                <SlidersHorizontal className="w-4 h-4 text-gold" />
                <h3 className="font-display font-semibold text-sm text-cream uppercase">Filters</h3>
              </div>
              <FilterContent />
            </div>
          </aside>

          {/* Mobile Filter Button */}
          <div className="lg:hidden fixed right-4 bottom-20 z-30">
            <button
              onClick={() => setShowFilters(true)}
              className="flex items-center gap-2 px-4 py-3 bg-gold text-ink text-sm font-bold rounded-full shadow-lg"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters {activeFilters > 0 && `(${activeFilters})`}
            </button>
          </div>

          {/* Mobile Filter Sheet */}
          {showFilters && (
            <div className="lg:hidden fixed inset-0 z-50">
              <div className="absolute inset-0 bg-ink/80 backdrop-blur-sm" onClick={() => setShowFilters(false)} />
              <div className="absolute bottom-0 left-0 right-0 bg-ink-secondary border-t border-ink-border rounded-t-2xl max-h-[80vh] overflow-y-auto">
                <div className="sticky top-0 bg-ink-secondary flex items-center justify-between p-4 border-b border-ink-border">
                  <h3 className="font-display font-semibold text-base text-cream uppercase">Filters</h3>
                  <button onClick={() => setShowFilters(false)} className="text-muted hover:text-cream">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-4">
                  <FilterContent />
                  <button
                    onClick={() => setShowFilters(false)}
                    className="w-full mt-5 px-4 py-3 bg-gold text-ink text-sm font-bold rounded"
                  >
                    Show {filtered.length} Results
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted">
                {filtered.length} {filtered.length === 1 ? 'part' : 'parts'} found
              </p>
            </div>
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-5">
                {filtered.map((part) => (
                  <PartCard key={part.id} part={part} />
                ))}
              </div>
            ) : (
              <div className="bg-ink-card border border-ink-border rounded-lg p-12 text-center">
                <p className="text-cream text-lg font-display font-semibold mb-2">No results found</p>
                <p className="text-muted text-sm mb-6">
                  Can't find what you're looking for? WhatsApp us.
                </p>
                <a
                  href={buildWhatsAppLink(getWhatsAppMessageGeneral())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-[#25D366] text-white text-sm font-semibold rounded hover:bg-[#22c35e] transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Us
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
