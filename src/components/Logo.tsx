type LogoProps = {
  withText?: boolean;
  size?: number;
  className?: string;
};

export function LogoMark({ size = 42 }: { size?: number }) {
  return (
    <span
      className="relative inline-flex shrink-0 items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.svg"
        alt="DINO AI"
        className="h-full w-full object-contain"
        draggable={false}
      />
    </span>
  );
}

export default function Logo({ withText = true, size = 42, className = "" }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <LogoMark size={size} />
      {withText && (
        <div className="leading-none">
          <div className="text-lg font-extrabold tracking-wide">
            <span className="text-cream">DINO</span>{" "}
            <span className="text-gold-gradient">AI</span>
          </div>
          <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.25em] text-muted">
            by Daniel Ilek
          </div>
        </div>
      )}
    </div>
  );
}
