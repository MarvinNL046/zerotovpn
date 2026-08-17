import Image from "next/image";
import { Shield, CheckCircle, ExternalLink } from "lucide-react";
import { isAffiliateUrl } from "@/lib/blog-content";

// Named editorial profile used on reviewed blog articles.
export const AUTHOR = {
  name: "Marvin Smit",
  role: "Editor, ZeroToVPN",
  bio: "Marvin checks sources, dates and limitations so VPN claims remain clear about what was documented, observed or not yet tested.",
  credentials: [
    "Sources and dates checked",
    "Limitations shown",
    "Corrections welcome",
  ],
  avatar: "/images/team/marvin.webp",
  url: "https://www.zerotovpn.com/authors/marvin-smit",
  sameAs: [],
};

export function AuthorBox() {
  return (
    <div className="border rounded-xl p-6 bg-muted/30 mt-12">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <Image
          src="/images/team/marvin.webp"
          alt={AUTHOR.name}
          width={64}
          height={64}
          className="shrink-0 w-16 h-16 rounded-full object-cover"
        />

        <div className="flex-1 min-w-0">
          {/* Name & Role */}
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-lg">{AUTHOR.name}</h3>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 dark:bg-green-950/30 px-2 py-0.5 rounded-full">
              <CheckCircle className="h-3 w-3" />
              Editorial profile
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">{AUTHOR.role}</p>

          {/* Bio */}
          <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
            {AUTHOR.bio}
          </p>

          {/* Credentials */}
          <div className="flex flex-wrap gap-3 mt-3">
            {AUTHOR.credentials.map((cred) => (
              <span
                key={cred}
                className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-background border rounded-md px-2 py-1"
              >
                <CheckCircle className="h-3 w-3 text-primary" />
                {cred}
              </span>
            ))}
          </div>

          {/* Link to the named editorial profile */}
          <a
            href={AUTHOR.url}
            className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-3"
          >
            Read Marvin&apos;s editorial profile
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}

// Fact-checked banner shown at top of articles
export function FactCheckedBadge({ lastUpdated }: { lastUpdated: string }) {
  return (
    <div className="flex items-center gap-3 text-sm text-muted-foreground flex-wrap">
      <span className="inline-flex items-center gap-1.5 font-medium text-green-600 dark:text-green-400">
        <CheckCircle className="h-4 w-4" />
        Fact-checked
      </span>
      <span className="text-muted-foreground/50">|</span>
      <span>
        Written by{" "}
        <a
          href={AUTHOR.url}
          className="text-foreground font-medium hover:underline"
        >
          {AUTHOR.name}
        </a>
      </span>
      <span className="text-muted-foreground/50">|</span>
      <span>Last updated: {lastUpdated}</span>
    </div>
  );
}

// Sources section at the bottom of articles
export function SourcesSection({ content }: { content: string }) {
  // Extract external links from the HTML content
  const linkRegex =
    /<a\s+href="(https?:\/\/(?!zerotovpn\.com)[^"]+)"[^>]*>([^<]+)<\/a>/g;
  const sources: Array<{ url: string; text: string }> = [];
  const seen = new Set<string>();

  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    const url = match[1];
    const domain = new URL(url).hostname.replace("www.", "");
    if (!seen.has(domain)) {
      seen.add(domain);
      sources.push({ url, text: match[2] });
    }
  }

  if (sources.length === 0) return null;

  return (
    <div className="border-t pt-8 mt-12">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Shield className="h-5 w-5 text-primary" />
        Sources & References
      </h2>
      <p className="text-sm text-muted-foreground mb-4">
        This article is based on independently verified sources. We do not
        accept payment for rankings or reviews.
      </p>
      <ol className="list-decimal list-inside space-y-2">
        {sources.map((source, i) => (
          <li key={i} className="text-sm text-muted-foreground">
            <a
              href={source.url}
              target="_blank"
              rel={
                isAffiliateUrl(source.url)
                  ? "noopener noreferrer sponsored nofollow"
                  : "noopener noreferrer"
              }
              {...(isAffiliateUrl(source.url)
                ? {
                    "data-affiliate-slug": (() => {
                      try {
                        const parsed = new URL(source.url);
                        const pathSlug = parsed.pathname
                          .split("/")
                          .filter(Boolean)[0];
                        return parsed.hostname === "go.zerotovpn.com" &&
                          pathSlug
                          ? pathSlug
                          : "vpn-provider";
                      } catch {
                        return "vpn-provider";
                      }
                    })(),
                  }
                : {})}
              className="text-primary hover:underline"
            >
              {source.text}
            </a>
            <span className="text-muted-foreground/60 ml-1">
              — {new URL(source.url).hostname.replace("www.", "")}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
