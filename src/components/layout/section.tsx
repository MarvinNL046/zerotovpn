import { cn } from "@/lib/utils";

/**
 * De ontbrekende compositielaag.
 *
 * Elke pagina in deze repo schreef zijn eigen
 * `<section className="py-16 lg:py-24"><div className="container">` uit —
 * 133 paginabestanden, gemiddeld bijna 600 regels. Daardoor kostte elke
 * ontwerpwijziging 133 bewerkingen en liep het ritme per pagina uiteen.
 *
 * Deze drie componenten zijn bewust klein en saai: ze leggen alleen ritme,
 * breedte en koptypografie vast. Alles wat pagina-specifiek is hoort in de
 * children, niet hier.
 */

export function Container({
  children,
  className,
  width = "default",
}: {
  children: React.ReactNode;
  className?: string;
  width?: "default" | "prose" | "wide";
}) {
  return (
    <div
      className={cn(
        "container",
        width === "prose" && "max-w-3xl",
        width === "wide" && "max-w-[1440px]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Section({
  children,
  className,
  containerClassName,
  width,
  muted = false,
  as: Tag = "section",
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  width?: "default" | "prose" | "wide";
  /** Wisselende achtergrondband, zoals de bestaande pagina's doen. */
  muted?: boolean;
  as?: "section" | "div" | "article";
}) {
  return (
    <Tag className={cn("section-shell", muted && "bg-muted/30", className)}>
      <Container width={width} className={containerClassName}>
        {children}
      </Container>
    </Tag>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  as: Tag = "h2",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
      <Tag className="section-title">{title}</Tag>
      {lead && (
        <p className={cn("section-lead", align === "center" && "mx-auto")}>
          {lead}
        </p>
      )}
    </div>
  );
}
