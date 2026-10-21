import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, ArrowRight, MessageCircle, Phone, Check, ChevronRight } from 'lucide-react';
import { PageLayout } from '@/components/PageLayout';
import { PartCard } from '@/components/PartCard';
import { EnquiryForm } from '@/components/EnquiryForm';
import { parts, partCategories } from '@/data/sampleData';
import { buildWhatsAppLink, buildCallLink, getWhatsAppMessageForPart } from '@/utils/contact';

export function PartDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);

  const part = parts.find((p) => p.id === id);

  if (!part) {
    return (
      <PageLayout>
        <div className="container-x py-20 text-center">
          <h1 className="font-display font-bold text-3xl text-cream mb-4">Part Not Found</h1>
          <Link to="/tractor-parts" className="text-gold hover:underline">Back to Tractor Parts</Link>
        </div>
      </PageLayout>
    );
  }

  const category = partCategories.find((c) => c.id === part.category);
  const relatedParts = parts
    .filter((p) => p.category === part.category && p.id !== part.id)
    .slice(0, 4);

  return (
    <PageLayout>
      <div className="container-x py-6 lg:py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-muted mb-6">
          <Link to="/" className="hover:text-gold transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/tractor-parts" className="hover:text-gold transition-colors">Tractor Parts</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-cream truncate">{part.name}</span>
        </nav>

        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-gold transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="reveal">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-ink-card border border-ink-border mb-3">
              <img
                src={part.images[activeImage]}
                alt={part.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className={`text-xs font-medium px-2.5 py-1 rounded ${
                  part.availability === 'In Stock'
                    ? 'text-agri-light bg-agri/15'
                    : part.availability === 'Out of Stock'
                    ? 'text-red-400 bg-red-500/10'
                    : 'text-gold bg-gold/10'
                }`}>
                  {part.availability}
                </span>
              </div>
            </div>
            {part.images.length > 1 && (
              <div className="flex gap-2">
                {part.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-20 h-20 rounded overflow-hidden border-2 transition-colors ${
                      activeImage === i ? 'border-gold' : 'border-ink-border'
                    }`}
                  >
                    <img src={img} alt={`${part.name} ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="reveal">
            <div className="text-xs text-gold font-medium mb-2">{part.brand}</div>
            <h1 className="font-display font-bold text-3xl lg:text-4xl text-cream uppercase mb-4">
              {part.name}
            </h1>
            <div className="text-2xl font-display font-bold text-gold mb-5">
              {part.price === 'Contact for Price' ? 'Contact for Price' : part.price}
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {part.modelCompatibility.map((m) => (
                <span key={m} className="text-xs px-3 py-1.5 bg-ink-card border border-ink-border text-muted rounded">
                  {m}
                </span>
              ))}
            </div>

            <p className="text-muted text-sm leading-relaxed mb-6">{part.description}</p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <a
                href={buildWhatsAppLink(getWhatsAppMessageForPart(part.name, part.modelCompatibility[0]))}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#25D366] text-white text-sm font-bold rounded hover:bg-[#22c35e] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </a>
              <a
                href={buildCallLink()}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-gold text-ink text-sm font-bold rounded hover:bg-gold-light transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </div>

            {/* Specifications */}
            <div className="bg-ink-card border border-ink-border rounded-lg p-5 mb-6">
              <h3 className="font-display font-semibold text-base text-cream uppercase mb-4">Specifications</h3>
              <div className="space-y-3">
                {part.specifications.map((spec) => (
                  <div key={spec.label} className="flex justify-between text-sm border-b border-ink-border/50 last:border-0 pb-2 last:pb-0">
                    <span className="text-muted">{spec.label}</span>
                    <span className="text-cream font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Compatible Models */}
            <div className="bg-ink-card border border-ink-border rounded-lg p-5">
              <h3 className="font-display font-semibold text-base text-cream uppercase mb-3">Compatible Models</h3>
              <div className="space-y-2">
                {part.modelCompatibility.map((m) => (
                  <div key={m} className="flex items-center gap-2 text-sm text-cream">
                    <Check className="w-4 h-4 text-agri-light" />
                    {m}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Enquiry Form */}
        <div className="mt-12 lg:mt-16">
          <div className="bg-ink-card border border-ink-border rounded-lg p-6 lg:p-8 max-w-2xl mx-auto">
            <h3 className="font-display font-bold text-xl text-cream uppercase mb-2 text-center">Enquire About This Part</h3>
            <p className="text-muted text-sm text-center mb-6">
              Send us your details and we'll get back to you.
            </p>
            <EnquiryForm type="Part" product={part.name} />
          </div>
        </div>

        {/* Related Parts */}
        {relatedParts.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-bold text-2xl text-cream uppercase">Related Parts</h3>
              {category && (
                <Link to={`/tractor-parts?category=${category.id}`} className="group inline-flex items-center gap-1.5 text-sm text-gold">
                  View All in {category.name}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedParts.map((p) => (
                <PartCard key={p.id} part={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
