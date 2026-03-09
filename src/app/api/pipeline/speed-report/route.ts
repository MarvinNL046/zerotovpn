import { NextRequest, NextResponse } from "next/server";
import { eq, and } from "drizzle-orm";
import { getDb, blogPosts } from "@/lib/db";
import { getAllVpns } from "@/lib/vpn-data-layer";
import { type VpnData } from "@/lib/db/vpn-service";

export const maxDuration = 30;

function validatePipelineKey(request: NextRequest): boolean {
  const key =
    request.headers.get("x-admin-key") ||
    request.headers.get("x-pipeline-key") ||
    request.nextUrl.searchParams.get("key");
  return key === process.env.PIPELINE_SECRET;
}

const MONTH_NAMES_EN = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const MONTH_NAMES_NL = [
  "januari", "februari", "maart", "april", "mei", "juni",
  "juli", "augustus", "september", "oktober", "november", "december",
];

const MONTH_SLUGS = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
];

function getSpeedRating(score: number): string {
  if (score >= 90) return "Excellent";
  if (score >= 80) return "Very Good";
  if (score >= 70) return "Good";
  if (score >= 60) return "Fair";
  return "Below Average";
}

function getSpeedRatingNl(score: number): string {
  if (score >= 90) return "Uitstekend";
  if (score >= 80) return "Zeer Goed";
  if (score >= 70) return "Goed";
  if (score >= 60) return "Redelijk";
  return "Ondergemiddeld";
}

function generateContentEN(
  vpns: VpnData[],
  monthName: string,
  year: number,
  monthSlug: string
): string {
  const top5 = vpns.slice(0, 5);
  const previousMonthIndex = MONTH_SLUGS.indexOf(monthSlug) - 1;
  const prevMonthSlug =
    previousMonthIndex >= 0
      ? MONTH_SLUGS[previousMonthIndex]
      : MONTH_SLUGS[11];
  const prevYear = previousMonthIndex >= 0 ? year : year - 1;

  let html = "";

  html += `<p>Every month, we test the leading VPN services to measure real-world connection speeds. Here are the complete results for ${monthName} ${year}, covering ${vpns.length} providers ranked by speed performance.</p>\n\n`;

  // Rankings table
  html += `<h2>Fastest VPNs This Month</h2>\n`;
  html += `<p>Speed scores are based on download speed, upload speed, and latency measurements across multiple server locations.</p>\n`;
  html += `<table>\n`;
  html += `<thead><tr><th>Rank</th><th>VPN</th><th>Speed Score</th><th>Rating</th></tr></thead>\n`;
  html += `<tbody>\n`;
  vpns.forEach((vpn, i) => {
    const medal = i === 0 ? " 🥇" : i === 1 ? " 🥈" : i === 2 ? " 🥉" : "";
    html += `<tr><td>#${i + 1}${medal}</td><td><a href="/reviews/${vpn.slug}">${vpn.name}</a></td><td>${vpn.speedScore}/100</td><td>${getSpeedRating(vpn.speedScore)}</td></tr>\n`;
  });
  html += `</tbody>\n</table>\n\n`;

  // Top 5 breakdown
  html += `<h2>Top 5 Breakdown</h2>\n`;
  top5.forEach((vpn, i) => {
    html += `<h3>#${i + 1}: ${vpn.name} — Speed Score: ${vpn.speedScore}/100</h3>\n`;
    html += `<p><a href="/reviews/${vpn.slug}">${vpn.name}</a> ${i === 0 ? "takes the top spot" : `comes in at #${i + 1}`} this month with a speed score of ${vpn.speedScore}/100. `;
    html += `With ${vpn.servers.toLocaleString()} servers across ${vpn.countries} countries, ${vpn.name} provides a wide network for optimal routing. `;
    html += `It scores ${vpn.securityScore}/100 for security and ${vpn.streamingScore}/100 for streaming, `;
    html += `making it ${Number(vpn.overallRating) >= 4.0 ? "one of the strongest all-round choices" : "a solid option"} for speed-conscious users. `;
    html += `Plans start at $${vpn.priceYearly}/month on the yearly plan.</p>\n\n`;
  });

  // Methodology
  html += `<h2>Testing Methodology</h2>\n`;
  html += `<p>Our speed tests are conducted under standardized conditions to ensure fair comparisons:</p>\n`;
  html += `<ul>\n`;
  html += `<li><strong>Base connection:</strong> 1 Gbps fiber connection</li>\n`;
  html += `<li><strong>Protocols tested:</strong> WireGuard and OpenVPN (best result used)</li>\n`;
  html += `<li><strong>Server locations:</strong> Nearest server, US, UK, and Asia-Pacific</li>\n`;
  html += `<li><strong>Measurements:</strong> Download speed, upload speed, and latency</li>\n`;
  html += `<li><strong>Testing frequency:</strong> Multiple runs over several days to account for variance</li>\n`;
  html += `</ul>\n`;
  html += `<p>Speed scores are calculated as a weighted composite: download speed (50%), upload speed (30%), and latency (20%), normalized against our base connection.</p>\n\n`;

  // Previous reports
  html += `<h2>Previous Reports</h2>\n`;
  html += `<p>Track VPN speed trends over time:</p>\n`;
  html += `<ul>\n`;
  html += `<li><a href="/blog/vpn-speed-test-results-${prevMonthSlug}-${prevYear}">VPN Speed Test Results: ${MONTH_NAMES_EN[MONTH_SLUGS.indexOf(prevMonthSlug)]} ${prevYear}</a></li>\n`;
  html += `</ul>\n`;

  return html;
}

function generateContentNL(
  vpns: VpnData[],
  monthName: string,
  year: number,
  monthSlug: string
): string {
  const top5 = vpns.slice(0, 5);
  const previousMonthIndex = MONTH_SLUGS.indexOf(monthSlug) - 1;
  const prevMonthSlug =
    previousMonthIndex >= 0
      ? MONTH_SLUGS[previousMonthIndex]
      : MONTH_SLUGS[11];
  const prevYear = previousMonthIndex >= 0 ? year : year - 1;

  let html = "";

  html += `<p>Elke maand testen we de toonaangevende VPN-diensten om echte verbindingssnelheden te meten. Hier zijn de volledige resultaten voor ${monthName} ${year}, met ${vpns.length} providers gerangschikt op snelheidsprestaties.</p>\n\n`;

  // Rankings table
  html += `<h2>Snelste VPN's Deze Maand</h2>\n`;
  html += `<p>Snelheidsscores zijn gebaseerd op downloadsnelheid, uploadsnelheid en latentiemetingen over meerdere serverlocaties.</p>\n`;
  html += `<table>\n`;
  html += `<thead><tr><th>Rang</th><th>VPN</th><th>Snelheidsscore</th><th>Beoordeling</th></tr></thead>\n`;
  html += `<tbody>\n`;
  vpns.forEach((vpn, i) => {
    const medal = i === 0 ? " 🥇" : i === 1 ? " 🥈" : i === 2 ? " 🥉" : "";
    html += `<tr><td>#${i + 1}${medal}</td><td><a href="/reviews/${vpn.slug}">${vpn.name}</a></td><td>${vpn.speedScore}/100</td><td>${getSpeedRatingNl(vpn.speedScore)}</td></tr>\n`;
  });
  html += `</tbody>\n</table>\n\n`;

  // Top 5 breakdown
  html += `<h2>Top 5 Overzicht</h2>\n`;
  top5.forEach((vpn, i) => {
    html += `<h3>#${i + 1}: ${vpn.name} — Snelheidsscore: ${vpn.speedScore}/100</h3>\n`;
    html += `<p><a href="/reviews/${vpn.slug}">${vpn.name}</a> ${i === 0 ? "pakt de eerste plaats" : `komt binnen op #${i + 1}`} deze maand met een snelheidsscore van ${vpn.speedScore}/100. `;
    html += `Met ${vpn.servers.toLocaleString()} servers in ${vpn.countries} landen biedt ${vpn.name} een uitgebreid netwerk voor optimale routing. `;
    html += `Het scoort ${vpn.securityScore}/100 voor beveiliging en ${vpn.streamingScore}/100 voor streaming, `;
    html += `wat het ${Number(vpn.overallRating) >= 4.0 ? "een van de sterkste allround keuzes" : "een degelijke optie"} maakt voor snelheidsbewuste gebruikers. `;
    html += `Abonnementen beginnen vanaf $${vpn.priceYearly}/maand bij het jaarabonnement.</p>\n\n`;
  });

  // Methodology
  html += `<h2>Testmethodologie</h2>\n`;
  html += `<p>Onze snelheidstesten worden uitgevoerd onder gestandaardiseerde omstandigheden om eerlijke vergelijkingen te garanderen:</p>\n`;
  html += `<ul>\n`;
  html += `<li><strong>Basisverbinding:</strong> 1 Gbps glasvezelverbinding</li>\n`;
  html += `<li><strong>Geteste protocollen:</strong> WireGuard en OpenVPN (beste resultaat gebruikt)</li>\n`;
  html += `<li><strong>Serverlocaties:</strong> Dichtstbijzijnde server, VS, VK en Azië-Pacific</li>\n`;
  html += `<li><strong>Metingen:</strong> Downloadsnelheid, uploadsnelheid en latentie</li>\n`;
  html += `<li><strong>Testfrequentie:</strong> Meerdere runs over meerdere dagen om variatie op te vangen</li>\n`;
  html += `</ul>\n`;
  html += `<p>Snelheidsscores worden berekend als een gewogen samengestelde score: downloadsnelheid (50%), uploadsnelheid (30%) en latentie (20%), genormaliseerd ten opzichte van onze basisverbinding.</p>\n\n`;

  // Previous reports
  html += `<h2>Eerdere Rapporten</h2>\n`;
  html += `<p>Volg VPN-snelheidstrends in de loop van de tijd:</p>\n`;
  html += `<ul>\n`;
  html += `<li><a href="/blog/vpn-snelheidstest-resultaten-${prevMonthSlug}-${prevYear}">VPN Snelheidstest Resultaten: ${MONTH_NAMES_NL[MONTH_SLUGS.indexOf(prevMonthSlug)]} ${prevYear}</a></li>\n`;
  html += `</ul>\n`;

  return html;
}

export async function GET(request: NextRequest) {
  if (!validatePipelineKey(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = new Date();
    const month = now.getMonth(); // 0-indexed
    const year = now.getFullYear();
    const monthSlug = MONTH_SLUGS[month];
    const monthNameEN = MONTH_NAMES_EN[month];
    const monthNameNL = MONTH_NAMES_NL[month];

    // Fetch all VPNs and sort by speed score
    const allVpns = await getAllVpns();
    const vpnsSorted = [...allVpns].sort(
      (a, b) => b.speedScore - a.speedScore
    );

    if (vpnsSorted.length === 0) {
      return NextResponse.json(
        { error: "No VPN data available" },
        { status: 500 }
      );
    }

    const db = getDb();
    const slugEN = `vpn-speed-test-results-${monthSlug}-${year}`;
    const slugNL = `vpn-snelheidstest-resultaten-${monthSlug}-${year}`;

    // Check if posts already exist for this month
    const existingEN = await db
      .select({ id: blogPosts.id })
      .from(blogPosts)
      .where(and(eq(blogPosts.slug, slugEN), eq(blogPosts.language, "en")))
      .limit(1);

    const existingNL = await db
      .select({ id: blogPosts.id })
      .from(blogPosts)
      .where(and(eq(blogPosts.slug, slugNL), eq(blogPosts.language, "nl")))
      .limit(1);

    if (existingEN.length > 0 && existingNL.length > 0) {
      return NextResponse.json({
        message: `Speed report for ${monthNameEN} ${year} already exists`,
        slugEN,
        slugNL,
        skipped: true,
      });
    }

    const tags = ["speed-test", "monthly-report", "vpn-speed", "benchmark"];
    const topVpn = vpnsSorted[0];
    const createdPosts: Array<{ id: string; slug: string; language: string }> =
      [];

    // Generate EN post
    if (existingEN.length === 0) {
      const titleEN = `VPN Speed Test Results: ${monthNameEN} ${year}`;
      const contentEN = generateContentEN(
        vpnsSorted,
        monthNameEN,
        year,
        monthSlug
      );
      const excerptEN = `Our ${monthNameEN} ${year} VPN speed tests are in. ${topVpn.name} leads with a score of ${topVpn.speedScore}/100. See the full rankings for all ${vpnsSorted.length} providers.`;

      const [postEN] = await db
        .insert(blogPosts)
        .values({
          slug: slugEN,
          language: "en",
          title: titleEN,
          excerpt: excerptEN,
          content: contentEN,
          metaTitle: `${titleEN} — ${topVpn.name} Tops the Rankings`,
          metaDescription: excerptEN,
          category: "news",
          tags,
          sourceData: JSON.stringify({
            type: "speed-report",
            month: monthSlug,
            year,
            vpnCount: vpnsSorted.length,
            generatedAt: now.toISOString(),
          }),
          published: true,
          publishedAt: now,
        })
        .returning({ id: blogPosts.id, slug: blogPosts.slug });

      createdPosts.push({ id: postEN.id, slug: postEN.slug, language: "en" });
    }

    // Generate NL post
    if (existingNL.length === 0) {
      const titleNL = `VPN Snelheidstest Resultaten: ${monthNameNL} ${year}`;
      const contentNL = generateContentNL(
        vpnsSorted,
        monthNameNL,
        year,
        monthSlug
      );
      const excerptNL = `Onze VPN-snelheidstesten van ${monthNameNL} ${year} zijn binnen. ${topVpn.name} leidt met een score van ${topVpn.speedScore}/100. Bekijk de volledige ranglijst van alle ${vpnsSorted.length} providers.`;

      const [postNL] = await db
        .insert(blogPosts)
        .values({
          slug: slugNL,
          language: "nl",
          title: titleNL,
          excerpt: excerptNL,
          content: contentNL,
          metaTitle: `${titleNL} — ${topVpn.name} Bovenaan`,
          metaDescription: excerptNL,
          category: "news",
          tags,
          sourceData: JSON.stringify({
            type: "speed-report",
            month: monthSlug,
            year,
            vpnCount: vpnsSorted.length,
            generatedAt: now.toISOString(),
          }),
          published: true,
          publishedAt: now,
        })
        .returning({ id: blogPosts.id, slug: blogPosts.slug });

      createdPosts.push({ id: postNL.id, slug: postNL.slug, language: "nl" });
    }

    return NextResponse.json({
      success: true,
      month: monthNameEN,
      year,
      vpnCount: vpnsSorted.length,
      topVpn: topVpn.name,
      topScore: topVpn.speedScore,
      posts: createdPosts,
    });
  } catch (error) {
    console.error("Speed report generation error:", error);
    return NextResponse.json(
      {
        error: "Speed report generation failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
