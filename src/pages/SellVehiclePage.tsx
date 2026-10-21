import { MessageCircle, ArrowRight, Tag, Phone, ShieldCheck, Handshake } from 'lucide-react';
import { PageLayout } from '@/components/PageLayout';
import { SectionHeading } from '@/components/SectionHeading';
import { SellVehicleForm } from '@/components/SellVehicleForm';
import { buildWhatsAppLink, buildCallLink, getWhatsAppMessageForSell } from '@/utils/contact';

const benefits = [
  { icon: Handshake, title: 'Fair Assessment', desc: 'We evaluate your vehicle honestly and offer practical guidance.' },
  { icon: ShieldCheck, title: 'Transparent Process', desc: 'No hidden charges or confusing terms. Simple, straightforward dealing.' },
  { icon: Tag, title: 'Quick Response', desc: 'Our team contacts you promptly after you submit your details.' },
];

export function SellVehiclePage() {
  return (
    <PageLayout>
      <div className="container-x py-8 lg:py-12">
        {/* Hero */}
        <div className="relative rounded-2xl overflow-hidden mb-12 lg:mb-16">
          <div className="absolute inset-0">
            <img
              src="https://images.pexels.com/photos/5958736/pexels-photo-5958736.jpeg?auto=compress&cs=tinysrgb&w=1920"
              alt="Tractor ready to sell"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/50" />
          </div>
          <div className="relative z-10 p-8 lg:p-14 max-w-2xl">
            <div className="text-gold text-xs font-display font-semibold uppercase tracking-widest mb-3">
              Sell Your Vehicle
            </div>
            <h1 className="font-display font-bold text-4xl lg:text-6xl text-cream uppercase leading-tight mb-4">
              Ready to Sell<br />Your Vehicle?
            </h1>
            <p className="text-muted text-base lg:text-lg leading-relaxed">
              Share your vehicle details with us and our team will contact you to discuss the next steps.
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="reveal-stagger grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mb-12">
          {benefits.map((b) => (
            <div key={b.title} className="bg-ink-card border border-ink-border rounded-lg p-6 hover:border-gold/30 transition-colors">
              <div className="w-11 h-11 bg-gold/10 border border-gold/20 rounded-lg flex items-center justify-center mb-4">
                <b.icon className="w-5 h-5 text-gold" />
              </div>
              <h3 className="font-display font-bold text-base text-cream mb-2 uppercase">{b.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2 reveal">
            <div className="bg-ink-card border border-ink-border rounded-lg p-6 lg:p-8">
              <h2 className="font-display font-bold text-xl text-cream uppercase mb-6">Submit Your Vehicle Details</h2>
              <SellVehicleForm />
            </div>
          </div>

          <div className="reveal">
            <div className="sticky top-24 space-y-4">
              <div className="bg-ink-card border border-ink-border rounded-lg p-6">
                <h3 className="font-display font-semibold text-base text-cream uppercase mb-4">Other Ways to Reach Us</h3>
                <a
                  href={buildWhatsAppLink(getWhatsAppMessageForSell())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 p-3 bg-[#25D366]/10 border border-[#25D366]/30 rounded-lg hover:bg-[#25D366]/20 transition-colors mb-3"
                >
                  <MessageCircle className="w-5 h-5 text-[#25D366] shrink-0" />
                  <div>
                    <div className="text-sm text-cream font-medium">Sell via WhatsApp</div>
                    <div className="text-xs text-muted">Send details directly</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted ml-auto group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href={buildCallLink()}
                  className="group flex items-center gap-3 p-3 bg-gold/10 border border-gold/30 rounded-lg hover:bg-gold/20 transition-colors"
                >
                  <Phone className="w-5 h-5 text-gold shrink-0" />
                  <div>
                    <div className="text-sm text-cream font-medium">Call to Discuss</div>
                    <div className="text-xs text-muted">Talk to our team</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted ml-auto group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              <div className="bg-ink-card border border-ink-border rounded-lg p-6">
                <h3 className="font-display font-semibold text-base text-cream uppercase mb-3">How It Works</h3>
                <div className="space-y-3">
                  {[
                    'Submit your vehicle details',
                    'Our team contacts you',
                    'Vehicle inspection & assessment',
                    'Fair deal discussion',
                    'Finalize the sale',
                  ].map((step, i) => (
                    <div key={step} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-gold/10 border border-gold/20 rounded-full flex items-center justify-center text-xs font-display font-bold text-gold shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <span className="text-sm text-muted">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
