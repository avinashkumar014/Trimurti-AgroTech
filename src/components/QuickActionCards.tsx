import { Link } from 'react-router-dom';
import { ArrowRight, Wrench, Car, Tag } from 'lucide-react';

const actions = [
  {
    title: 'TRACTOR PARTS',
    desc: 'Find the right parts for your tractor.',
    button: 'Explore Parts',
    to: '/tractor-parts',
    icon: Wrench,
    image: 'https://images.pexels.com/photos/28752152/pexels-photo-28752152.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    title: 'BUY USED VEHICLES',
    desc: 'Explore quality used tractors and vehicles.',
    button: 'View Inventory',
    to: '/used-vehicles',
    icon: Car,
    image: 'https://images.pexels.com/photos/11612188/pexels-photo-11612188.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    title: 'SELL YOUR VEHICLE',
    desc: 'Want to sell your old tractor or vehicle?',
    button: 'Sell Now',
    to: '/sell-your-vehicle',
    icon: Tag,
    image: 'https://images.pexels.com/photos/5958736/pexels-photo-5958736.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
];

export function QuickActionCards() {
  return (
    <div className="reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
      {actions.map((action) => (
        <Link
          key={action.title}
          to={action.to}
          className="group relative bg-ink-card border border-ink-border rounded-lg overflow-hidden hover:border-gold/40 transition-all duration-300 hover:-translate-y-1.5"
        >
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src={action.image}
              alt={action.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-card via-ink-card/40 to-transparent" />
            <div className="absolute top-4 left-4 w-10 h-10 bg-gold/90 rounded flex items-center justify-center">
              <action.icon className="w-5 h-5 text-ink" />
            </div>
          </div>
          <div className="p-5">
            <h3 className="font-display font-bold text-xl text-cream mb-1.5 uppercase">{action.title}</h3>
            <p className="text-sm text-muted mb-4">{action.desc}</p>
            <div className="inline-flex items-center gap-2 text-sm font-medium text-gold group-hover:gap-3 transition-all">
              {action.button}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
