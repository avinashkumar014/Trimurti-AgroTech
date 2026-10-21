export function Testimonials() {
  return (
    <div className="reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-ink-card border border-ink-border border-dashed rounded-lg p-6 text-center"
        >
          <div className="w-12 h-12 mx-auto mb-4 bg-gold/10 border border-gold/20 rounded-full flex items-center justify-center">
            <span className="font-display font-bold text-lg text-gold/60">"</span>
          </div>
          <p className="text-sm text-muted italic mb-4">
            Customer testimonial will be added here.
          </p>
          <div className="h-px w-12 mx-auto bg-ink-border mb-3" />
          <p className="text-xs text-muted">— Customer Name</p>
        </div>
      ))}
    </div>
  );
}
