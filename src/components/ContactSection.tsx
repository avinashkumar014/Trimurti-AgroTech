import { Phone, MessageCircle, MapPin, Clock, Mail, Navigation } from 'lucide-react';
import { businessConfig } from '@/config/business';
import { buildCallLink, buildWhatsAppLink, getWhatsAppMessageGeneral } from '@/utils/contact';
import { EnquiryForm } from './EnquiryForm';

export function ContactSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      <div className="reveal">
        <h3 className="font-display font-bold text-2xl text-cream mb-6 uppercase">Get In Touch</h3>
        <div className="space-y-4">
          <a href={buildCallLink()} className="flex items-center gap-4 p-4 bg-ink-card border border-ink-border rounded-lg hover:border-gold/30 transition-colors group">
            <div className="w-11 h-11 bg-gold/10 border border-gold/20 rounded-lg flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5 text-gold" />
            </div>
            <div>
              <div className="text-xs text-muted">Phone</div>
              <div className="text-sm text-cream font-medium group-hover:text-gold transition-colors">{businessConfig.PHONE_NUMBER}</div>
            </div>
          </a>
          <a href={buildWhatsAppLink(getWhatsAppMessageGeneral())} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-ink-card border border-ink-border rounded-lg hover:border-[#25D366]/30 transition-colors group">
            <div className="w-11 h-11 bg-[#25D366]/10 border border-[#25D366]/20 rounded-lg flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5 text-[#25D366]" />
            </div>
            <div>
              <div className="text-xs text-muted">WhatsApp</div>
              <div className="text-sm text-cream font-medium group-hover:text-[#25D366] transition-colors">{businessConfig.PHONE_NUMBER}</div>
            </div>
          </a>
          <div className="flex items-center gap-4 p-4 bg-ink-card border border-ink-border rounded-lg">
            <div className="w-11 h-11 bg-gold/10 border border-gold/20 rounded-lg flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-gold" />
            </div>
            <div>
              <div className="text-xs text-muted">Address</div>
              <div className="text-sm text-cream font-medium">{businessConfig.ADDRESS}</div>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-ink-card border border-ink-border rounded-lg">
            <div className="w-11 h-11 bg-gold/10 border border-gold/20 rounded-lg flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-gold" />
            </div>
            <div>
              <div className="text-xs text-muted">Email</div>
              <div className="text-sm text-cream font-medium">{businessConfig.EMAIL}</div>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 bg-ink-card border border-ink-border rounded-lg">
            <div className="w-11 h-11 bg-gold/10 border border-gold/20 rounded-lg flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-gold" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-muted mb-1">Opening Hours</div>
              {businessConfig.OPENING_HOURS.map((h) => (
                <div key={h.day} className="flex justify-between text-sm text-cream">
                  <span>{h.day}</span>
                  <span className="text-muted">{h.hours}</span>
                </div>
              ))}
            </div>
          </div>
          <a
            href={businessConfig.GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 bg-ink-card border border-ink-border text-cream text-sm font-semibold rounded hover:border-gold/40 transition-colors"
          >
            <Navigation className="w-4 h-4 text-gold" />
            Get Directions
          </a>
        </div>
      </div>

      <div className="reveal">
        <div className="bg-ink-card border border-ink-border rounded-lg p-6 lg:p-8">
          <h3 className="font-display font-bold text-xl text-cream mb-6 uppercase">Send An Enquiry</h3>
          <EnquiryForm />
        </div>
      </div>
    </div>
  );
}
