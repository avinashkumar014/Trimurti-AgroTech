import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { PartCategory } from '@/types';

interface PartCategoryCardProps {
  category: PartCategory;
}

export function PartCategoryCard({ category }: PartCategoryCardProps) {
  return (
    <Link
      to={`/tractor-parts?category=${category.id}`}
      className="group relative bg-ink-card border border-ink-border rounded-lg overflow-hidden hover:border-gold/40 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-card via-ink-card/30 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="font-display font-bold text-lg text-cream mb-1 uppercase">{category.name}</h3>
        <p className="text-xs text-muted line-clamp-1 mb-2">{category.description}</p>
        <div className="inline-flex items-center gap-1.5 text-xs font-medium text-gold group-hover:gap-2.5 transition-all">
          Explore Parts
          <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
