import { Link } from 'react-router-dom';
import { ArrowRight, Phone, MessageCircle } from 'lucide-react';
import { businessConfig } from '@/config/business';
import { buildCallLink, buildWhatsAppLink, getWhatsAppMessageGeneral } from '@/utils/contact';

export function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/11612188/pexels-photo-11612188.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Tractor in Indian agricultural field"
          className="w-full h-full object-cover"
          style={{ animation: 'fadeIn 1s ease-out forwards' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/50" />
      </div>

      {/* Content */}
      <div className="container-x relative z-10 py-20 lg:py-0">
        <div className="max-w-2xl">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-gold/10 border border-gold/30 rounded-full mb-6"
            style={{ opacity: 0, animation: 'fadeUp 0.5s ease-out 0.1s forwards' }}
          >
            <span className="w-2 h-2 bg-gold rounded-full" />
            <span className="text-xs font-medium text-gold uppercase tracking-wider">
              {businessConfig.BUSINESS_TAGLINE}
            </span>
          </div>

          <h1
            className="font-display font-bold text-4xl sm:text-5xl lg:text-7xl text-cream uppercase leading-[1.05] mb-5"
            style={{ opacity: 0, animation: 'fadeUp 0.6s ease-out 0.2s forwards' }}
          >
            Tractor Parts<br />
            <span className="text-gold">&amp;</span> Used Vehicles
          </h1>

          <p
            className="text-base lg:text-lg text-muted leading-relaxed max-w-xl mb-8"
            style={{ opacity: 0, animation: 'fadeUp 0.6s ease-out 0.35s forwards' }}
          >
            Quality tractor parts, trusted used tractors and vehicles, and reliable buying &amp; selling assistance — all under one roof.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-3 mb-6"
            style={{ opacity: 0, animation: 'fadeUp 0.6s ease-out 0.5s forwards' }}
          >
            <Link
              to="/tractor-parts"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gold text-ink text-sm font-bold rounded hover:bg-gold-light transition-colors"
            >
              Browse Tractor Parts
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/used-vehicles"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-ink-card border border-ink-border text-cream text-sm font-bold rounded hover:border-gold/40 transition-colors"
            >
              View Used Vehicles
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div
            className="flex items-center gap-4"
            style={{ opacity: 0, animation: 'fadeUp 0.6s ease-out 0.65s forwards' }}
          >
            <Link
              to="/sell-your-vehicle"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-cream hover:text-gold transition-colors group"
            >
              Sell Your Vehicle
              <ArrowRight className="w-4 h-4 text-gold transition-transform group-hover:translate-x-1" />
            </Link>
            <span className="text-ink-border">|</span>
            <a
              href={buildCallLink()}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-cream hover:text-gold transition-colors"
            >
              <Phone className="w-4 h-4 text-gold" />
              Call Now
            </a>
            <a
              href={buildWhatsAppLink(getWhatsAppMessageGeneral())}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-cream hover:text-[#25D366] transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
