import { PageLayout } from '@/components/PageLayout';
import { SectionHeading } from '@/components/SectionHeading';
import { ContactSection } from '@/components/ContactSection';
import { businessConfig } from '@/config/business';

export function ContactPage() {
  return (
    <PageLayout>
      <div className="container-x py-8 lg:py-12">
        {/* Hero */}
        <div className="relative rounded-2xl overflow-hidden mb-12 lg:mb-16">
          <div className="absolute inset-0">
            <img
              src="https://images.pexels.com/photos/15954898/pexels-photo-15954898.jpeg?auto=compress&cs=tinysrgb&w=1920"
              alt="Contact us"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/40" />
          </div>
          <div className="relative z-10 p-8 lg:p-14 max-w-2xl">
            <div className="text-gold text-xs font-display font-semibold uppercase tracking-widest mb-3">
              Get In Touch
            </div>
            <h1 className="font-display font-bold text-4xl lg:text-6xl text-cream uppercase leading-tight mb-4">
              Contact Us
            </h1>
            <p className="text-muted text-base lg:text-lg leading-relaxed">
              Call, WhatsApp, or send an enquiry. We're here to help with tractor parts, used vehicles, and buying &amp; selling.
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <ContactSection />

        {/* Map */}
        <div className="mt-12 lg:mt-16 reveal">
          <SectionHeading
            eyebrow="Find Us"
            title="Our Location"
            center={false}
          />
          <div className="bg-ink-card border border-ink-border rounded-lg overflow-hidden">
            <div className="aspect-[16/9] bg-ink-secondary flex items-center justify-center">
              <iframe
                title="Business Location"
                src="https://www.google.com/maps?q=28.6139,77.2090&z=12&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                style={{ filter: 'invert(0.92) hue-rotate(180deg) contrast(0.85)' }}
              />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
