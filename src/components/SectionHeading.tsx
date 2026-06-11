import Reveal from "./Reveal";

type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "center" | "left";
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: Props) {
  const isCenter = align === "center";
  return (
    <Reveal
      className={`flex flex-col gap-4 ${isCenter ? "items-center text-center mx-auto" : "items-start text-left"} max-w-2xl`}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
          {eyebrow}
        </span>
      )}
      <h2 className="text-balance text-3xl font-extrabold leading-[1.1] tracking-tight text-cream sm:text-4xl md:text-[2.75rem]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-pretty text-base leading-relaxed text-muted sm:text-lg">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
