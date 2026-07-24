import { Check, X } from "lucide-react";

/**
 * Pros/cons per VPN. Stond op de vergelijkingspagina twee keer woordelijk
 * uitgeschreven (~70 regels dubbel) en op de reviewpagina nog een derde keer
 * in een eigen variant. Eén component, drie plekken.
 */
export function ProsConsCard({
  name,
  pros,
  cons,
  headingLevel: Heading = "h3",
  className = "",
}: {
  name: string;
  pros: string[];
  cons: string[];
  headingLevel?: "h3" | "h4";
  className?: string;
}) {
  return (
    <div className={`rounded-xl border bg-card p-6 ${className}`}>
      <Heading className="mb-6 text-2xl font-bold">{name}</Heading>

      <div className="mb-6">
        <div className="mb-3 flex items-center gap-2">
          <Check className="size-5 text-green-600 dark:text-green-500" aria-hidden="true" />
          <p className="text-lg font-semibold">Pros</p>
        </div>
        <ul className="flex flex-col gap-2">
          {pros.map((pro) => (
            <li key={pro} className="flex items-start gap-2">
              <Check
                className="mt-0.5 size-4 shrink-0 text-green-600 dark:text-green-500"
                aria-hidden="true"
              />
              <span className="text-sm">{pro}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className="mb-3 flex items-center gap-2">
          <X className="size-5 text-red-600 dark:text-red-400" aria-hidden="true" />
          <p className="text-lg font-semibold">Cons</p>
        </div>
        <ul className="flex flex-col gap-2">
          {cons.map((con) => (
            <li key={con} className="flex items-start gap-2">
              <X
                className="mt-0.5 size-4 shrink-0 text-red-600 dark:text-red-400"
                aria-hidden="true"
              />
              <span className="text-sm">{con}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
