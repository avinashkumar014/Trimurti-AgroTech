import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Part } from '@/types';
import { formatPrice, buildWhatsAppLink, getWhatsAppMessageForPart } from '@/utils/contact';
import { MessageCircle } from 'lucide-react';

interface PartCardProps {
  part: Part;
}

export function PartCard({ part }: PartCardProps) {
  const availabilityColor =
    part.availability === 'In Stock'
      ? 'text-agri-light bg-agri/15'
      : part.availability === 'Out of Stock'
      ? 'text-red-400 bg-red-500/10'
      : 'text-gold bg-gold/10';

  return (
    <div className="group bg-ink-card border border-ink-border rounded-lg overflow-hidden hover:border-gold/30 transition-all duration-300 hover:-translate-y-1">
      <Link to={`/tractor-parts/${part.id}`} className="block relative aspect-[4/3] overflow-hidden bg-ink-secondary">
        <img
          src={part.images[0]}
          alt={part.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className={`text-xs font-medium px-2.5 py-1 rounded ${availabilityColor}`}>
            {part.availability}
          </span>
        </div>
      </Link>
      <div className="p-4">
        <div className="text-xs text-gold font-medium mb-1">{part.brand}</div>
        <Link to={`/tractor-parts/${part.id}`}>
          <h3 className="font-display font-semibold text-lg text-cream group-hover:text-gold transition-colors line-clamp-1">
            {part.name}
          </h3>
        </Link>
        <p className="text-xs text-muted mt-1 line-clamp-1">
          Fits: {part.modelCompatibility.join(', ')}
        </p>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-ink-border">
          <div className="text-sm font-display font-semibold text-cream">
            {part.price === 'Contact for Price' ? (
              <span className="text-gold">Contact for Price</span>
            ) : (
              part.price
            )}
          </div>
        </div>
        <div className="flex gap-2 mt-3">
          <Link
            to={`/tractor-parts/${part.id}`}
            className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 bg-ink border border-ink-border text-cream text-xs font-medium rounded hover:border-gold/40 transition-colors"
          >
            Enquire Now
            <ArrowRight className="w-3 h-3" />
          </Link>
          <a
            href={buildWhatsAppLink(getWhatsAppMessageForPart(part.name))}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-3 py-2 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] text-xs font-medium rounded hover:bg-[#25D366]/20 transition-colors"
            aria-label="WhatsApp for price"
          >
            <MessageCircle className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
