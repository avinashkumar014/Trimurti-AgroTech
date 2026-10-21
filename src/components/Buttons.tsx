import { Phone, MessageCircle } from 'lucide-react';
import { businessConfig } from '@/config/business';
import { buildCallLink, buildWhatsAppLink } from '@/utils/contact';

interface CallButtonProps {
  className?: string;
  label?: string;
}

export function CallButton({ className = '', label = 'Call Now' }: CallButtonProps) {
  return (
    <a
      href={buildCallLink()}
      className={`inline-flex items-center justify-center gap-2 px-5 py-3 bg-ink-card border border-ink-border text-cream text-sm font-semibold rounded hover:border-gold/50 transition-colors ${className}`}
    >
      <Phone className="w-4 h-4 text-gold" />
      {label}
    </a>
  );
}

interface WhatsAppButtonProps {
  message: string;
  className?: string;
  label?: string;
}

export function WhatsAppButton({ message, className = '', label = 'WhatsApp Us' }: WhatsAppButtonProps) {
  return (
    <a
      href={buildWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#25D366] text-white text-sm font-semibold rounded hover:bg-[#22c35e] transition-colors ${className}`}
    >
      <MessageCircle className="w-4 h-4" />
      {label}
    </a>
  );
}
