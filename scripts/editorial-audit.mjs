import { globSync, readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const checks = [
  {
    name: "shared affiliate rel policy",
    file: "src/components/vpn/affiliate-button.tsx",
    patterns: [/sponsored\s+nofollow/, /trackAffiliateClick/, /affiliateSlug/, /data-affiliate-slug/],
  },
  {
    name: "NordVPN affiliate resolver fails closed without approval",
    file: "src/lib/vpn-links.ts",
    patterns: [/VPN_APPROVED_AFFILIATE_IDS/, /AFFILIATE_VPN_NORDVPN_URL/, /approvedAffiliateIds\.has\("nordvpn"\)/, /url\.protocol !== "https:"/, /if \(slug === "nordvpn"\)/],
  },
  {
    name: "shared editorial disclosure",
    file: "src/components/editorial/best-vpn-editorial-template.tsx",
    patterns: [/affiliate links may earn us a commission/, /affiliate-disclosure/],
  },
  {
    name: "shared ranked price-link option",
    file: "src/components/vpn/ranked-vpn-row.tsx",
    patterns: [/priceLink = false/, /AffiliateTextLink/, /priceLink \?/],
  },
  {
    name: "shared table headers expose column scope",
    file: "src/components/ui/table.tsx",
    patterns: [/scope="col"/, /function TableHead/],
  },
  {
    name: "shared comparison prices are tracked inline links",
    file: "src/components/vpn/comparison-table.tsx",
    patterns: [/AffiliateTextLink/, /dataPriceLink/, /vpn\.priceTwoYear/, /TableCaption/, /t\("caption"\)/, /perMonth/],
  },
  {
    name: "Iran evidence-led page",
    file: "src/components/editorial/evidence-led-vpn-use-case-page.tsx",
    patterns: [/Reproducible local check/, /affiliateUrl/, /id=\"faq\"/],
  },
  {
    name: "Telegram evidence-led page",
    file: "src/data/editorial/telegram-vpn-2026.ts",
    patterns: [/MTProxy guide/, /<table>/, /How to test Telegram/, /<h3>Which VPN is best for Telegram\?<\/h3>/, /DataForSEO/],
  },
  {
    name: "Russia cluster evidence",
    file: "src/components/editorial/russia-vpn-editorial-page.tsx",
    patterns: [/Freedom House/, /id=\"faq\"/, /id=\"sources\"/, /IranEditorialQuickPicks/, /scope=\"col\"/, /VPN for Russia 2026: obfuscation/],
  },
  {
    name: "Russia pillar SERP metadata matches censorship intent",
    file: "src/app/[locale]/countries/russia/page.tsx",
    patterns: [/VPN for Russia 2026: Obfuscation, Setup & What to Verify/, /Compare VPN options for Russia by obfuscation, app access and privacy evidence/],
    forbiddenPatterns: [/VPN for Russia in 2026: What to Verify Before You Connect/],
  },
  {
    name: "Russia FAQ reflects current PAA refresh",
    file: "src/components/editorial/russia-vpn-editorial-page.tsx",
    patterns: [/August 13, 2026/, /Which VPNs work in Russia in 2026\?/, /Which VPN supports Russia\?/, /Can you use a VPN in Russia\?/, /fetched August 13, 2026/],
  },
  {
    name: "China cluster evidence",
    file: "src/components/editorial/china-vpn-editorial-page.tsx",
    patterns: [/Freedom House/, /id=\"faq\"/, /id=\"sources\"/, /IranEditorialQuickPicks/],
  },
  {
    name: "Protocol support page",
    file: "src/components/editorial/protocols-editorial-page.tsx",
    patterns: [/WireGuard vs OpenVPN/, /id=\"comparison\"/, /id=\"test-plan\"/, /id=\"faq\"/, /DataForSEO/],
  },
  {
    name: "Best VPN commercial pillar",
    file: "src/components/editorial/best-vpn-pillar-page.tsx",
    patterns: [/Top 3 overview/, /id=\"comparison\"/, /scope=\"col\"/, /id=\"methodology\"/, /id=\"faq\"/, /priceVerifiedAt/, /AffiliateTextLink/, /contentBrief/, /primaryKeyword: \"best vpn\"/, /cluster: \"commercial-choice\"/, /affiliateContext: \"vpn-selection\"/],
  },
  {
    name: "Best VPN commercial pillar covers DataForSEO PAA answers",
    file: "src/components/editorial/best-vpn-pillar-page.tsx",
    patterns: [/Are VPNs worth it in 2026\?/, /What is the best VPN for streaming\?/, /Will Netflix ban me if I use a VPN\?/, /What is the best free VPN for the USA\?/],
  },
  {
    name: "Best VPN English SERP metadata matches commercial intent",
    file: "src/app/[locale]/best/best-vpn/page.tsx",
    patterns: [/Best VPN 2026: Compare Privacy, Streaming & Value Picks/, /Find the best VPN for privacy, streaming, speed or price/],
    forbiddenPatterns: [/Best VPN in 2026: Transparent Shortlist and Comparison/],
  },
  {
    name: "localized protocol guide schema date is not future-dated",
    file: "src/app/[locale]/guides/vpn-protocols-explained/page.tsx",
    patterns: [/dateModified="2026-08-13"/],
    forbiddenPatterns: [/dateModified="2026-11-28"/],
  },
  {
    name: "localized what-is-VPN guide schema date is not future-dated",
    file: "src/app/[locale]/guides/what-is-vpn/page.tsx",
    patterns: [/dateModified="2026-08-13"/],
    forbiddenPatterns: [/dateModified="2026-11-28"/],
  },
  {
    name: "Iran pillar SERP metadata matches censorship intent",
    file: "src/data/editorial/iran-vpn-2026.ts",
    patterns: [/Best VPN for Iran 2026: Tested Options & Setup Limits/, /Compare obfuscation, app access and privacy evidence for Iran/],
    forbiddenPatterns: [/Best VPN for Iran in 2026: tested options, limits and safer preparation/],
  },
  {
    name: "shared editorial content-brief contract",
    file: "src/lib/editorial-content-brief.ts",
    patterns: [/primaryKeyword/, /intent/, /cluster/, /lastReviewedAt/, /evidence/, /affiliateContext/, /schemaType/, /isEditorialContentBrief/],
  },
  {
    name: "cluster page briefs stay centralized",
    file: "src/lib/editorial-content-briefs.ts",
    patterns: [/china:/, /freeVpn:/, /travel:/, /restrictedNetworks:/, /obfuscation:/, /protocols:/, /russia:/, /telegram:/, /censorship-restricted-networks/, /protocol-and-technical-literacy/, /travel-and-public-wifi/],
  },
  {
    name: "Russia brief freshness and dossier path",
    file: "src/lib/editorial-content-briefs.ts",
    patterns: [/russia:[\s\S]*lastReviewedAt: "2026-08-13"/, /dataforseo-russia-cluster-2026-08-13\.md/],
  },
  {
    name: "shared quick-pick cards expose branded provider marks and plan context",
    file: "src/components/editorial/best-vpn-editorial-template.tsx",
    patterns: [/data-provider-mark="true"/, /alt=\{`\$\{vpn\.name\} logo`\}/, /data-plan-context="true"/, /data-price-freshness="true"/, /Long-term plan equivalent/, /refund window/],
  },
  {
    name: "localized Best VPN routes avoid retired performance claims",
    file: "src/app/[locale]/best/best-vpn/page.tsx",
    patterns: [/BestVpnPillarPage vpns=\{allVpns\}/, /Repeatable test notes/, /Comparamos una amplia selección/],
    forbiddenPatterns: [/35\+|35以上|35개 이상|35款以上|plus de 35|über 35|มากกว่า 35/i, /500\+|500回|500회|500多次|plus de 500|über 500|มากกว่า 500/i, /6,730|7,000\+.*118|24\/7/],
  },
  {
    name: "streaming pillar avoids unsupported provider-count claims",
    file: "src/app/[locale]/best/vpn-streaming/page.tsx",
    patterns: [/current provider documentation/, /actuele providerinformatie/, /fünf VPN-Anbieter/, /cinco proveedores/, /cinq fournisseurs/],
    forbiddenPatterns: [/50\+ VPN|over 50 VPN|more than 50 VPN|plus de 50 VPN|uber 50 VPN|mas de 50 VPN/i],
  },
  {
    name: "localized Iran blog routes use the evidence-led body",
    file: "src/app/[locale]/blog/[slug]/page.tsx",
    patterns: [/iranVpnEditorialContent/, /const articleContent = isIranEditorial/, /iranContentBrief/, /best vpn for iran/, /censorship-restricted-networks/, /brief=\{isIranEditorial \? iranContentBrief : isTelegramEditorial \? editorialContentBriefs\.telegram : isConnectionDropsEditorial \? connectionDropsContentBrief : isServerLocationEditorial \? serverLocationContentBrief : isIspPrivacyEditorial \? ispPrivacyContentBrief : isBraveVpnEditorial \? braveVpnContentBrief : undefined\}/],
    forbiddenPatterns: [/articleContent = isRestrictedAffiliateContext\s*\?\s*verwijderAffiliateLinks\(post\.content\)/i],
  },
  {
    name: "about page uses verifiable trust signals",
    file: "src/app/[locale]/about/page.tsx",
    patterns: [/Current provider records/, /Reproducible test plan/, /Sources and dated notes/, /Publication locales/, /separates provider documentation/],
    forbiddenPatterns: [/100K\+|100,000\+|Monthly Readers|monthly readers|50\+|over 50|tested and reviewed over 50|500\+|200\+/i],
  },
  {
    name: "Linux use-case page avoids unsupported test counts",
    file: "src/app/[locale]/best/vpn-linux/page.tsx",
    patterns: [/We compare several VPNs for Linux/, /We vergelijken meerdere VPN-providers op Linux/],
    forbiddenPatterns: [/35\+|35以上|35개|35个|über 35|más de 35|plus de 35|มากกว่า 35/i],
  },
  {
    name: "Windows use-case page avoids unsupported test counts",
    file: "src/app/[locale]/best/vpn-windows/page.tsx",
    patterns: [/We compare several VPNs for Windows/, /We vergelijken meerdere VPN-providers op Windows/],
    forbiddenPatterns: [/35\+|35以上|35개|35个|über 35|más de 35|plus de 35|มากกว่า 35/i],
  },
  {
    name: "laptop use-case page avoids unsupported test counts",
    file: "src/app/[locale]/best/vpn-laptops/page.tsx",
    patterns: [/We compare several VPNs for laptops/, /We vergelijken meerdere VPN-providers voor laptopgebruik/],
    forbiddenPatterns: [/35\+|35以上|35개|35个|über 35|más de 35|plus de 35|มากกว่า 35/i],
  },
  {
    name: "privacy use-case page avoids unsupported test counts",
    file: "src/app/[locale]/best/vpn-privacy/page.tsx",
    patterns: [/We compare several VPNs for privacy/, /We vergelijken meerdere VPN-providers op privacybescherming/],
    forbiddenPatterns: [/35\+|35以上|35개|35个|über 35|más de 35|plus de 35|มากกว่า 35/i],
  },
  {
    name: "gaming use-case page avoids unsupported test counts",
    file: "src/app/[locale]/best/vpn-gaming/page.tsx",
    patterns: [/Compare current VPN provider records for gaming performance/, /We vergelijken meerdere VPN-providers voor gaming/, /Do VPNs really work for gaming\?/, /Will a VPN slow down gaming\?/],
    forbiddenPatterns: [/35\+|35以上|35개|35个|über 35|más de 35|plus de 35|มากกว่า 35|We tested 12 VPNs/i],
  },
  {
    name: "gaming page PAA evidence and bounded latency copy",
    file: "src/app/[locale]/best/vpn-gaming/page.tsx",
    patterns: [/Do VPNs really work for gaming\?/, /Will a VPN slow down gaming\?/, /DataForSEO US\/English intent dossier fetched August 13, 2026/],
  },
  {
    name: "connection-drops page uses PAA-led bounded troubleshooting copy",
    file: "src/data/editorial/connection-drops-2026.ts",
    patterns: [/How do I stop my VPN from disconnecting\?/, /Why won't my VPN stay on\?/, /Why does my VPN keep disconnecting and reconnecting on iPhone\?/, /Why is my VPN killing my internet connection\?/, /VPN disconnection diagnosis checklist/, /2026/],
    forbiddenPatterns: [/approximately\s+\d+%|\b\d+%\s+of\s+(?:VPN|users|cases)/i, /permanent guarantee|will stay connected/i],
  },
  {
    name: "connection-drops blog route uses the audited editorial override",
    file: "src/app/[locale]/blog/[slug]/page.tsx",
    patterns: [/connectionDropsEditorialTitle/, /connectionDropsContentBrief/, /connectionDropsEditorialFaq/, /technicalClusterLinks/, /isConnectionDropsEditorial/],
  },
  {
    name: "server-location page uses PAA-led bounded location copy",
    file: "src/data/editorial/server-location-2026.ts",
    patterns: [/What country should I set my VPN to\?/, /Which country server is fastest for a VPN\?/, /Which country is best for using a VPN for streaming\?/, /Can the FBI track someone using a VPN\?/, /VPN server location decision guide/, /2026/],
    forbiddenPatterns: [/50\+ server locations|tested 50\+/i, /permanent-unblocking guarantee/i],
  },
  {
    name: "server-location blog route uses the audited editorial override",
    file: "src/app/[locale]/blog/[slug]/page.tsx",
    patterns: [/serverLocationEditorialTitle/, /serverLocationContentBrief/, /serverLocationEditorialFaq/, /locationClusterLinks/, /isServerLocationEditorial/],
  },
  {
    name: "ISP privacy page uses PAA-led bounded privacy copy",
    file: "src/data/editorial/isp-privacy-2026.ts",
    patterns: [/Does a VPN hide everything from your ISP\?/, /Can my ISP see if I am using a VPN\?/, /How can I prevent my ISP from seeing my browsing history\?/, /Can the FBI track you with a VPN\?/, /What an ISP can and cannot usually see through a VPN/, /2026/],
    forbiddenPatterns: [/70% of internet users|5-15%|impossible to break|military organizations/i, /makes you untraceable/i],
  },
  {
    name: "ISP privacy blog route uses the audited editorial override",
    file: "src/app/[locale]/blog/[slug]/page.tsx",
    patterns: [/ispPrivacyEditorialTitle/, /ispPrivacyContentBrief/, /ispPrivacyEditorialFaq/, /ispPrivacyClusterLinks/, /isIspPrivacyEditorial/],
  },
  {
    name: "Brave VPN page uses PAA-led bounded pricing copy",
    file: "src/data/editorial/brave-vpn-2026.ts",
    patterns: [/Does Brave automatically have a VPN\?/, /Does Brave VPN work for free\?/, /Can Brave VPN be trusted\?/, /Is it safe to use Brave VPN\?/, /What is included with Brave and what requires a separate VPN product/, /2026/],
    forbiddenPatterns: [/300\+.*40\+ countries|7,400\+|\$3\.39|\$2\.49|99\.99/i, /permanent free tier.*guarantee/i],
  },
  {
    name: "Brave VPN blog route uses the audited editorial override",
    file: "src/app/[locale]/blog/[slug]/page.tsx",
    patterns: [/braveVpnEditorialTitle/, /braveVpnContentBrief/, /braveVpnEditorialFaq/, /braveVpnClusterLinks/, /isBraveVpnEditorial/],
  },
  {
    name: "Chromebook use-case page avoids unsupported test counts",
    file: "src/app/[locale]/best/vpn-chromebook/page.tsx",
    patterns: [/We vergelijken meerdere VPN-providers voor Chromebook-compatibiliteit/],
    forbiddenPatterns: [/35\+|35以上|35개|35个|über 35|más de 35|plus de 35|มากกว่า 35/i],
  },
  {
    name: "macOS use-case metadata avoids unsupported test counts",
    file: "src/app/[locale]/best/vpn-macos/page.tsx",
    patterns: [/Compare current macOS VPN picks/, /Native Apps, M1\/M2/],
    forbiddenPatterns: [/35\+|35ä»¥ä¸Š|35ê°œ|35ä¸ª|Ã¼ber 35|mÃ¡s de 35|plus de 35|à¸¡à¸²à¸à¸à¸§à¹ˆà¸² 35/i],
  },
  {
    name: "Nvidia Shield article qualifies speed evidence",
    file: "src/content/blog/best-vpn-for-nvidia-shield-2026.md",
    patterns: [/March 2026 Shield TV run/, /Results vary with the device/],
    forbiddenPatterns: [/94%.*speed retention|speed retention.*94%/i],
  },
  {
    name: "Nvidia Shield rendered record stays evidence-bounded",
    file: "src/data/posts/en/best-vpn-for-nvidia-shield-2026.json",
    patterns: [/dated speed observations/, /March 2026 Shield TV run/, /Results vary with the device/],
    forbiddenPatterns: [/We tested over 10 VPN providers/i, /Speed retention hit 94%/i],
  },
  {
    name: "BBC iPlayer article avoids unsupported provider counts",
    file: "src/content/blog/best-vpn-for-bbc-iplayer-2026.md",
    patterns: [/current provider records/, /remaining providers we checked/],
    forbiddenPatterns: [/38 VPN|tested 38|38\+ VPN/i],
  },
  {
    name: "BBC iPlayer rendered record avoids unsupported provider counts",
    file: "src/data/posts/en/best-vpn-for-bbc-iplayer-2026.json",
    patterns: [/current provider records/, /remaining providers we checked/],
    forbiddenPatterns: [/38 VPN|tested 38|38\+ VPN/i],
  },
  {
    name: "Torrenting Reddit article avoids unsupported provider counts",
    file: "src/content/blog/best-vpn-for-torrenting-reddit-2026.md",
    patterns: [/current provider evidence/],
    forbiddenPatterns: [/38\+ VPN/i],
  },
  {
    name: "Torrenting Reddit rendered record avoids unsupported provider counts",
    file: "src/data/posts/en/best-vpn-for-torrenting-reddit-2026.json",
    patterns: [/current provider evidence/],
    forbiddenPatterns: [/38\+ VPN/i],
  },
  {
    name: "Biometric payment article qualifies provider evidence",
    file: "src/data/posts/en/vpn-biometric-payment-fingerprint-identity-leak-2026.json",
    patterns: [/multiple VPN providers/, /multiple VPN providers; some claims/],
    forbiddenPatterns: [/50\+ VPN|35\+ VPN/i],
  },
  {
    name: "shared author credentials stay evidence-bounded",
    file: "src/components/blog/author-box.tsx",
    patterns: [/documented provider checks/, /Current provider records/, /Dated speed & security checks/],
    forbiddenPatterns: [/50\+ VPN|over 50 VPN|VPN services tested/i],
  },
  {
    name: "homepage evidence-bounded recommendation",
    file: "src/app/[locale]/page.tsx",
    patterns: [/Shortlist candidate/, /catalog data and documented options/, /Provider-stated countries/, /Refund window in catalog/],
    forbiddenPatterns: [/After testing 38\+ VPNs/, /consistently ranks #1/, /94%.*Speed Retention/, /4\.8\/5.*Our Rating/, /50\+/, /100K\+/, /500\+ speed tests/, /24\/7.*Updated/],
  },
  {
    name: "Obfuscation support page",
    file: "src/components/editorial/obfuscation-editorial-page.tsx",
    patterns: [/What is VPN obfuscation\?/, /id=\"compare\"/, /id=\"test-plan\"/, /id=\"faq\"/, /DataForSEO/],
  },
  {
    name: "Restricted network support page",
    file: "src/components/editorial/restricted-networks-editorial-page.tsx",
    patterns: [/Not every restriction is a VPN problem/, /id=\"restriction-types\"/, /id=\"prepare\"/, /id=\"test-plan\"/, /id=\"faq\"/, /DataForSEO/],
  },
  {
    name: "Travel support page",
    file: "src/components/editorial/travel-editorial-page.tsx",
    patterns: [/What a travel VPN can/, /id="prepare"/, /id="compare"/, /id="faq"/, /travel.state.gov/, /DataForSEO/],
  },
  {
    name: "Free VPN support page template",
    file: "src/components/editorial/free-vpn-editorial-page.tsx",
    patterns: [/freeVpnCopy/, /FreeTierCard/, /id="free-tiers"/, /id="safety"/, /id="faq"/, /editorialContentBriefs\.freeVpn/],
  },
  {
    name: "Free VPN localized evidence copy",
    file: "src/components/editorial/free-vpn-copy.ts",
    patterns: [/what is actually free/, /Meilleurs VPN gratuits/, /Mejores VPN gratis/, /protonvpn.com\/free-vpn/, /DataForSEO/, /100% free/, /Updated August 13, 2026/, /What’s the best free VPN right now\?/, /fetched August 13, 2026/],
  },
  {
    name: "cheap VPN page exposes tracked inline prices",
    file: "src/app/[locale]/best/vpn-cheap/page.tsx",
    patterns: [/AffiliateTextLink/, /price=\{item\.vpn \?/, /monthlyPrice/, /Price Comparison Table/],
  },
  {
    name: "cheap VPN pillar SERP metadata and table semantics",
    file: "src/app/[locale]/best/vpn-cheap/page.tsx",
    patterns: [/Best Cheap VPNs \(\$\{shortMonthYear\}\): Cheapest Plans Compared/, /Compare the best cheap VPNs under \$3\/month by plan price/, /<caption className="sr-only">Cheap VPN price comparison<\/caption>/, /scope="col"/],
    forbiddenPatterns: [/5 Cheapest VPNs \(\$\{shortMonthYear\}\) — Tested, From \$1\.99\/mo \| ZeroToVPN/],
  },
  {
    name: "free-trial pillar SERP metadata and table semantics",
    file: "src/app/[locale]/best/vpn-free-trial/page.tsx",
    patterns: [/Best VPN Free Trials \(\$\{m\}\): 7-Day & No-Card Options/, /Compare genuine VPN free trials, 7-day options and no-card tests/, /<caption className=\"sr-only\">VPN free trial comparison<\/caption>/, /scope=\"col\"/, /dateModified=\"2026-08-13\"/, /Last reviewed: 13 August 2026/, /Which VPN has a 30-day free trial\?/, /Which VPN gives you a free trial\?/, /Is there any 100% free VPN\?/],
    forbiddenPatterns: [/VPNs With a Real Free Trial \(\$\{m\}\) — Checked at Source/],
  },
  {
    name: "free-trial provider terms are dated and distinguish Nord plan eligibility",
    file: "src/lib/vpn-trials.ts",
    patterns: [/13 augustus 2026/, /slug: "nordvpn"/, /dagen: 7/, /1- en 2-jaarsplannen/, /risk-free-vpn\/free-trial-site/],
  },
  {
    name: "port-forwarding comparison SERP metadata and cluster link",
    file: "src/app/[locale]/best/vpn-port-forwarding/page.tsx",
    patterns: [/Best VPNs With Port Forwarding \(\$\{m\}\): Providers Compared/, /Looking for a VPN with port forwarding\? Compare Proton VPN/, /title: "Best VPNs With Port Forwarding"/, /guides\/vpn-protocols-explained/, /Is there a free VPN that offers port forwarding\?/, /How do I set up port forwarding with a VPN\?/, /Do VPNs use port 443\?/, /Does a static IP automatically include port forwarding\?/],
    forbiddenPatterns: [/VPNs With Port Forwarding \(\$\{m\}\) — Who Still Has It/],
  },
  {
    name: "torrenting page preserves affiliate boundary",
    file: "src/app/[locale]/best/vpn-torrenting/page.tsx",
    patterns: [/affiliateUrl=""/],
    forbiddenPatterns: [/priceLink/],
  },
  {
    name: "localized free VPN routes use the evidence-led template",
    file: "src/app/[locale]/best/free-vpn/page.tsx",
    patterns: [/All locales use the same audited template/, /<FreeVpnEditorialPage locale=\{locale\} \/>/, /Limits and Trade-offs/],
    forbiddenPatterns: [/99%/, /20\+ free VPNs/, /No Hidden Costs|Geen Verborgen Kosten|Keine Versteckten Kosten/i],
  },
  {
    name: "retired free VPN translations are not serialized to clients",
    file: "src/app/[locale]/layout.tsx",
    patterns: [/const clientMessages = \{ \.\.\.messages \}/, /delete clientMessages\.freeVpn/, /messages=\{clientMessages\}/],
  },
  {
    name: "retired promotion payloads are not serialized to clients",
    file: "src/app/[locale]/layout.tsx",
    patterns: [/delete clientMessages\.exitIntent/, /delete clientMessages\.exitPopup/, /delete clientMessages\.couponsPage/, /clientMessages\.stickyBar = \{ dismiss:/],
  },
  {
    name: "retired homepage trust claims are not serialized to clients",
    file: "src/app/[locale]/layout.tsx",
    patterns: [/delete clientMessages\.home\?\.trustIndicators/],
  },
  {
    name: "newsletter-only exit intent popup",
    file: "src/components/conversion/exit-intent-popup.tsx",
    patterns: [/useTranslations\("newsletter"\)/, /<NewsletterForm[^>]+source="exit-intent"/, /data-email-collection-only="true"/, /Owned-media newsletter prompt/],
    forbiddenPatterns: [
      /go\.zerotovpn\.com|go\.nordvpn\.net|nordvpn\.tpo\.lv/i,
      /affiliateUrl|affiliateHref|coupon|discount|\bpromo(?:code)?\b|cashback|incentive|view deal|buy now/i,
    ],
  },
  {
    name: "restricted affiliate context guard",
    file: "src/app/[locale]/blog/[slug]/page.tsx",
    patterns: [/isRestrictedAffiliateContext/, /verwijderAffiliateLinks\(post\.content\)/, /SourcesSection content=\{articleContent\}/],
  },
  {
    name: "legacy coupon page is blocked from publication",
    file: "src/lib/pipeline/blog-service.ts",
    patterns: [/BLOCKED_PUBLISHED_SLUGS/, /vpn-price-comparison-best-deals/, /if \(BLOCKED_PUBLISHED_SLUGS\.has\(slug\)\) return null/],
  },
  {
    name: "seasonal Black Friday page is blocked from publication",
    file: "src/lib/pipeline/blog-service.ts",
    patterns: [/BLOCKED_PUBLISHED_SLUGS/, /vpn-black-friday-2026/, /if \(BLOCKED_PUBLISHED_SLUGS\.has\(slug\)\) return null/],
  },
  {
    name: "legacy coupon page redirects to compliant value pillar",
    file: "src/lib/blog-redirects.generated.json",
    patterns: [/"source": "\/blog\/vpn-price-comparison-best-deals"/, /"destination": "\/best\/vpn-cheap"/, /"source": "\/:locale\(nl\|de\|es\|fr\|zh\|ja\|ko\|th\)\/blog\/vpn-price-comparison-best-deals"/, /"destination": "\/:locale\/best\/vpn-cheap"/],
  },
  {
    name: "seasonal Black Friday page redirects to compliant value pillar",
    file: "src/lib/blog-redirects.generated.json",
    patterns: [
      /"source": "\/blog\/vpn-black-friday-2026"/,
      /"destination": "\/best\/vpn-cheap"/,
      /"source": "\/:locale\(nl\|de\|es\|fr\|zh\|ja\|ko\|th\)\/blog\/vpn-black-friday-2026"/,
      /"destination": "\/:locale\/best\/vpn-cheap"/,
    ],
  },
  {
    name: "non-commercial sticky CTA guard",
    file: "src/components/conversion/sticky-cta-bar.tsx",
    patterns: [/Link href="\/quiz"/, /site-owned conversion aid/],
    forbiddenPatterns: [
      /go\.zerotovpn\.com|go\.nordvpn\.net|nordvpn\.tpo\.lv/i,
      /affiliateUrl|affiliateHref|coupon|discount|\bpromo(?:code)?\b|cashback|incentive|view deal|buy now/i,
    ],
  },
];

const results = checks.map((check) => {
  const path = resolve(ROOT, check.file);
  const source = readFileSync(path, "utf8");
  const missing = check.patterns.filter((pattern) => !pattern.test(source)).map(String);
  const forbidden = (check.forbiddenPatterns ?? [])
    .filter((pattern) => pattern.test(source))
    .map(String);
  return { ...check, pass: missing.length === 0 && forbidden.length === 0, missing, forbidden };
});

const globalPromotionCopyFiles = [
  "src/app/opengraph-image.tsx",
  "src/app/twitter-image.tsx",
  "src/components/seo/json-ld.tsx",
  "src/app/[locale]/layout.tsx",
];
const globalPromotionCopyFailures = globalPromotionCopyFiles.filter((file) => {
  const source = readFileSync(resolve(ROOT, file), "utf8");
  return /exclusive\s+(?:deals?|offers?)|exclusiv(?:e|es|a|as)\s+(?:deals?|offres?|angebote|ofertas)/i.test(source);
});
results.push({
  name: "global metadata and owned-media copy avoids unassigned exclusive offers",
  file: "src/app/{opengraph-image,twitter-image}.tsx + layout/messages/JSON-LD",
  pass: globalPromotionCopyFailures.length === 0,
  missing: [],
  forbidden: globalPromotionCopyFailures,
});

const trackedCommercialCtaFiles = [
  "src/content/blog/best-vpn-for-ffxiv-2026.md",
  "src/content/blog/best-vpn-for-mlb-tv-2026.md",
  "src/content/blog/best-vpn-for-fortnite-2026.md",
];
const trackedCommercialCtaFailures = trackedCommercialCtaFiles.filter((file) => {
  const source = readFileSync(resolve(ROOT, file), "utf8");
  return !source.includes("https://go.zerotovpn.com/nordvpn") || /https?:\/\/(?:www\.)?nordvpn\.com/i.test(source);
});
results.push({
  name: "commercial use-case NordVPN CTAs use the tracked destination",
  file: "src/content/blog/best-vpn-for-{ffxiv,mlb-tv,fortnite}-2026.md",
  pass: trackedCommercialCtaFailures.length === 0,
  missing: [],
  forbidden: trackedCommercialCtaFailures,
});

const trackedReviewCtaFiles = [
  "src/data/reviews/nordlayer.json",
  "src/data/reviews/perfect-privacy.json",
];
const trackedReviewCtaFailures = trackedReviewCtaFiles.filter((file) => {
  const source = readFileSync(resolve(ROOT, file), "utf8");
  return !source.includes("[NordVPN](https://go.zerotovpn.com/nordvpn)") || source.includes("[NordVPN](https://nordvpn.com)");
});
results.push({
  name: "review alternatives use the tracked NordVPN destination",
  file: "src/data/reviews/{nordlayer,perfect-privacy}.json",
  pass: trackedReviewCtaFailures.length === 0,
  missing: [],
  forbidden: trackedReviewCtaFailures,
});

const reviewTemplateSource = readFileSync(resolve(ROOT, "src/app/[locale]/reviews/[slug]/page.tsx"), "utf8");
results.push({
  name: "review template exposes the methodology link",
  file: "src/app/[locale]/reviews/[slug]/page.tsx",
  pass: /href=\"\/methodology\"/.test(reviewTemplateSource) && /t\(\"methodologyLink\"\)/.test(reviewTemplateSource),
  missing: [],
  forbidden: [],
});

const quantifiedClaimRecords = [
  {
    slug: "vpn-credentials-theft-prevention-2026",
    forbiddenPattern: /\b50\+\s+(?:VPN(?:\s+(?:services?|providers?|apps?)|s?)|services)\b/i,
  },
  {
    slug: "vpn-kill-switch-vs-dns-leak-protection-2026",
    forbiddenPattern: /\b50\+\s+(?:VPN(?:\s+(?:services?|providers?|apps?)|s?)|services)\b/i,
  },
  {
    slug: "best-free-vpns-2026",
    forbiddenPattern: /(?:\b(?:50\+|over\s+50|more\s+than\s+50|mehr\s+als\s+50|plus\s+de\s+50|m(?:\u00E1|\u00C3\u00A1)s\s+de\s+50|meer\s+dan\s+50)\s+(?:VPN(?:s|\s+(?:services?|providers?|apps?))?|services?|servicios?|diensten?)\b|50\u4ee5\u4e0a\u306e(?:VPN|\u30b5\u30fc\u30d3\u30b9)|50\uac1c\s+\uc774\uc0c1\uc758\s+(?:VPN|\uc11c\ube44\uc2a4)|(?:\u0e01\u0e27\u0e48\u0e32|\u0e21\u0e32\u0e01\u0e01\u0e27\u0e48\u0e32)\s*50\s*(?:\u0e15\u0e31\u0e27|\u0e1a\u0e23\u0e34\u0e01\u0e32\u0e23|\u0e23\u0e32\u0e22)|50\u591a[\u6b3e\u79cd]?VPN)/iu,
  },
];
const postLocaleDirs = readdirSync(resolve(ROOT, "src/data/posts"), { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

const legacyPromotionFiles = [
  "src/content/blog/best-free-vpn-reddit-2026.md",
  "src/content/blog/is-brave-vpn-free-2026.md",
  ...postLocaleDirs.flatMap((locale) => [
    resolve(ROOT, "src/data/posts", locale, "best-free-vpn-reddit-2026.json"),
    resolve(ROOT, "src/data/posts", locale, "is-brave-vpn-free-2026.json"),
  ]),
].filter((file) => {
  try {
    readFileSync(resolve(ROOT, file), "utf8");
    return true;
  } catch {
    return false;
  }
});
const legacyPromotionFailures = legacyPromotionFiles.filter((file) =>
  /coupon|\/coupons\/|\b\d{1,3}%\s*off\b/i.test(readFileSync(resolve(ROOT, file), "utf8")),
);
results.push({
  name: "legacy free-VPN pages contain no unassigned coupon promotion",
  file: "src/content/blog/{best-free-vpn-reddit-2026,is-brave-vpn-free-2026}.md + rendered records",
  pass: legacyPromotionFailures.length === 0,
  missing: [],
  forbidden: legacyPromotionFailures.map((file) => file.replace(`${ROOT}\\`, "")),
});

const shieldPromotionFiles = [
  "src/content/blog/best-vpn-for-nvidia-shield-2026.md",
  ...postLocaleDirs.map((locale) => resolve(ROOT, "src/data/posts", locale, "best-vpn-for-nvidia-shield-2026.json")),
].filter((file) => {
  try {
    readFileSync(resolve(ROOT, file), "utf8");
    return true;
  } catch {
    return false;
  }
});
const shieldPromotionFailures = shieldPromotionFiles.filter((file) =>
  /coupon|\/coupons\/|\b\d{1,3}%\s*off\b|\b(?:get|claim)\s+(?:a\s+)?(?:deal|offer)\b/i.test(readFileSync(resolve(ROOT, file), "utf8")),
);
results.push({
  name: "Nvidia Shield guide contains no unassigned coupon promotion",
  file: "src/content/blog/best-vpn-for-nvidia-shield-2026.md + rendered records",
  pass: shieldPromotionFailures.length === 0,
  missing: [],
  forbidden: shieldPromotionFailures.map((file) => file.replace(`${ROOT}\\`, "")),
});

const videoCallPromotionFiles = [
  ...postLocaleDirs.map((locale) => resolve(ROOT, "src/data/posts", locale, "vpn-leaks-video-calls-slack-discord-teams-2026.json")),
].filter((file) => {
  try {
    readFileSync(file, "utf8");
    return true;
  } catch {
    return false;
  }
});
const videoCallPromotionFailures = videoCallPromotionFiles.filter((file) =>
  /\bfree\s+(?:months?|trial)\b/i.test(readFileSync(file, "utf8")),
);
results.push({
  name: "video-call leak guide avoids promotional free-trial language",
  file: "src/data/posts/*/vpn-leaks-video-calls-slack-discord-teams-2026.json",
  pass: videoCallPromotionFailures.length === 0,
  missing: [],
  forbidden: videoCallPromotionFailures.map((file) => file.replace(`${ROOT}\\`, "")),
});

for (const { slug, forbiddenPattern } of quantifiedClaimRecords) {
  const files = postLocaleDirs
    .map((locale) => resolve(ROOT, "src/data/posts", locale, `${slug}.json`))
    .filter((path) => {
      try {
        readFileSync(path, "utf8");
        return true;
      } catch {
        return false;
      }
    });
  const forbiddenFiles = files.filter((path) => forbiddenPattern.test(readFileSync(path, "utf8")));
  results.push({
    name: `${slug} records avoid unsupported provider counts`,
    file: `src/data/posts/*/${slug}.json`,
    pass: forbiddenFiles.length === 0,
    missing: [],
    forbidden: forbiddenFiles.map((path) => path.replace(`${ROOT}\\`, "")),
  });
}

const legacyProviderCountPattern = /(?:\b(?:35|38|50)\+?\s+(?:VPNs?|VPN\s+(?:providers?|services?))\b|\b(?:over|more\s+than)\s+(?:35|38|50)\+?\s+VPN\b|mehr\s+als\s+(?:35|38|50)\+?\s+VPN|plus\s+de\s+(?:35|38|50)\+?\s+VPN|m(?:\u00E1|\u00C3\u00A1)s\s+de\s+(?:35|38|50)\+?\s+VPN|meer\s+dan\s+(?:35|38|50)\+?\s+VPN|(?:35|38|50)\s*\u4ee5\u4e0a\u306e\s*(?:VPN|\u30b5\u30fc\u30d3\u30b9)|(?:35|38|50)\s*\uac1c\s*\uc774\uc0c1\uc758\s*(?:VPN|\uc11c\ube44\uc2a4)|(?:\u0e01\u0e27\u0e48\u0e32|\u0e21\u0e32\u0e01\u0e01\u0e27\u0e48\u0e32)\s*50\s*(?:\u0e15\u0e31\u0e27|\u0e1a\u0e23\u0e34\u0e01\u0e32\u0e23|\u0e23\u0e32\u0e22|VPN)|50\u591a[\u6b3e\u79cd]?VPN)/iu;
const legacyProviderFiles = [
  ...postLocaleDirs.flatMap((locale) => globSync(resolve(ROOT, "src/data/posts", locale, "*.json"))),
  resolve(ROOT, "src/data/posts/index.json"),
  resolve(ROOT, "src/app/[locale]/best/vpn-netflix/page.tsx"),
  resolve(ROOT, "src/app/[locale]/best/vpn-streaming/page.tsx"),
];
const legacyProviderFailures = legacyProviderFiles.filter((path) => legacyProviderCountPattern.test(readFileSync(path, "utf8")));
results.push({
  name: "legacy provider-count corpus stays evidence-bounded",
  file: "src/data/posts/**/*.json + Netflix/streaming route copy",
  pass: legacyProviderFailures.length === 0,
  missing: [],
  forbidden: legacyProviderFailures.map((path) => path.replace(`${ROOT}\\`, "")),
});

const localeFiles = readdirSync(resolve(ROOT, "src/messages"))
  .filter((file) => file.endsWith(".json"))
  .sort();
const popupForbidden = /affiliate|coupon|discount|deal|offer|promo|cashback|incentive|free\s+months?|\b\d{1,3}%\s*off/i;
const popupLocaleFailures = [];
for (const file of localeFiles) {
  const locale = JSON.parse(readFileSync(resolve(ROOT, "src/messages", file), "utf8"));
  const popup = locale.newsletter?.popupTitle && locale.newsletter?.popupSubtitle
    ? `${locale.newsletter.popupTitle} ${locale.newsletter.popupSubtitle}`
    : "";
  if (!popup || popupForbidden.test(popup)) popupLocaleFailures.push(file);
}
results.push({
  name: "newsletter popup copy remains email-only in every locale",
  file: "src/messages/*.json",
  pass: popupLocaleFailures.length === 0,
  missing: popupLocaleFailures.length ? popupLocaleFailures.map((file) => `clean popup copy: ${file}`) : [],
  forbidden: [],
});
const trustCopyFailures = [];
const legacyTrustCopy = /100\s*[,.]?\s*000|100\s*k\+?|100k\+?/iu;
for (const file of localeFiles) {
  const locale = JSON.parse(readFileSync(resolve(ROOT, "src/messages", file), "utf8"));
  const trustCopy = [locale.hero?.trusted, locale.home?.hero?.trusted].filter(Boolean).join(" ");
  if (!trustCopy || legacyTrustCopy.test(trustCopy)) trustCopyFailures.push(file);
}
results.push({
  name: "homepage trust copy stays evidence-bounded in every locale",
  file: "src/messages/*.json (hero.trusted and home.hero.trusted)",
  pass: trustCopyFailures.length === 0,
  missing: trustCopyFailures.length ? trustCopyFailures.map((file) => `neutral trust copy: ${file}`) : [],
  forbidden: [],
});
const failed = results.filter((result) => !result.pass);
console.log(JSON.stringify({ checkedAt: new Date().toISOString(), checked: results.length, passed: results.length - failed.length, failed: failed.length, results: results.map(({ name, file, pass, missing, forbidden }) => ({ name, file, pass, missing, forbidden })) }, null, 2));
if (failed.length) process.exitCode = 1;
