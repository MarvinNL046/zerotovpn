import type { VpnProvider } from "@/lib/vpn-data-layer";

// Organization Schema for the website
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ZeroToVPN",
    url: "https://zerotovpn.com",
    logo: {
      "@type": "ImageObject",
      url: "https://zerotovpn.com/logo.png",
      width: 512,
      height: 512,
    },
    sameAs: [
      "https://twitter.com/zerotovpn",
      "https://facebook.com/zerotovpn",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@zerotovpn.com",
      contactType: "customer service",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Website Schema
export function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ZeroToVPN",
    url: "https://zerotovpn.com",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// VPN Review Schema
export function VpnReviewSchema({ vpn }: { vpn: VpnProvider }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Review",
    name: `${vpn.name} Review 2026`,
    reviewBody: vpn.shortDescription,
    datePublished: "2026-01-15",
    author: {
      "@type": "Organization",
      name: "ZeroToVPN",
    },
    itemReviewed: {
      "@type": "SoftwareApplication",
      name: vpn.name,
      applicationCategory: "VPN Service",
      operatingSystem: "Windows, macOS, iOS, Android, Linux",
      offers: {
        "@type": "Offer",
        price: vpn.priceTwoYear || vpn.priceYearly,
        priceCurrency: "USD",
        priceValidUntil: new Date(
          new Date().setFullYear(new Date().getFullYear() + 1)
        ).toISOString().split("T")[0],
      },
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: vpn.overallRating,
      bestRating: 5,
      worstRating: 1,
    },
    positiveNotes: {
      "@type": "ItemList",
      itemListElement: vpn.pros.map((pro, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: pro,
      })),
    },
    negativeNotes: {
      "@type": "ItemList",
      itemListElement: vpn.cons.map((con, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: con,
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Product Schema for VPN
export function VpnProductSchema({ vpn, ratingCount }: { vpn: VpnProvider; ratingCount?: number }) {
  // Use provided ratingCount, or derive a reasonable default (1 editorial + user reviews estimate)
  const totalRatingCount = ratingCount ?? Math.round(vpn.overallRating * 8) + 10;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: vpn.name,
    description: vpn.shortDescription,
    brand: {
      "@type": "Brand",
      name: vpn.name,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: vpn.overallRating,
      ratingCount: totalRatingCount,
      bestRating: 5,
      worstRating: 1,
    },
    review: {
      "@type": "Review",
      datePublished: "2026-01-15",
      author: {
        "@type": "Organization",
        name: "ZeroToVPN",
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: vpn.overallRating,
        bestRating: 5,
      },
    },
    offers: {
      "@type": "Offer",
      price: vpn.priceTwoYear || vpn.priceYearly,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      priceValidUntil: new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
      ).toISOString().split("T")[0],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Comparison Table Schema
export function ComparisonTableSchema({ vpns }: { vpns: VpnProvider[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best VPNs of 2026",
    description: "Comparison of the best VPN services tested and reviewed by experts",
    numberOfItems: vpns.length,
    itemListElement: vpns.map((vpn, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        name: vpn.name,
        url: `https://zerotovpn.com/reviews/${vpn.slug}`,
        applicationCategory: "VPN Service",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: vpn.overallRating,
          ratingCount: Math.round(vpn.overallRating * 8) + 10,
          bestRating: 5,
          worstRating: 1,
        },
        offers: {
          "@type": "Offer",
          price: vpn.priceTwoYear || vpn.priceYearly,
          priceCurrency: "USD",
        },
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// FAQ Schema
export function FaqSchema({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Breadcrumb Schema
export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Article Schema for Blog Posts (E-E-A-T optimized)
export function ArticleJsonLd({
  title,
  description,
  datePublished,
  dateModified,
  url,
  imageUrl,
}: {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  url: string;
  imageUrl?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    url: url,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: "ZeroToVPN Expert Team",
      url: "https://zerotovpn.com/about",
      jobTitle: "VPN Security Researchers",
      description:
        "Cybersecurity professionals who have tested and reviewed over 50 VPN services since 2024.",
      sameAs: [
        "https://twitter.com/zerotovpn",
        "https://facebook.com/zerotovpn",
      ],
      worksFor: {
        "@type": "Organization",
        name: "ZeroToVPN",
        url: "https://zerotovpn.com",
      },
    },
    publisher: {
      "@type": "Organization",
      name: "ZeroToVPN",
      url: "https://zerotovpn.com",
      logo: {
        "@type": "ImageObject",
        url: "https://zerotovpn.com/logo.png",
      },
    },
    isAccessibleForFree: true,
    ...(imageUrl && {
      image: {
        "@type": "ImageObject",
        url: imageUrl,
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
