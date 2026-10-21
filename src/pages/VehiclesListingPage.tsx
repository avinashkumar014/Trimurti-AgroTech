import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X, MessageCircle, ArrowDownUp } from 'lucide-react';
import { PageLayout } from '@/components/PageLayout';
import { VehicleCard } from '@/components/VehicleCard';
import { SectionHeading } from '@/components/SectionHeading';
import { vehicles, brands } from '@/data/sampleData';
import { buildWhatsAppLink, getWhatsAppMessageGeneral } from '@/utils/contact';

const vehicleTypes = ['Tractor', 'Agricultural Vehicle', 'Commercial Vehicle', 'Other'];
const conditions = ['Excellent', 'Good', 'Fair'];
const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
];

export function VehiclesListingPage() {
  const [search, setSearch] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [year, setYear] = useState('');
  const [condition, setCondition] = useState('');
  const [location, setLocation] = useState('');
  const [sort, setSort] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  const allModels = useMemo(() => {
    const models = new Set<string>();
    vehicles.forEach((v) => models.add(v.model));
    return Array.from(models).sort();
  }, []);

  const allLocations = useMemo(() => {
    const locs = new Set(vehicles.map((v) => v.location));
    return Array.from(locs).sort();
  }, []);

  const allYears = useMemo(() => {
    const years = new Set(vehicles.map((v) => v.year));
    return Array.from(years).sort((a, b) => b - a);
  }, []);

  const priceRanges = [
    { label: 'Under ₹3,00,000', min: 0, max: 300000 },
    { label: '₹3,00,000 – ₹5,00,000', min: 300000, max: 500000 },
    { label: '₹5,00,000 – ₹7,00,000', min: 500000, max: 700000 },
    { label: 'Above ₹7,00,000', min: 700000, max: 99999999 },
  ];

  const filtered = useMemo(() => {
    let result = vehicles.filter((v) => {
      if (search) {
        const q = search.toLowerCase();
        const match =
          v.brand.toLowerCase().includes(q) ||
          v.model.toLowerCase().includes(q) ||
          v.vehicleType.toLowerCase().includes(q);
        if (!match) return false;
      }
      if (vehicleType && v.vehicleType !== vehicleType) return false;
      if (brand && v.brand !== brand) return false;
      if (model && v.model !== model) return false;
      if (condition && v.condition !== condition) return false;
      if (location && v.location !== location) return false;
      if (year && v.year !== parseInt(year)) return false;
      if (priceRange) {
        const range = priceRanges.find((r) => r.label === priceRange);
        if (range && (v.price < range.min || v.price >= range.max)) return false;
      }
      return true;
    });

    result = [...result].sort((a, b) => {
      if (sort === 'price-low') return a.price - b.price;
      if (sort === 'price-high') return b.price - a.price;
      return b.year - a.year;
    });

    return result;
  }, [search, vehicleType, brand, model, condition, location, year, priceRange, sort]);

  const clearFilters = () => {
    setVehicleType(''); setBrand(''); setModel(''); setPriceRange('');
    setYear(''); setCondition(''); setLocation(''); setSearch('');
  };

  const activeFilters = [vehicleType, brand, model, priceRange, year, condition, location].filter(Boolean).length;

  const FilterContent = () => (
    <div className="space-y-5">
      <div>
        <label className="block text-xs font-medium text-muted mb-2 uppercase tracking-wide">Vehicle Type</label>
        <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}
          className="w-full px-4 py-3 bg-ink border border-ink-border text-cream text-sm rounded focus:border-gold/50 focus:outline-none transition-colors">
          <option value="">All Types</option>
          {vehicleTypes.map((t) => <option key={t} value={t}>{t}</option>)}
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
        <label className="block text-xs font-medium text-muted mb-2 uppercase tracking-wide">Model</label>
        <select value={model} onChange={(e) => setModel(e.target.value)}
          className="w-full px-4 py-3 bg-ink border border-ink-border text-cream text-sm rounded focus:border-gold/50 focus:outline-none transition-colors">
          <option value="">All Models</option>
          {allModels.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-xs font-medium text-muted mb-2 uppercase tracking-wide">Price Range</label>
        <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}
          className="w-full px-4 py-3 bg-ink border border-ink-border text-cream text-sm rounded focus:border-gold/50 focus:outline-none transition-colors">
          <option value="">Any Price</option>
          {priceRanges.map((r) => <option key={r.label} value={r.label}>{r.label}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-xs font-medium text-muted mb-2 uppercase tracking-wide">Year</label>
        <select value={year} onChange={(e) => setYear(e.target.value)}
          className="w-full px-4 py-3 bg-ink border border-ink-border text-cream text-sm rounded focus:border-gold/50 focus:outline-none transition-colors">
          <option value="">All Years</option>
          {allYears.map((y) => <option key={y} value={y}>{y}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-xs font-medium text-muted mb-2 uppercase tracking-wide">Condition</label>
        <select value={condition} onChange={(e) => setCondition(e.target.value)}
          className="w-full px-4 py-3 bg-ink border border-ink-border text-cream text-sm rounded focus:border-gold/50 focus:outline-none transition-colors">
          <option value="">Any Condition</option>
          {conditions.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-xs font-medium text-muted mb-2 uppercase tracking-wide">Location</label>
        <select value={location} onChange={(e) => setLocation(e.target.value)}
          className="w-full px-4 py-3 bg-ink border border-ink-border text-cream text-sm rounded focus:border-gold/50 focus:outline-none transition-colors">
          <option value="">All Locations</option>
          {allLocations.map((l) => <option key={l} value={l}>{l}</option>)}
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
        <div className="mb-8">
          <SectionHeading
            eyebrow="Browse Inventory"
            title="Used Vehicles"
            subtitle="Explore available tractors and agricultural vehicles."
            center={false}
          />
        </div>

        {/* Search + Sort */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tractors, brands or models..."
              className="w-full pl-12 pr-4 py-3.5 bg-ink-card border border-ink-border text-cream text-sm rounded-lg focus:border-gold/50 focus:outline-none transition-colors"
            />
          </div>
          <div className="relative">
            <ArrowDownUp className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="pl-10 pr-8 py-3.5 bg-ink-card border border-ink-border text-cream text-sm rounded-lg focus:border-gold/50 focus:outline-none transition-colors appearance-none cursor-pointer"
            >
              {sortOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
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
            <p className="text-sm text-muted mb-4">
              {filtered.length} {filtered.length === 1 ? 'vehicle' : 'vehicles'} found
            </p>
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-5">
                {filtered.map((v) => (
                  <VehicleCard key={v.id} vehicle={v} />
                ))}
              </div>
            ) : (
              <div className="bg-ink-card border border-ink-border rounded-lg p-12 text-center">
                <p className="text-cream text-lg font-display font-semibold mb-2">No vehicles found</p>
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
