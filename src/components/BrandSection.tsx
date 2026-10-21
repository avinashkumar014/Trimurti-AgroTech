import { brands } from '@/data/sampleData';

export function BrandSection() {
  return (
    <div className="reveal-stagger flex flex-wrap items-center justify-center gap-3 lg:gap-4">
      {brands.map((brand) => (
        <div
          key={brand}
          className="px-5 py-3 bg-ink-card border border-ink-border rounded-lg text-cream font-display font-semibold text-sm lg:text-base hover:border-gold/30 hover:text-gold transition-all duration-300 cursor-default"
        >
          {brand}
        </div>
      ))}
    </div>
  );
}
