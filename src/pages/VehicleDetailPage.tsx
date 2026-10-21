import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  ArrowLeft, MessageCircle, Phone, Mail, Clock, MapPin,
  Check, ChevronRight, Calendar, Gauge, Wrench, Cog,
} from 'lucide-react';
import { PageLayout } from '@/components/PageLayout';
import { VehicleCard } from '@/components/VehicleCard';
import { EnquiryForm } from '@/components/EnquiryForm';
import { vehicles } from '@/data/sampleData';
import { formatPrice, buildWhatsAppLink, buildCallLink, getWhatsAppMessageForVehicle } from '@/utils/contact';

export function VehicleDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);

  const vehicle = vehicles.find((v) => v.id === id);

  if (!vehicle) {
    return (
      <PageLayout>
        <div className="container-x py-20 text-center">
          <h1 className="font-display font-bold text-3xl text-cream mb-4">Vehicle Not Found</h1>
          <Link to="/used-vehicles" className="text-gold hover:underline">Back to Used Vehicles</Link>
        </div>
      </PageLayout>
    );
  }

  const relatedVehicles = vehicles
    .filter((v) => v.id !== vehicle.id && v.vehicleType === vehicle.vehicleType)
    .slice(0, 4);

  const infoItems = [
    { icon: Cog, label: 'Brand', value: vehicle.brand },
    { icon: Wrench, label: 'Model', value: vehicle.model },
    { icon: Calendar, label: 'Year', value: String(vehicle.year) },
    { icon: Gauge, label: 'Running Hours', value: `${vehicle.hours.toLocaleString('en-IN')} hrs` },
    { icon: Check, label: 'Condition', value: vehicle.condition },
    { icon: Cog, label: 'Engine Condition', value: vehicle.engineCondition },
    { icon: Cog, label: 'Tyre Condition', value: vehicle.tyreCondition },
    { icon: MapPin, label: 'Location', value: vehicle.location },
  ];

  return (
    <PageLayout>
      <div className="container-x py-6 lg:py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-muted mb-6">
          <Link to="/" className="hover:text-gold transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/used-vehicles" className="hover:text-gold transition-colors">Used Vehicles</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-cream truncate">{vehicle.brand} {vehicle.model}</span>
        </nav>

        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-gold transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="reveal">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-ink-card border border-ink-border mb-3">
              <img src={vehicle.images[activeImage]} alt={`${vehicle.brand} ${vehicle.model}`} className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3">
                <span className={`text-xs font-medium px-2.5 py-1 rounded ${
                  vehicle.status === 'Available'
                    ? 'text-agri-light bg-agri/15'
                    : vehicle.status === 'Reserved'
                    ? 'text-gold bg-gold/10'
                    : 'text-red-400 bg-red-500/10'
                }`}>
                  {vehicle.status}
                </span>
              </div>
            </div>
            {vehicle.images.length > 1 && (
              <div className="flex gap-2">
                {vehicle.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-24 h-20 rounded overflow-hidden border-2 transition-colors ${
                      activeImage === i ? 'border-gold' : 'border-ink-border'
                    }`}
                  >
                    <img src={img} alt={`${vehicle.brand} ${vehicle.model} ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="reveal">
            <div className="text-xs text-gold font-medium mb-2">{vehicle.vehicleType}</div>
            <h1 className="font-display font-bold text-3xl lg:text-4xl text-cream uppercase mb-3">
              {vehicle.brand} {vehicle.model}
            </h1>
            <div className="text-3xl font-display font-bold text-gold mb-6">
              {formatPrice(vehicle.price)}
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {infoItems.map((item) => (
                <div key={item.label} className="flex items-center gap-3 p-3 bg-ink-card border border-ink-border rounded-lg">
                  <item.icon className="w-4 h-4 text-gold shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs text-muted">{item.label}</div>
                    <div className="text-sm text-cream font-medium truncate">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="bg-ink-card border border-ink-border rounded-lg p-5">
              <h3 className="font-display font-semibold text-base text-cream uppercase mb-4">Interested in this vehicle?</h3>
              <div className="flex flex-col gap-3">
                <a
                  href={buildCallLink()}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-gold text-ink text-sm font-bold rounded hover:bg-gold-light transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Call Now
                </a>
                <a
                  href={buildWhatsAppLink(getWhatsAppMessageForVehicle(vehicle.brand, vehicle.model))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#25D366] text-white text-sm font-bold rounded hover:bg-[#22c35e] transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Enquiry
                </a>
                <a
                  href="#enquiry-form"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-ink border border-ink-border text-cream text-sm font-bold rounded hover:border-gold/40 transition-colors"
                >
                  <Mail className="w-4 h-4 text-gold" />
                  Send Enquiry
                </a>
                <button className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-ink border border-ink-border text-muted text-sm font-medium rounded hover:border-gold/30 hover:text-gold transition-colors">
                  <Calendar className="w-4 h-4" />
                  Schedule Inspection
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="reveal">
            <h3 className="font-display font-bold text-xl text-cream uppercase mb-4">Vehicle Description</h3>
            <p className="text-muted text-sm leading-relaxed">{vehicle.description}</p>
          </div>
          <div className="reveal">
            <h3 className="font-display font-bold text-xl text-cream uppercase mb-4">Vehicle Specifications</h3>
            <div className="bg-ink-card border border-ink-border rounded-lg p-5">
              <div className="space-y-3">
                {vehicle.specifications.map((spec) => (
                  <div key={spec.label} className="flex justify-between text-sm border-b border-ink-border/50 last:border-0 pb-2 last:pb-0">
                    <span className="text-muted">{spec.label}</span>
                    <span className="text-cream font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Enquiry Form */}
        <div id="enquiry-form" className="mt-12 lg:mt-16">
          <div className="bg-ink-card border border-ink-border rounded-lg p-6 lg:p-8 max-w-2xl mx-auto">
            <h3 className="font-display font-bold text-xl text-cream uppercase mb-2 text-center">Enquire About This Vehicle</h3>
            <p className="text-muted text-sm text-center mb-6">
              Send us your details and we'll get back to you.
            </p>
            <EnquiryForm type="Vehicle" product={`${vehicle.brand} ${vehicle.model}`} />
          </div>
        </div>

        {/* Related Vehicles */}
        {relatedVehicles.length > 0 && (
          <div className="mt-16">
            <h3 className="font-display font-bold text-2xl text-cream uppercase mb-6">Related Vehicles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedVehicles.map((v) => (
                <VehicleCard key={v.id} vehicle={v} />
              ))}
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
