import { Link } from "@/i18n/navigation";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  name: string;
  href: string;
}

export interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function BreadcrumbSchema({ items, className = "" }: BreadcrumbSchemaProps) {
  // Always include Home as first item
  const allItems = [{ name: "Home", href: "/" }, ...items];

  // Generate JSON-LD schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": allItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://zerotovpn.com${item.href}`
    }))
  };

  return (
    <nav className={`${className}`} aria-label="Breadcrumb">
      {/* JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Visual Breadcrumbs */}
      <ol className="flex items-center gap-2 text-sm text-muted-foreground">
        {allItems.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {index > 0 && <ChevronRight className="h-4 w-4" />}
            {index === allItems.length - 1 ? (
              <span className="font-medium text-foreground">{item.name}</span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-primary transition-colors flex items-center gap-1"
              >
                {index === 0 && <Home className="h-4 w-4" />}
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
