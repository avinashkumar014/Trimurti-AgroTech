interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}

export function SectionHeading({ eyebrow, title, subtitle, center = true }: SectionHeadingProps) {
  return (
    <div className={`mb-8 lg:mb-12 ${center ? 'text-center mx-auto max-w-2xl' : 'max-w-2xl'}`}>
      {eyebrow && (
        <div className={`text-gold text-xs font-display font-semibold uppercase tracking-widest mb-3 ${center ? '' : ''}`}>
          {eyebrow}
        </div>
      )}
      <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-cream uppercase leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted text-base lg:text-lg mt-4 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
