import { Phone, MessageCircle, Car, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { buildCallLink, buildWhatsAppLink, getWhatsAppMessageGeneral } from '@/utils/contact';

export function MobileBottomBar() {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-ink-secondary border-t border-ink-border pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-4 h-14">
        <a
          href={buildCallLink()}
          className="flex flex-col items-center justify-center gap-0.5 text-muted hover:text-gold active:bg-ink-card transition-colors"
        >
          <Phone className="w-4.5 h-4.5" />
          <span className="text-[10px] font-medium">Call</span>
        </a>
        <a
          href={buildWhatsAppLink(getWhatsAppMessageGeneral())}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-0.5 text-muted hover:text-[#25D366] active:bg-ink-card transition-colors"
        >
          <MessageCircle className="w-4.5 h-4.5" />
          <span className="text-[10px] font-medium">WhatsApp</span>
        </a>
        <Link
          to="/used-vehicles"
          className="flex flex-col items-center justify-center gap-0.5 text-muted hover:text-gold active:bg-ink-card transition-colors"
        >
          <Car className="w-4.5 h-4.5" />
          <span className="text-[10px] font-medium">Vehicles</span>
        </Link>
        <Link
          to="/contact"
          className="flex flex-col items-center justify-center gap-0.5 text-muted hover:text-gold active:bg-ink-card transition-colors"
        >
          <FileText className="w-4.5 h-4.5" />
          <span className="text-[10px] font-medium">Enquiry</span>
        </Link>
      </div>
    </div>
  );
}
