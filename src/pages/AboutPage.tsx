import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Phone, MessageCircle } from 'lucide-react';
import { PageLayout } from '@/components/PageLayout';
import { SectionHeading } from '@/components/SectionHeading';
import { HowItWorks } from '@/components/HowItWorks';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { Gallery } from '@/components/Gallery';
import { businessConfig } from '@/config/business';
import { buildCallLink, buildWhatsAppLink, getWhatsAppMessageGeneral } from '@/utils/contact';

export function AboutPage() {
  return (
    <PageLayout>
      <div className="container-x py-8 lg:py-12">
        {/* Hero */}
        <div className="relative rounded-2xl overflow-hidden mb-12 lg:mb-16">
          <div className="absolute inset-0">
            <img
              src="https://images.pexels.com/photos/9213716/pexels-photo-9213716.jpeg?auto=compress&cs=tinysrgb&w=1920"
              alt="Our workshop"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/40" />
          </div>
          <div className="relative z-10 p-8 lg:p-14 max-w-2xl">
            <div className="text-gold text-xs font-display font-semibold uppercase tracking-widest mb-3">
              About Us
            </div>
            <h1 className="font-display font-bold text-4xl lg:text-6xl text-cream uppercase leading-tight mb-4">
              Built Around Trust.<br />Driven By Agriculture.
            </h1>
            <p className="text-muted text-base lg:text-lg leading-relaxed">
              We provide tractor spare parts and help customers buy and sell used tractors and vehicles.
            </p>
          </div>
        </div>

        {/* What We Do */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16 lg:mb-24">
          <div className="reveal relative aspect-[4/3] rounded-lg overflow-hidden">
            <img
              src="https://images.pexels.com/photos/7565157/pexels-photo-7565157.jpeg?auto=compress&cs=tinysrgb&w=940"
              alt="Tractor parts and workshop"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="reveal">
            <SectionHeading
              eyebrow="What We Do"
              title="Our Business"
              center={false}
            />
            <div className="space-y-4 text-muted text-sm lg:text-base leading-relaxed">
              <p>
                We are a local business specializing in tractor spare parts and used vehicle buying &amp; selling. Our shop serves farmers, tractor owners, mechanics, and agricultural businesses in the region.
              </p>
              <p>
                Whether you need a specific part for your tractor, are looking for a quality used tractor, or want to sell your old vehicle, we provide practical, hands-on assistance at every step.
              </p>
              <p>
                Our focus is simple: genuine parts, fair deals, and personal service from enquiry to final deal.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <a
                href={buildCallLink()}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-gold text-ink text-sm font-bold rounded hover:bg-gold-light transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call Us
              </a>
              <a
                href={buildWhatsAppLink(getWhatsAppMessageGeneral())}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-ink-card border border-ink-border text-cream text-sm font-bold rounded hover:border-gold/40 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <section className="mb-16 lg:mb-24">
          <SectionHeading
            eyebrow="Our Promise"
            title="Why Customers Choose Us"
          />
          <WhyChooseUs />
        </section>

        {/* How It Works */}
        <section className="mb-16 lg:mb-24">
          <SectionHeading
            eyebrow="Simple Process"
            title="How It Works"
          />
          <HowItWorks />
        </section>

        {/* Gallery */}
        <section className="mb-16 lg:mb-24">
          <SectionHeading
            eyebrow="Our Work"
            title="Business Gallery"
          />
          <Gallery />
        </section>

        {/* Visit Store CTA */}
        <section className="reveal">
          <div className="bg-ink-card border border-ink-border rounded-2xl p-8 lg:p-12 text-center">
            <h2 className="font-display font-bold text-2xl lg:text-3xl text-cream uppercase mb-3">
              Visit Our Store
            </h2>
            <p className="text-muted text-sm lg:text-base mb-6 max-w-xl mx-auto">
              {businessConfig.ADDRESS}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={businessConfig.GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-gold text-ink text-sm font-bold rounded hover:bg-gold-light transition-colors"
              >
                <MapPin className="w-4 h-4" />
                Get Directions
              </a>
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center gap-2 px-5 py-3 bg-ink border border-ink-border text-cream text-sm font-bold rounded hover:border-gold/40 transition-colors"
              >
                Contact Us
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
