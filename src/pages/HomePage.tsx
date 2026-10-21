import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { PageLayout } from '@/components/PageLayout';
import { Hero } from '@/components/Hero';
import { QuickActionCards } from '@/components/QuickActionCards';
import { SectionHeading } from '@/components/SectionHeading';
import { PartCategoryCard } from '@/components/PartCategoryCard';
import { VehicleCard } from '@/components/VehicleCard';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { BrandSection } from '@/components/BrandSection';
import { HowItWorks } from '@/components/HowItWorks';
import { Gallery } from '@/components/Gallery';
import { Testimonials } from '@/components/Testimonials';
import { ContactSection } from '@/components/ContactSection';
import { partCategories, vehicles } from '@/data/sampleData';
import { businessConfig } from '@/config/business';

export function HomePage() {
  const featuredVehicles = vehicles.filter((v) => v.status === 'Available').slice(0, 4);

  return (
    <PageLayout className="pt-0">
      <Hero />

      {/* Quick Actions */}
      <section className="py-16 lg:py-24 bg-ink">
        <div className="container-x">
          <QuickActionCards />
        </div>
      </section>

      {/* Parts Categories */}
      <section className="py-16 lg:py-24 bg-ink-secondary">
        <div className="container-x">
          <SectionHeading
            eyebrow="What We Offer"
            title="Everything Your Tractor Needs"
            subtitle="Find the parts you need for maintenance, repair and replacement."
          />
          <div className="reveal-stagger grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-5">
            {partCategories.map((cat) => (
              <PartCategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className="py-16 lg:py-24 bg-ink">
        <div className="container-x">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 lg:mb-12">
            <SectionHeading
              eyebrow="Available Now"
              title="Quality Used Vehicles"
              subtitle="Explore available tractors and agricultural vehicles."
              center={false}
            />
            <Link
              to="/used-vehicles"
              className="group inline-flex items-center gap-2 text-sm font-medium text-gold shrink-0"
            >
              View All Vehicles
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {featuredVehicles.map((v) => (
              <VehicleCard key={v.id} vehicle={v} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 lg:py-24 bg-ink-secondary">
        <div className="container-x">
          <SectionHeading
            eyebrow="Our Promise"
            title="Why Customers Choose Us"
          />
          <WhyChooseUs />
        </div>
      </section>

      {/* Brands */}
      <section className="py-16 lg:py-20 bg-ink">
        <div className="container-x">
          <SectionHeading
            eyebrow="Parts Available For"
            title="Tractor Brands We Service"
            subtitle="Parts and components available for major Indian tractor brands."
          />
          <BrandSection />
          <p className="text-center text-xs text-muted mt-6 max-w-2xl mx-auto">
            Brand names are shown for compatibility reference. We are not an authorized dealer or official partner unless verified by the client.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 lg:py-24 bg-ink-secondary">
        <div className="container-x">
          <SectionHeading
            eyebrow="Simple Process"
            title="How It Works"
          />
          <HowItWorks />
        </div>
      </section>

      {/* About Preview */}
      <section className="py-16 lg:py-24 bg-ink">
        <div className="container-x">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="reveal relative aspect-[4/3] rounded-lg overflow-hidden">
              <img
                src="https://images.pexels.com/photos/9213716/pexels-photo-9213716.jpeg?auto=compress&cs=tinysrgb&w=940"
                alt="Our workshop"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="reveal">
              <div className="text-gold text-xs font-display font-semibold uppercase tracking-widest mb-3">
                About Us
              </div>
              <h2 className="font-display font-bold text-3xl lg:text-4xl text-cream uppercase leading-tight mb-5">
                Built Around Trust.<br />Driven By Agriculture.
              </h2>
              <p className="text-muted text-base leading-relaxed mb-6">
                We provide tractor spare parts and help customers buy and sell used tractors and vehicles. Our focus is on practical, reliable service — whether you need a specific part, are looking for a used tractor, or want to sell your old vehicle.
              </p>
              <Link
                to="/about"
                className="group inline-flex items-center gap-2 px-5 py-3 bg-gold text-ink text-sm font-bold rounded hover:bg-gold-light transition-colors"
              >
                Visit Our Store
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 lg:py-24 bg-ink-secondary">
        <div className="container-x">
          <SectionHeading
            eyebrow="Our Work"
            title="Business Gallery"
            subtitle="A look at our shop, parts, vehicles and customer deliveries."
          />
          <Gallery />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 lg:py-24 bg-ink">
        <div className="container-x">
          <SectionHeading
            eyebrow="Customer Feedback"
            title="What Customers Say"
          />
          <Testimonials />
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 lg:py-24 bg-ink-secondary">
        <div className="container-x">
          <SectionHeading
            eyebrow="Contact Us"
            title="Visit Our Store"
            subtitle={businessConfig.ADDRESS}
          />
          <ContactSection />
        </div>
      </section>
    </PageLayout>
  );
}
