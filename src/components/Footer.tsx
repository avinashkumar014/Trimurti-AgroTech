import { Link } from 'react-router-dom';
import { Phone, MessageCircle, MapPin, Instagram, Facebook, Youtube } from 'lucide-react';
import { businessConfig } from '@/config/business';
import { buildCallLink, buildWhatsAppLink, getWhatsAppMessageGeneral } from '@/utils/contact';

export function Footer() {
  const quickLinks = [
    { label: 'Home', to: '/' },
    { label: 'Tractor Parts', to: '/tractor-parts' },
    { label: 'Used Vehicles', to: '/used-vehicles' },
    { label: 'Sell Vehicle', to: '/sell-your-vehicle' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ];

  const services = [
    { label: 'Tractor Parts', to: '/tractor-parts' },
    { label: 'Used Tractors', to: '/used-vehicles' },
    { label: 'Vehicle Buying', to: '/sell-your-vehicle' },
    { label: 'Vehicle Selling', to: '/sell-your-vehicle' },
  ];

  const showSocial = !!(businessConfig.INSTAGRAM_URL || businessConfig.FACEBOOK_URL || businessConfig.YOUTUBE_URL);

  return (
    <footer className="bg-ink-secondary border-t border-ink-border mt-0">
      <div className="container-x py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <img
                src="/favicon.svg"
                alt={businessConfig.BUSINESS_SHORT_NAME}
                className="w-10 h-10 rounded shrink-0 shadow-sm"
              />
              <div className="leading-tight">
                <div className="font-display font-bold text-base text-cream tracking-wide uppercase">
                  {businessConfig.BUSINESS_SHORT_NAME}
                </div>
                <div className="text-xs text-muted">{businessConfig.BUSINESS_TAGLINE}</div>
              </div>
            </Link>
            <p className="text-sm text-muted leading-relaxed max-w-xs">
              Quality tractor spare parts, trusted used tractors and vehicles, and reliable buying &amp; selling assistance — all under one roof.
            </p>
            {showSocial && (
              <div className="flex items-center gap-3 mt-4">
                {businessConfig.INSTAGRAM_URL && (
                  <a href={businessConfig.INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-ink-card border border-ink-border rounded flex items-center justify-center text-muted hover:text-gold hover:border-gold/40 transition-colors" aria-label="Instagram">
                    <Instagram className="w-4 h-4" />
                  </a>
                )}
                {businessConfig.FACEBOOK_URL && (
                  <a href={businessConfig.FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-ink-card border border-ink-border rounded flex items-center justify-center text-muted hover:text-gold hover:border-gold/40 transition-colors" aria-label="Facebook">
                    <Facebook className="w-4 h-4" />
                  </a>
                )}
                {businessConfig.YOUTUBE_URL && (
                  <a href={businessConfig.YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-ink-card border border-ink-border rounded flex items-center justify-center text-muted hover:text-gold hover:border-gold/40 transition-colors" aria-label="YouTube">
                    <Youtube className="w-4 h-4" />
                  </a>
                )}
              </div>
            )}
          </div>

          <div>
            <h3 className="font-display font-semibold text-sm text-cream uppercase mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-muted hover:text-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold text-sm text-cream uppercase mb-4">Services</h3>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.label}>
                  <Link to={s.to} className="text-sm text-muted hover:text-gold transition-colors">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold text-sm text-cream uppercase mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a href={buildCallLink()} className="flex items-start gap-2.5 text-sm text-muted hover:text-gold transition-colors">
                  <Phone className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                  <span>{businessConfig.PHONE_NUMBER}</span>
                </a>
              </li>
              <li>
                <a href={buildWhatsAppLink(getWhatsAppMessageGeneral())} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2.5 text-sm text-muted hover:text-gold transition-colors">
                  <MessageCircle className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                  <span>WhatsApp: {businessConfig.PHONE_NUMBER}</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-muted">
                <MapPin className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                <span>{businessConfig.ADDRESS}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-ink-border flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} {businessConfig.BUSINESS_NAME}. All rights reserved.
          </p>
          <p className="text-xs text-muted">
            Tractor Parts · Used Vehicles · Buy &amp; Sell
          </p>
        </div>
      </div>
    </footer>
  );
}
