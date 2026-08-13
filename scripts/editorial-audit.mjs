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
    name: "Vietnam country page uses bounded current evidence",
    file: "src/components/editorial/vietnam-vpn-editorial-page.tsx",
    patterns: [/Can you use a VPN in Vietnam\?/, /Which VPN works best in Vietnam\?/, /Is VPN use legal in Vietnam\?/, /Should I install a VPN before travelling to Vietnam\?/, /What to verify before choosing/, /A bounded Vietnam test plan/, /2026/],
    forbiddenPatterns: [/94%|92%|90%|87%|reliably bypass|most restrictive.*Southeast Asia|guarantee.*(bypass|circumvent).*Vietnam/i],
  },
  {
    name: "Vietnam country route uses the audited English editorial component",
    file: "src/app/[locale]/countries/vietnam/page.tsx",
    patterns: [/VietnamVpnEditorialPage/, /locale === "en"/],
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
    name: "French Best VPN pillar uses localized evidence-led structure",
    file: "src/components/editorial/french-best-vpn-pillar-page.tsx",
    patterns: [/Meilleur VPN en 2026/, /id="quick-picks"/, /id="rankings"/, /id="comparison"/, /id="methodology"/, /id="faq"/, /id="sources"/, /meilleur vpn/, /commercial-choice/, /AffiliateTextLink/, /FAQSchema/],
    forbiddenPatterns: [/Tests Indépendants|testé[s]? plus de/i],
  },
  {
    name: "French Best VPN route uses localized editorial component",
    file: "src/app/[locale]/best/best-vpn/page.tsx",
    patterns: [/FrenchBestVpnPillarPage/, /locale === "fr"/, /frenchBestVpnTitle/, /frenchBestVpnDescription/],
  },
  {
    name: "Spanish Best VPN pillar uses localized evidence-led structure",
    file: "src/components/editorial/spanish-best-vpn-pillar-page.tsx",
    patterns: [/Mejor VPN en 2026/, /id="quick-picks"/, /id="rankings"/, /id="comparison"/, /id="methodology"/, /id="faq"/, /id="sources"/, /mejor vpn/, /commercial-choice/, /AffiliateTextLink/, /FAQSchema/],
    forbiddenPatterns: [/Probado y Clasificado/i],
  },
  {
    name: "Spanish Best VPN route uses localized editorial component",
    file: "src/app/[locale]/best/best-vpn/page.tsx",
    patterns: [/SpanishBestVpnPillarPage/, /locale === "es"/, /spanishBestVpnTitle/, /spanishBestVpnDescription/],
  },
  {
    name: "Laptop VPN English route uses bounded device evidence",
    file: "src/components/editorial/laptop-vpn-editorial-page.tsx",
    patterns: [/Best VPNs for Laptops in 2026/, /id="quick-picks"/, /id="comparison"/, /id="setup"/, /id="faq"/, /id="sources"/, /Battery|battery/, /public Wi-Fi/, /DataForSEO/, /AffiliateTextLink/],
    forbiddenPatterns: [/battery impact \(3-5%\)|\(~[0-9]+%\)|Fastest connection speeds|expert-tested/i],
  },
  {
    name: "Laptop route uses audited English editorial component",
    file: "src/app/[locale]/best/vpn-laptops/page.tsx",
    patterns: [/LaptopVpnEditorialPage/, /locale === "en"/, /laptopVpnEditorialTitle/, /laptopVpnEditorialDescription/],
  },
  {
    name: "iPhone VPN English route uses bounded iOS evidence",
    file: "src/components/editorial/iphone-vpn-editorial-page.tsx",
    patterns: [/Best VPNs for iPhone in 2026/, /id="quick-picks"/, /id="comparison"/, /id="setup"/, /id="faq"/, /id="sources"/, /App Store|iOS/, /DataForSEO/, /AffiliateTextLink/],
    forbiddenPatterns: [/battery impact \(~[0-9]+%\)|[0-9]\.[0-9]\/5|Fastest speeds|unlimited devices/i],
  },
  {
    name: "iPhone route uses audited English editorial component",
    file: "src/app/[locale]/best/vpn-iphone/page.tsx",
    patterns: [/IphoneVpnEditorialPage/, /locale === "en"/, /iphoneVpnEditorialTitle/, /iphoneVpnEditorialDescription/],
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
    patterns: [/china:/, /freeVpn:/, /travel:/, /restrictedNetworks:/, /obfuscation:/, /protocols:/, /russia:/, /telegram:/, /bestVpnFr:/, /bestVpnEs:/, /laptopVpn:/, /iphoneVpn:/, /censorship-restricted-networks/, /protocol-and-technical-literacy/, /travel-and-public-wifi/],
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
    patterns: [/iranVpnEditorialContent/, /const articleContent = isIranEditorial/, /iranContentBrief/, /best vpn for iran/, /censorship-restricted-networks/, /brief=\{isIranEditorial[\s\S]*?isFitnessTrackingPrivacyEditorial/],
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
    name: "Linux page uses bounded distro and CLI evidence",
    file: "src/components/editorial/linux-vpn-editorial-page.tsx",
    patterns: [/Best VPNs for Linux in 2026/, /Linux VPN comparison checklist/, /Which VPN has the best Linux support\?/, /Six Linux checks before you subscribe/],
    forbiddenPatterns: [/expert-tested|fastest VPN protocol|military-grade|35\+|stable speeds|best overall Linux VPN/i],
  },
  {
    name: "Linux route uses the audited English editorial component",
    file: "src/app/[locale]/best/vpn-linux/page.tsx",
    patterns: [/LinuxVpnEditorialPage/, /if \(locale === "en"\)/, /linuxVpnEditorialTitle/, /dateModified="2026-08-13"/],
  },
  {
    name: "Windows use-case page avoids unsupported test counts",
    file: "src/app/[locale]/best/vpn-windows/page.tsx",
    patterns: [/We compare several VPNs for Windows/, /We vergelijken meerdere VPN-providers op Windows/],
    forbiddenPatterns: [/35\+|35以上|35개|35个|über 35|más de 35|plus de 35|มากกว่า 35/i],
  },
  {
    name: "Windows page uses bounded OS and app evidence",
    file: "src/components/editorial/windows-vpn-editorial-page.tsx",
    patterns: [/Best VPNs for Windows in 2026/, /Windows VPN comparison checklist/, /Which VPN is best for Windows\?/, /Six Windows checks before you subscribe/],
    forbiddenPatterns: [/expert-tested|fastest protocol|excellent performance|30-day money-back guarantee on all picks|35\+|best overall Windows VPN/i],
  },
  {
    name: "Windows route uses the audited English editorial component",
    file: "src/app/[locale]/best/vpn-windows/page.tsx",
    patterns: [/WindowsVpnEditorialPage/, /if \(locale === "en"\)/, /windowsVpnEditorialTitle/, /dateModified="2026-08-13"/],
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
    patterns: [/privacyVpnEditorialDescription/, /We vergelijken meerdere VPN-providers op privacybescherming/],
    forbiddenPatterns: [/35\+|35以上|35개|35个|über 35|más de 35|plus de 35|มากกว่า 35/i],
  },
  {
    name: "gaming use-case page avoids unsupported test counts",
    file: "src/app/[locale]/best/vpn-gaming/page.tsx",
    patterns: [/gamingVpnEditorialDescription/, /We vergelijken meerdere VPN-providers voor gaming/, /Do VPNs really work for gaming\?/, /Will a VPN slow down gaming\?/],
    forbiddenPatterns: [/35\+|35以上|35개|35个|über 35|más de 35|plus de 35|มากกว่า 35|We tested 12 VPNs/i],
  },
  {
    name: "gaming page PAA evidence and bounded latency copy",
    file: "src/app/[locale]/best/vpn-gaming/page.tsx",
    patterns: [/Do VPNs really work for gaming\?/, /Will a VPN slow down gaming\?/, /DataForSEO US\/English intent dossier fetched August 13, 2026/],
  },
  {
    name: "VPN ping article uses bounded gaming evidence",
    file: "src/data/editorial/vpn-ping-gaming-2026.ts",
    patterns: [/Can a VPN reduce gaming ping\?/, /Will a VPN slow down gaming\?/, /Gaming VPN decision matrix/, /A repeatable five-minute ping test/, /DataForSEO gaming dossier/, /2026/],
    forbiddenPatterns: [/10-20ms|30-50ms|reduced ping by|tested multiple VPNs|guarantee.*ping/i, /lowest ping|fastest VPN.*gaming/i],
  },
  {
    name: "VPN ping article blog route uses the audited editorial override",
    file: "src/app/[locale]/blog/[slug]/page.tsx",
    patterns: [/vpnPingGamingEditorialTitle/, /vpnPingGamingEditorialContent/, /vpnPingGamingEditorialFaq/, /gamingLatencyClusterLinks/, /isGamingLatencyEditorial/, /editorialContentBriefs\.vpnPingGaming/],
  },
  {
    name: "speed-test page uses bounded measurement evidence",
    file: "src/components/editorial/vpn-speed-test-editorial-page.tsx",
    patterns: [/What this test measures/, /How to compare a VPN fairly/, /id="metrics"/, /id="compare"/, /id="faq"/, /id="sources"/, /Cloudflare/, /DataForSEO/],
    forbiddenPatterns: [/10.?20%|30.?50%|accurate picture of the performance cost|fastest VPNs for your speed/i],
  },
  {
    name: "speed-test route uses the audited English editorial override",
    file: "src/app/[locale]/speed-test/page.tsx",
    patterns: [/VpnSpeedTestEditorialPage/, /locale === "en"/, /vpnSpeedTestEditorialTitle/, /vpnSpeedTestEditorialExcerpt/],
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
    name: "VPN leak-testing guide uses bounded tool-comparison copy",
    file: "src/data/editorial/vpn-leak-testing-tools-2026.ts",
    patterns: [/What is the best way to test a VPN for leaks\?/, /How do I know if I have a DNS leak\?/, /Can WebRTC leak my real IP address\?/, /Is an IPv6 warning always a VPN leak\?/, /Does a green leak-test result prove a VPN is private\?/, /VPN leak-test tools compared/, /2026/],
    forbiddenPatterns: [/92%|80%|35%|permanent.*guarantee|anonymous by default/i],
  },
  {
    name: "VPN leak-testing blog route uses the audited editorial override",
    file: "src/app/[locale]/blog/[slug]/page.tsx",
    patterns: [/vpnLeakTestingEditorialTitle/, /vpnLeakTestingContentBrief/, /vpnLeakTestingEditorialFaq/, /vpnLeakTestingClusterLinks/, /isVpnLeakTestingEditorial/],
  },
  {
    name: "VPN account-sharing guide uses PAA-led bounded terms copy",
    file: "src/data/editorial/vpn-account-sharing-2026.ts",
    patterns: [/Can you share a VPN account with someone\?/, /How many people can use one VPN account\?/, /Can my wife and I use the same VPN\?/, /Can the VPN account owner see my activity\?/, /How to interpret VPN account-sharing questions/, /2026/],
    forbiddenPatterns: [/42%|2-6|tested multiple VPN services|Digital Privacy Institute/i, /guarantee.*sharing permitted/i],
  },
  {
    name: "VPN account-sharing blog route uses the audited editorial override",
    file: "src/app/[locale]/blog/[slug]/page.tsx",
    patterns: [/vpnAccountSharingEditorialTitle/, /vpnAccountSharingContentBrief/, /vpnAccountSharingEditorialFaq/, /vpnAccountSharingClusterLinks/, /isVpnAccountSharingEditorial/],
  },
  {
    name: "VPN simultaneous-connections guide uses PAA-led bounded device copy",
    file: "src/data/editorial/vpn-simultaneous-connections-2026.ts",
    patterns: [/Can I use VPN on two devices\?/, /Can I use two VPN connections simultaneously\?/, /Which VPN allows unlimited devices\?/, /Do I need a separate VPN for each device\?/, /How many devices can you use with a VPN\?/, /Can multiple people use one VPN\?/, /Published simultaneous-connection examples/, /2026/],
    forbiddenPatterns: [/71% of VPN users|1-10\+|tested dozens|unblocked Netflix|guaranteed/i, /\b(?:83|69|46|40|36|81)%\s*(?:off|savings)/i],
  },
  {
    name: "VPN simultaneous-connections blog route uses the audited editorial override",
    file: "src/app/[locale]/blog/[slug]/page.tsx",
    patterns: [/vpnSimultaneousConnectionsEditorialTitle/, /vpnSimultaneousConnectionsContentBrief/, /vpnSimultaneousConnectionsEditorialFaq/, /vpnSimultaneousConnectionsClusterLinks/, /isVpnSimultaneousConnectionsEditorial/],
  },
  {
    name: "fitness-tracking privacy guide uses PAA-led bounded app and network copy",
    file: "src/data/editorial/fitness-tracking-privacy-2026.ts",
    patterns: [/Does a VPN block GPS location\?/, /Can someone see my location if I have a VPN\?/, /How do I stop my Health app from collecting data\?/, /Can I make my Strava totally private\?/, /Is Apple Health confidential\?/, /Can your activity be tracked on a VPN\?/, /Network privacy versus fitness-app privacy/, /support\.strava\.com/, /support\.apple\.com/, /garmin\.com\/en-GB\/privacy\/connect/, /2026/],
    forbiddenPatterns: [/72 million people|\$14\.3 billion|sold to the highest bidder|VPN.*blocks GPS|makes you anonymous/i, /\b(?:83|69|46|40|81)%\s*(?:off|savings)/i],
  },
  {
    name: "fitness-tracking privacy blog route uses the audited editorial override",
    file: "src/app/[locale]/blog/[slug]/page.tsx",
    patterns: [/fitnessTrackingPrivacyEditorialTitle/, /fitnessTrackingPrivacyContentBrief/, /fitnessTrackingPrivacyEditorialFaq/, /fitnessTrackingPrivacyClusterLinks/, /isFitnessTrackingPrivacyEditorial/],
  },
  {
    name: "ChatGPT VPN page uses bounded access and privacy evidence",
    file: "src/components/editorial/chatgpt-vpn-editorial-page.tsx",
    patterns: [/Which VPN is best for ChatGPT\?/, /Can I use a VPN for ChatGPT\?/, /Why is ChatGPT not working with my VPN\?/, /ChatGPT access: what a VPN can and cannot change/, /OpenAI supported countries/, /DataForSEO US\/English dossier/],
  },
  {
    name: "ChatGPT VPN route uses the audited English editorial component",
    file: "src/app/[locale]/blog/[slug]/page.tsx",
    patterns: [/ChatgptVpnEditorialPage/, /locale === "en" && slug === "best-vpn-for-chatgpt-2026"/],
  },
  {
    name: "Reddit free VPN page uses bounded community evidence",
    file: "src/components/editorial/reddit-free-vpn-editorial-page.tsx",
    patterns: [/What is the best totally free VPN\?/, /Free VPN evidence checklist/, /Reddit threads are anecdotal/, /DataForSEO US\/English dossier/],
  },
  {
    name: "Reddit free VPN route uses the audited English editorial component",
    file: "src/app/[locale]/blog/[slug]/page.tsx",
    patterns: [/RedditFreeVpnEditorialPage/, /locale === "en" && slug === "best-free-vpn-reddit-2026"/],
  },
  {
    name: "Android VPN page uses bounded app and battery evidence",
    file: "src/components/editorial/android-vpn-editorial-page.tsx",
    patterns: [/Do Android phones have a built-in VPN\?/, /Why is my VPN draining my Android battery\?/, /Android VPN comparison: what to verify before choosing/, /Google Android VPN help/, /DataForSEO US\/English dossier/],
  },
  {
    name: "Android VPN route uses the audited English editorial component",
    file: "src/app/[locale]/best/vpn-android/page.tsx",
    patterns: [/AndroidVpnEditorialPage/, /if \(locale === "en"\) return <AndroidVpnEditorialPage \/>/],
  },
  {
    name: "Android tablet page uses bounded device evidence",
    file: "src/components/editorial/android-tablet-editorial-page.tsx",
    patterns: [/Best VPN for Android Tablets in 2026/, /Android tablet VPN comparison checklist/, /Do Android tablets need a VPN\?/, /Six setup checks before you subscribe/],
    forbiddenPatterns: [/expert-tested|95% rating|94% rating|93% rating|Fastest VPN for Android tablets|stable 4G\/5G/i],
  },
  {
    name: "Android tablet route uses the audited English editorial component",
    file: "src/app/[locale]/best/vpn-android-tablet/page.tsx",
    patterns: [/AndroidTabletEditorialPage/, /if \(locale === "en"\)/, /androidTabletEditorialTitle/, /dateModified="2026-08-13"/],
  },
  {
    name: "mobile VPN page uses PAA-led bounded mobile copy",
    file: "src/components/editorial/mobile-vpn-editorial-page.tsx",
    patterns: [/Which mobile VPN is the best\?/, /Should you put a VPN on your iPhone\?/, /Should I have a VPN on my Android phone\?/, /Does using a VPN affect mobile data\?/, /Does a VPN drain your battery\?/, /Does a VPN hide your location on iPhone or Android\?/, /Mobile VPN comparison: what to verify before choosing/, /mobile-and-device-privacy/, /DataForSEO|dataforseo-mobile-vpn/],
    forbiddenPatterns: [/expert-tested|94%|96%|90\/100|makes every app request private/i, /\b(?:83|69|46|40|81)%\s*(?:off|savings)/i],
  },
  {
    name: "mobile VPN route uses the audited English editorial component",
    file: "src/app/[locale]/best/vpn-mobile/page.tsx",
    patterns: [/MobileVpnEditorialPage/, /if \(locale === "en"\) return <MobileVpnEditorialPage \/>/, /mobileVpnEditorialTitle/],
  },
  {
    name: "Chromebook use-case page avoids unsupported test counts",
    file: "src/app/[locale]/best/vpn-chromebook/page.tsx",
    patterns: [/We vergelijken meerdere VPN-providers voor Chromebook-compatibiliteit/],
    forbiddenPatterns: [/35\+|35以上|35개|35个|über 35|más de 35|plus de 35|มากกว่า 35/i],
  },
  {
    name: "Chromebook English route uses bounded editorial component",
    file: "src/components/editorial/chromebook-vpn-editorial-page.tsx",
    patterns: [/ChromebookVpnEditorialPage/, /Android-app route/, /Chrome extension/, /Linux or manual profile/, /id="comparison"/, /id="setup"/, /DataForSEO/],
    forbiddenPatterns: [/we tested setup time/i, /Access Blocked Content/, /Stream Anywhere/],
  },
  {
    name: "Chromebook route metadata uses evidence-led title and social image",
    file: "src/app/[locale]/best/vpn-chromebook/page.tsx",
    patterns: [/chromebookVpnEditorialTitle/, /chromebookVpnEditorialDescription/, /locale === "en"/, /images: \[DEFAULT_OG_IMAGE\]/],
  },
  {
    name: "Fire TV English route uses bounded editorial component",
    file: "src/components/editorial/firestick-vpn-editorial-page.tsx",
    patterns: [/FirestickVpnEditorialPage/, /Fire TV app/, /Router setup/, /Streaming test/, /id="comparison"/, /id="setup"/, /DataForSEO/],
    forbiddenPatterns: [/We tested 30\+ VPNs/i, /reliable unblocking/i, /Stream Anything/i, /95% speed/i, /92%/i],
  },
  {
    name: "Fire TV route metadata uses evidence-led title and social image",
    file: "src/app/[locale]/best/vpn-firestick/page.tsx",
    patterns: [/firestickVpnEditorialTitle/, /firestickVpnEditorialDescription/, /locale === "en"/, /images: \[DEFAULT_OG_IMAGE\]/],
  },
  {
    name: "Privacy English route uses bounded editorial component",
    file: "src/components/editorial/privacy-vpn-editorial-page.tsx",
    patterns: [/PrivacyVpnEditorialPage/, /VPN privacy evidence comparison checklist/, /id="comparison"/, /id="threat-model"/, /DataForSEO/, /No VPN makes you completely anonymous/],
    forbiddenPatterns: [/complete anonymity/i, /most private options/i, /verified no-logs policies/i, /untraceable/i],
  },
  {
    name: "Privacy route metadata uses evidence-led title and social image",
    file: "src/app/[locale]/best/vpn-privacy/page.tsx",
    patterns: [/privacyVpnEditorialTitle/, /privacyVpnEditorialDescription/, /locale === "en"/, /images: \[DEFAULT_OG_IMAGE\]/],
  },
  {
    name: "Gaming English route uses bounded editorial component",
    file: "src/components/editorial/gaming-vpn-editorial-page.tsx",
    patterns: [/GamingVpnEditorialPage/, /Gaming VPN route and evidence checklist/, /id="comparison"/, /id="test"/, /DataForSEO/, /network/i],
    forbiddenPatterns: [/Lowest Ping/i, /tested.*VPNs/i, /optimized gaming servers/i, /guarantee every game/i],
  },
  {
    name: "Gaming route metadata uses evidence-led title and social image",
    file: "src/app/[locale]/best/vpn-gaming/page.tsx",
    patterns: [/gamingVpnEditorialTitle/, /gamingVpnEditorialDescription/, /locale === "en"/, /images: \[DEFAULT_OG_IMAGE\]/],
  },
  {
    name: "NordVPN review uses bounded evidence-led editorial component",
    file: "src/components/editorial/nordvpn-review-editorial-page.tsx",
    patterns: [/NordVpnReviewEditorialPage/, /NordVPN evidence and limitation checklist/, /id="evidence"/, /id="performance"/, /id="faq"/, /DataForSEO/, /point-in-time/i, /money-back guarantee/i],
    forbiddenPatterns: [/We tested NordVPN for 30\+ days/i, /98\.3%|94\.7%|95\.5%/, /guarantee.*(?:Netflix|streaming)/i, /completely anonymous/i],
  },
  {
    name: "NordVPN review route uses the audited English component and metadata",
    file: "src/app/[locale]/reviews/[slug]/page.tsx",
    patterns: [/NordVpnReviewEditorialPage/, /_locale === "en" && vpn\.slug === "nordvpn"/, /nordvpnReviewTitle/, /nordvpnReviewDescription/],
  },
  {
    name: "Proton VPN review uses bounded evidence-led editorial component",
    file: "src/components/editorial/protonvpn-review-editorial-page.tsx",
    patterns: [/ProtonVpnReviewEditorialPage/, /Proton VPN evidence and limitation checklist/, /id="evidence"/, /id="performance"/, /id="faq"/, /DataForSEO/, /free plan/i, /money-back policy/i],
    forbiddenPatterns: [/We tested Proton VPN for 30\+ days/i, /guarantee.*(?:Netflix|streaming)/i, /completely anonymous/i],
  },
  {
    name: "Proton VPN review route uses the audited English component and metadata",
    file: "src/app/[locale]/reviews/[slug]/page.tsx",
    patterns: [/ProtonVpnReviewEditorialPage/, /_locale === "en" && vpn\.slug === "protonvpn"/, /protonvpnReviewTitle/, /protonvpnReviewDescription/],
  },
  {
    name: "Urban VPN review uses bounded evidence-led editorial component",
    file: "src/components/editorial/urban-vpn-review-editorial-page.tsx",
    patterns: [/UrbanVpnReviewEditorialPage/, /Urban VPN evidence and limitation checklist/, /id="evidence"/, /id="alternatives"/, /id="faq"/, /DataForSEO/, /Koi Security/i, /privacy policy/i],
    forbiddenPatterns: [/We tested Urban VPN for 30\+ days/i, /completely anonymous/i, /guarantee.*(?:Netflix|streaming)/i],
  },
  {
    name: "Urban VPN review route uses the audited English component and metadata",
    file: "src/app/[locale]/reviews/[slug]/page.tsx",
    patterns: [/UrbanVpnReviewEditorialPage/, /_locale === "en" && vpn\.slug === "urban-vpn"/, /urbanVpnReviewTitle/, /urbanVpnReviewDescription/],
  },
  {
    name: "Surfshark review uses bounded evidence-led editorial component",
    file: "src/components/editorial/surfshark-review-editorial-page.tsx",
    patterns: [/SurfsharkReviewEditorialPage/, /Surfshark evidence and limitation checklist/, /id="evidence"/, /id="performance"/, /id="faq"/, /DataForSEO/, /unlimited simultaneous connections/i, /money-back policy/i],
    forbiddenPatterns: [/We tested Surfshark for 30\+ days/i, /guarantee.*(?:Netflix|streaming)/i, /completely anonymous/i],
  },
  {
    name: "Surfshark review route uses the audited English component and metadata",
    file: "src/app/[locale]/reviews/[slug]/page.tsx",
    patterns: [/SurfsharkReviewEditorialPage/, /_locale === "en" && vpn\.slug === "surfshark"/, /surfsharkReviewTitle/, /surfsharkReviewDescription/],
  },
  {
    name: "AirVPN review uses bounded evidence-led editorial component",
    file: "src/components/editorial/airvpn-review-editorial-page.tsx",
    patterns: [/AirVpnReviewEditorialPage/, /AirVPN evidence checklist/, /id="evidence"/, /id="performance"/, /id="alternatives"/, /id="faq"/, /DataForSEO/, /port forwarding/i, /Network Lock/i],
    forbiddenPatterns: [/We tested AirVPN for 30\+ days/i, /guarantee.*(?:Netflix|streaming)/i, /completely anonymous/i, /€2\.06/i, /ENDWINTERDEAL/i],
  },
  {
    name: "AirVPN review route uses the audited English component and metadata",
    file: "src/app/[locale]/reviews/[slug]/page.tsx",
    patterns: [/AirVpnReviewEditorialPage/, /_locale === "en" && vpn\.slug === "airvpn"/, /airvpnReviewTitle/, /airvpnReviewDescription/],
  },
  {
    name: "VPN comparison uses bounded criteria and tracked prices",
    file: "src/components/editorial/vpn-comparison-editorial-page.tsx",
    patterns: [/VpnComparisonEditorialPage/, /VPN provider comparison by price, terms and device criteria/, /id="shortlist"/, /id="comparison"/, /id="method"/, /id="faq"/, /DataForSEO/, /AffiliateTextLink/],
    forbiddenPatterns: [/fastest.*universal/i, /35,000\+/i, /96%.*speed/i, /99%.*security/i],
  },
  {
    name: "DNS leak tool uses evidence-led diagnostic template",
    file: "src/components/editorial/dns-leak-editorial-page.tsx",
    patterns: [/DnsLeakEditorialPage/, /Run the DNS leak test/, /id="test"/, /id="interpret"/, /id="fix"/, /id="faq"/, /id="sources"/, /DataForSEO|dataforseo-dns-leak-cluster/, /browserleaks.com\/dns/, /protonvpn.com\/support\/dns-leaks-privacy/, /AffiliateTextLink/],
    forbiddenPatterns: [/guaranteed leak-free/i, /100% private/i, /fastest.*universal/i],
  },
  {
    name: "DNS leak route uses the audited English component",
    file: "src/app/[locale]/tools/dns-leak-test/page.tsx",
    patterns: [/DnsLeakEditorialPage/, /locale === "en"/, /dnsLeakEditorialTitle/, /dnsLeakEditorialDescription/],
  },
  {
    name: "VPN comparison route uses the audited English component and metadata",
    file: "src/app/[locale]/compare/page.tsx",
    patterns: [/VpnComparisonEditorialPage/, /locale === "en"/, /vpnComparisonEditorialTitle/, /vpnComparisonEditorialDescription/],
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
    name: "Torrenting Reddit editorial override stays lawful and affiliate-free",
    file: "src/data/editorial/torrenting-reddit-2026.ts",
    patterns: [/torrentingRedditEditorialContent/, /Reddit can be useful/, /P2P permission/, /kill-switch/, /port-forwarding/, /EFF|Electronic Frontier Foundation/, /browserleaks.com\/dns/],
    forbiddenPatterns: [/538 Mbps|779\.9|752 Mbps|718 Mbps|10-15% speed|5% speed reduction|fastest.*torrent/i, /AffiliateButton|go\.zerotovpn\.com|go\.nordvpn\.net/i],
  },
  {
    name: "Torrenting Reddit route uses the audited evidence-led override",
    file: "src/app/[locale]/blog/[slug]/page.tsx",
    patterns: [/isTorrentingRedditEditorial/, /torrentingRedditEditorialContent/, /editorialContentBriefs\.torrentingReddit/, /torrentingRedditClusterLinks/],
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
    name: "cheap VPN editorial page exposes tracked inline prices",
    file: "src/components/editorial/cheap-vpn-editorial-page.tsx",
    patterns: [/CheapVpnEditorialPage/, /AffiliateTextLink/, /dataPriceLink/, /getVpnAffiliateUrl/, /catalog/i],
  },
  {
    name: "cheap VPN pillar SERP metadata and table semantics",
    file: "src/app/[locale]/best/vpn-cheap/page.tsx",
    patterns: [/cheapVpnEditorialTitle/, /cheapVpnEditorialDescription/, /DEFAULT_OG_IMAGE/, /locale === "en"/],
    forbiddenPatterns: [/5 Cheapest VPNs \(\$\{shortMonthYear\}\) — Tested, From \$1\.99\/mo \| ZeroToVPN/],
  },
  {
    name: "cheap VPN editorial page covers DataForSEO affordability questions",
    file: "src/components/editorial/cheap-vpn-editorial-page.tsx",
    patterns: [/What is the best affordable VPN service\?/, /Which VPN is safe and cheap\?/, /Are free VPNs illegal\?/, /id="comparison"/, /id="value-checks"/, /id="faq"/, /DataForSEO/],
    forbiddenPatterns: [/all VPNs on our list use AES-256/i, /all our recommended budget VPNs/i, /unblocks Netflix and other streaming services/i, /\$1\.99\/month/],
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
    name: "port-forwarding English route uses evidence-led comparison component",
    file: "src/components/editorial/port-forwarding-editorial-page.tsx",
    patterns: [/PortForwardingEditorialPage/, /Provider evidence matrix/, /id="quick-picks"/, /id="evidence"/, /id="comparison"/, /id="alternatives"/, /id="faq"/, /DataForSEO/, /AffiliateTextLink/, /AffiliateButton/, /13 August 2026/],
    forbiddenPatterns: [/up to five ports that you choose/i, /€2\.06/i, /guarantee.*(?:Netflix|streaming)/i],
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
const speedTestLocaleFailures = [];
const speedTestForbidden = /10\s*[–-]\s*20\s*%|30\s*[–-]\s*50\s*%|10\s*[–-]\s*20%|30\s*[–-]\s*50%|accurate(?:ly)?\s+(?:picture|performance cost)|Fastest VPNs for Your Speed|Schnellste VPNs für Ihre Verbindung|VPNs Más Rápidas para Tu Conexión|VPNs les Plus Rapides pour Votre Connexion|最速VPN|가장 빠른 VPN 추천|เร็วที่สุดสำหรับการเชื่อมต่อของคุณ|最快的VPN推荐/i;
for (const file of localeFiles) {
  const locale = JSON.parse(readFileSync(resolve(ROOT, "src/messages", file), "utf8"));
  const speedTest = locale.speedTest ?? {};
  const speedTestCopy = JSON.stringify({
    whyTestDesc: speedTest.whyTestDesc,
    vpnImpactDesc: speedTest.vpnImpactDesc,
    recommendedVpns: speedTest.recommendedVpns,
    vpnImpactContent: speedTest.vpnImpactContent,
    faq4A: speedTest.faq4A,
    faq6A: speedTest.faq6A,
  });
  if (!speedTestCopy || speedTestForbidden.test(speedTestCopy)) speedTestLocaleFailures.push(file);
}
results.push({
  name: "localized speed-test copy avoids fixed VPN-loss claims",
  file: "src/messages/*.json (speedTest namespace)",
  pass: speedTestLocaleFailures.length === 0,
  missing: speedTestLocaleFailures.length ? speedTestLocaleFailures.map((file) => `bounded speedTest copy: ${file}`) : [],
  forbidden: [],
});
const failed = results.filter((result) => !result.pass);
console.log(JSON.stringify({ checkedAt: new Date().toISOString(), checked: results.length, passed: results.length - failed.length, failed: failed.length, results: results.map(({ name, file, pass, missing, forbidden }) => ({ name, file, pass, missing, forbidden })) }, null, 2));
if (failed.length) process.exitCode = 1;
