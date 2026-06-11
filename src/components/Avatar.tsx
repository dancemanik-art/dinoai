import Image from "next/image";

export default function Avatar({
  size = 40,
  ring = true,
  className = "",
}: {
  size?: number;
  ring?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`relative inline-flex shrink-0 overflow-hidden rounded-full ${
        ring ? "ring-1 ring-gold/45" : ""
      } ${className}`}
      style={{
        width: size,
        height: size,
        background:
          "radial-gradient(circle at 50% 30%, rgba(201,162,75,0.22), #15171c 70%)",
      }}
    >
      <Image
        src="/mascot/avatar.png"
        alt="DINO AI"
        fill
        quality={95}
        sizes="160px"
        className="scale-[1.12] object-cover object-top"
      />
    </span>
  );
}
