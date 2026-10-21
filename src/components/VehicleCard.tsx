import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Phone, Clock, MapPin } from 'lucide-react';
import type { Vehicle } from '@/types';
import { formatPrice, buildWhatsAppLink, buildCallLink, getWhatsAppMessageForVehicle } from '@/utils/contact';

interface VehicleCardProps {
  vehicle: Vehicle;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const statusColor =
    vehicle.status === 'Available'
      ? 'text-agri-light bg-agri/15'
      : vehicle.status === 'Reserved'
      ? 'text-gold bg-gold/10'
      : 'text-red-400 bg-red-500/10';

  const conditionColor =
    vehicle.condition === 'Excellent'
      ? 'text-agri-light'
      : vehicle.condition === 'Good'
      ? 'text-gold'
      : 'text-orange-400';

  return (
    <div className="group bg-ink-card border border-ink-border rounded-lg overflow-hidden hover:border-gold/30 transition-all duration-300 hover:-translate-y-1">
      <Link to={`/used-vehicles/${vehicle.id}`} className="block relative aspect-[4/3] overflow-hidden bg-ink-secondary">
        <img
          src={vehicle.images[0]}
          alt={`${vehicle.brand} ${vehicle.model}`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className={`text-xs font-medium px-2.5 py-1 rounded ${statusColor}`}>
            {vehicle.status}
          </span>
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div>
            <div className="text-xs text-cream/70">{vehicle.brand}</div>
            <div className="font-display font-bold text-xl text-cream drop-shadow-lg">
              {formatPrice(vehicle.price)}
            </div>
          </div>
        </div>
      </Link>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <Link to={`/used-vehicles/${vehicle.id}`}>
            <h3 className="font-display font-semibold text-lg text-cream group-hover:text-gold transition-colors">
              {vehicle.brand} {vehicle.model}
            </h3>
          </Link>
          <span className={`text-xs font-medium ${conditionColor} shrink-0`}>{vehicle.condition}</span>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-3">
          <div className="flex items-center gap-1.5 text-xs text-muted">
            <span className="text-cream/60">Year:</span> <span className="text-cream">{vehicle.year}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted">
            <Clock className="w-3 h-3" />
            <span>{vehicle.hours.toLocaleString('en-IN')} hrs</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted col-span-2">
            <MapPin className="w-3 h-3" />
            <span>{vehicle.location}</span>
          </div>
        </div>
        <div className="flex gap-2 mt-3 pt-3 border-t border-ink-border">
          <Link
            to={`/used-vehicles/${vehicle.id}`}
            className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 bg-ink border border-ink-border text-cream text-xs font-medium rounded hover:border-gold/40 transition-colors"
          >
            View Details
            <ArrowRight className="w-3 h-3" />
          </Link>
          <a
            href={buildWhatsAppLink(getWhatsAppMessageForVehicle(vehicle.brand, vehicle.model))}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-3 py-2 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] text-xs font-medium rounded hover:bg-[#25D366]/20 transition-colors"
            aria-label="WhatsApp enquiry"
          >
            <MessageCircle className="w-3.5 h-3.5" />
          </a>
          <a
            href={buildCallLink()}
            className="inline-flex items-center justify-center px-3 py-2 bg-gold/10 border border-gold/30 text-gold text-xs font-medium rounded hover:bg-gold/20 transition-colors"
            aria-label="Call now"
          >
            <Phone className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
