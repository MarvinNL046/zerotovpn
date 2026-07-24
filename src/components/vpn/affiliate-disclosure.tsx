import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Info } from "lucide-react";

/**
 * Affiliate-disclosure vlak bij de knoppen waar hij hoort.
 *
 * De site had alleen een disclosure onderin de footer, in text-slate-500 op
 * donkerblauw (~3,6:1 contrast). De FTC-richtlijn vraagt om een melding die
 * "clear and conspicuous" is en die je ziet vóórdat je op de affiliate-link
 * klikt — onderaan de pagina, in grijs, na twintig knoppen telt niet.
 *
 * Hergebruikt de bestaande footer.disclaimer-vertaling, dus alle 9 talen
 * hebben meteen de juiste tekst.
 */
export async function AffiliateDisclosure({
  variant = "inline",
  tone = "default",
  className = "",
}: {
  variant?: "inline" | "card";
  /** "onDark" voor de donkere hero's, waar de thema-tokens niet gelden. */
  tone?: "default" | "onDark";
  className?: string;
}) {
  const t = await getTranslations("footer");
  const onDark = tone === "onDark";

  if (variant === "inline") {
    return (
      <p
        className={`flex items-start gap-2 text-sm ${
          onDark ? "text-slate-300" : "text-muted-foreground"
        } ${className}`}
      >
        <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
        <span>
          {t("disclaimer")}{" "}
          <Link
            href="/affiliate-disclosure"
            className={`underline underline-offset-2 ${
              onDark ? "hover:text-white" : "hover:text-foreground"
            }`}
          >
            How we fund this site
          </Link>
        </span>
      </p>
    );
  }

  return (
    <aside
      className={`flex items-start gap-3 rounded-lg border border-border bg-muted/40 p-4 text-sm text-muted-foreground ${className}`}
    >
      <Info className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
      <span>
        {t("disclaimer")}{" "}
        <Link
          href="/affiliate-disclosure"
          className="font-medium underline underline-offset-2 hover:text-foreground"
        >
          How we fund this site
        </Link>
      </span>
    </aside>
  );
}
