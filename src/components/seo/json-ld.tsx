// JSON-LD Structured Data Components for SEO

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ZeroToVPN",
    url: "https://zerotovpn.com",
    logo: "https://zerotovpn.com/logo.png",
    description:
      "Expert VPN reviews, honest comparisons, and exclusive deals on top VPN services.",
    sameAs: [
      // Add social media links when available
      // "https://twitter.com/zerotovpn",
      // "https://facebook.com/zerotovpn",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: "https://zerotovpn.com/contact",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebsiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ZeroToVPN",
    url: "https://zerotovpn.com",
    description:
      "Find the perfect VPN for your needs. Expert reviews, honest comparisons, and exclusive deals.",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ArticleJsonLdProps {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  image?: string;
}

export function ArticleJsonLd({
  title,
  description,
  url,
  datePublished = "2026-01-01",
  dateModified,
  image = "https://zerotovpn.com/og-image.png",
}: ArticleJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    url: url,
    image: image,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Organization",
      name: "ZeroToVPN",
      url: "https://zerotovpn.com",
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
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
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

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQJsonLdProps {
  faqs: FAQItem[];
}

export function FAQJsonLd({ faqs }: FAQJsonLdProps) {
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

interface ProductReviewJsonLdProps {
  name: string;
  description: string;
  image: string;
  url: string;
  rating: number;
  reviewCount?: number;
  price?: string;
  priceCurrency?: string;
}

export function ProductReviewJsonLd({
  name,
  description,
  image,
  url,
  rating,
  reviewCount = 1,
  price,
  priceCurrency = "USD",
}: ProductReviewJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: name,
    description: description,
    image: image,
    url: url,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: rating.toFixed(1),
      bestRating: "10",
      worstRating: "1",
      ratingCount: reviewCount,
    },
    review: {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: rating.toFixed(1),
        bestRating: "10",
        worstRating: "1",
      },
      author: {
        "@type": "Organization",
        name: "ZeroToVPN",
      },
    },
    ...(price && {
      offers: {
        "@type": "Offer",
        price: price,
        priceCurrency: priceCurrency,
        availability: "https://schema.org/InStock",
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

interface SoftwareApplicationJsonLdProps {
  name: string;
  description: string;
  image: string;
  url: string;
  rating: number;
  reviewCount?: number;
  price?: string;
  priceCurrency?: string;
  operatingSystem?: string;
  category?: string;
}

export function SoftwareApplicationJsonLd({
  name,
  description,
  image,
  url,
  rating,
  reviewCount = 1,
  price,
  priceCurrency = "USD",
  operatingSystem = "Windows, macOS, iOS, Android, Linux",
  category = "SecurityApplication",
}: SoftwareApplicationJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: name,
    description: description,
    image: image,
    url: url,
    applicationCategory: category,
    operatingSystem: operatingSystem,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: rating.toFixed(1),
      bestRating: "10",
      worstRating: "1",
      ratingCount: reviewCount,
    },
    review: {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: rating.toFixed(1),
        bestRating: "10",
        worstRating: "1",
      },
      author: {
        "@type": "Organization",
        name: "ZeroToVPN",
      },
    },
    ...(price && {
      offers: {
        "@type": "Offer",
        price: price,
        priceCurrency: priceCurrency,
        availability: "https://schema.org/InStock",
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
