import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, MessageCircle, Menu, X, ChevronRight } from 'lucide-react';
import { businessConfig } from '@/config/business';
import { buildCallLink, buildWhatsAppLink, getWhatsAppMessageGeneral } from '@/utils/contact';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Tractor Parts', to: '/tractor-parts' },
  { label: 'Used Vehicles', to: '/used-vehicles' },
  { label: 'Sell Your Vehicle', to: '/sell-your-vehicle' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

const mobileLinks = [
  { label: 'Home', to: '/' },
  { label: 'Tractor Parts', to: '/tractor-parts' },
  { label: 'Used Vehicles', to: '/used-vehicles' },
  { label: 'Sell Vehicle', to: '/sell-your-vehicle' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const isHome = location.pathname === '/';
  const isTransparent = isHome && !scrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isTransparent
            ? 'bg-transparent'
            : 'bg-ink/95 backdrop-blur-md border-b border-ink-border'
        }`}
      >
        <nav className="container-x flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <img
              src="/favicon.svg"
              alt={businessConfig.BUSINESS_SHORT_NAME}
              className="w-9 h-9 lg:w-10 lg:h-10 rounded shrink-0 shadow-sm"
            />
            <div className="leading-tight">
              <div className="font-display font-bold text-sm lg:text-base text-cream tracking-wide uppercase">
                {businessConfig.BUSINESS_SHORT_NAME}
              </div>
              <div className="text-[10px] lg:text-xs text-muted hidden sm:block">
                {businessConfig.BUSINESS_TAGLINE}
              </div>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = location.pathname === link.to ||
                (link.to !== '/' && location.pathname.startsWith(link.to));
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 py-2 text-sm font-medium transition-colors relative group ${
                    active ? 'text-gold' : 'text-cream hover:text-gold'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-3 right-3 h-0.5 bg-gold transition-all duration-300 ${
                      active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-2.5">
            <a
              href={buildCallLink()}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-ink-card border border-ink-border text-cream text-sm font-medium rounded hover:border-gold/40 transition-colors"
            >
              <Phone className="w-4 h-4 text-gold" />
              Call Now
            </a>
            <a
              href={buildWhatsAppLink(getWhatsAppMessageGeneral())}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2.5 bg-[#25D366] text-white text-sm font-medium rounded hover:bg-[#22c35e] transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </div>

          <button
            className="lg:hidden text-cream p-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="absolute inset-0 bg-ink/90 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
        <div
          className={`absolute top-16 left-0 right-0 bg-ink-secondary border-b border-ink-border transition-transform duration-300 ${
            menuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="container-x py-4 flex flex-col">
            {mobileLinks.map((link) => {
              const active = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center justify-between py-3.5 border-b border-ink-border/50 last:border-0 ${
                    active ? 'text-gold' : 'text-cream'
                  }`}
                >
                  <span className="text-base font-medium">{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-muted" />
                </Link>
              );
            })}
            <div className="flex gap-2 mt-4">
              <a
                href={buildCallLink()}
                className="flex-1 flex items-center justify-center gap-1.5 py-3 bg-ink-card border border-ink-border text-cream text-sm font-medium rounded"
              >
                <Phone className="w-4 h-4 text-gold" />
                Call
              </a>
              <a
                href={buildWhatsAppLink(getWhatsAppMessageGeneral())}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 py-3 bg-[#25D366] text-white text-sm font-medium rounded"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
