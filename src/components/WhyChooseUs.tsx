import { Wrench, Car, Handshake, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: Wrench,
    title: 'GENUINE PARTS',
    desc: 'Quality-focused tractor parts for your repair and maintenance needs.',
  },
  {
    icon: Car,
    title: 'WIDE INVENTORY',
    desc: 'Explore tractor parts and used vehicles in one place.',
  },
  {
    icon: Handshake,
    title: 'FAIR DEALS',
    desc: 'Clear communication and practical buying and selling assistance.',
  },
  {
    icon: ShieldCheck,
    title: 'TRUSTED SERVICE',
    desc: 'Personal assistance from enquiry to final deal.',
  },
];

export function WhyChooseUs() {
  return (
    <div className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {features.map((f) => (
        <div
          key={f.title}
          className="bg-ink-card border border-ink-border rounded-lg p-6 hover:border-gold/30 transition-all duration-300 group"
        >
          <div className="w-12 h-12 bg-gold/10 border border-gold/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gold/15 transition-colors">
            <f.icon className="w-6 h-6 text-gold" />
          </div>
          <h3 className="font-display font-bold text-base text-cream mb-2 uppercase">{f.title}</h3>
          <p className="text-sm text-muted leading-relaxed">{f.desc}</p>
        </div>
      ))}
    </div>
  );
}
