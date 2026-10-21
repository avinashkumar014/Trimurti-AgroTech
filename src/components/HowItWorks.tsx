const steps = [
  { num: '01', title: 'FIND', desc: 'Find the tractor part or vehicle you need.' },
  { num: '02', title: 'ENQUIRE', desc: 'Call or WhatsApp our team.' },
  { num: '03', title: 'INSPECT', desc: 'Check the part or vehicle and confirm details.' },
  { num: '04', title: 'DEAL', desc: 'Finalize the purchase or sale.' },
];

export function HowItWorks() {
  return (
    <div className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 relative">
      {steps.map((step, i) => (
        <div key={step.num} className="relative">
          <div className="bg-ink-card border border-ink-border rounded-lg p-6 text-center hover:border-gold/30 transition-all duration-300 h-full">
            <div className="font-display font-bold text-4xl text-gold/20 mb-2">{step.num}</div>
            <h3 className="font-display font-bold text-lg text-cream mb-2 uppercase">{step.title}</h3>
            <p className="text-sm text-muted leading-relaxed">{step.desc}</p>
          </div>
          {i < steps.length - 1 && (
            <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-ink-border z-10" />
          )}
        </div>
      ))}
    </div>
  );
}
