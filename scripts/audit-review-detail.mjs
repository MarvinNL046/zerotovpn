import { existsSync } from "node:fs";
import { chromium } from "playwright";
import sharp from "sharp";
import {
  REVIEW_DETAIL_CONTRACT,
  REVIEW_DETAIL_PAA,
  REVIEW_DETAIL_STATUS,
  REVIEW_DETAIL_TARGETS,
} from "./review-detail-contract.mjs";

const DEFAULT_URL = "http://127.0.0.1:3001/nl/reviews/nordvpn";

function readArgument(name) {
  const exact = process.argv.indexOf(`--${name}`);
  if (exact !== -1) return process.argv[exact + 1];
  const prefixed = process.argv.find((argument) => argument.startsWith(`--${name}=`));
  return prefixed?.slice(name.length + 3);
}

const targetUrl = readArgument("url") || process.env.REVIEW_DETAIL_AUDIT_URL || DEFAULT_URL;
const jsonOnly = process.argv.includes("--json");

const SYSTEM_CHROMIUM_PATHS = [
  process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
].filter(Boolean);

async function launchBrowser() {
  try {
    return await chromium.launch({ headless: true });
  } catch (error) {
    const executablePath = SYSTEM_CHROMIUM_PATHS.find((candidate) => existsSync(candidate));
    if (!executablePath) throw error;
    return chromium.launch({ headless: true, executablePath });
  }
}

function normalizeSpace(value = "") {
  return String(value).replace(/\s+/g, " ").trim();
}

function normalizeQuestion(value = "") {
  return normalizeSpace(value).toLocaleLowerCase().replace(/[’']/g, "'");
}

function result(status, detail, evidence = undefined) {
  return { status, detail, ...(evidence === undefined ? {} : { evidence }) };
}

function pass(detail, evidence) {
  return result(REVIEW_DETAIL_STATUS.PASS, detail, evidence);
}

function fail(detail, evidence) {
  return result(REVIEW_DETAIL_STATUS.FAIL, detail, evidence);
}

function manual(detail) {
  return result(REVIEW_DETAIL_STATUS.MANUAL, detail);
}

function na(detail) {
  return result(REVIEW_DETAIL_STATUS.NA, detail);
}

function blocked(detail) {
  return result(REVIEW_DETAIL_STATUS.BLOCKED, detail);
}

function inRange(value, min, max) {
  return Number.isFinite(value) && value >= min && value <= max;
}

function normalizeUrl(value) {
  try {
    const url = new URL(value);
    url.hash = "";
    if (url.pathname !== "/") url.pathname = url.pathname.replace(/\/$/, "");
    return url.toString();
  } catch {
    return "";
  }
}

function affiliateHostname(hostname) {
  return /(^|\.)go\.zerotovpn\.com$|(^|\.)go\.nordvpn\.net$|(^|\.)nordvpn\.tpo\.lv$/i.test(hostname);
}

function authoritativeHostname(hostname) {
  return (
    /\.gov$|\.gov\.|\.edu$|\.edu\./i.test(hostname) ||
    /(^|\.)(netflix\.com|nist\.gov|ietf\.org|eff\.org|mozilla\.org|consumerreports\.org)$/i.test(hostname) ||
    /(^|\.)(support\.nordvpn\.com|nordvpn\.com)$/i.test(hostname)
  );
}

function schemaNodes(value, nodes = []) {
  if (!value || typeof value !== "object") return nodes;
  nodes.push(value);
  if (Array.isArray(value)) {
    for (const entry of value) schemaNodes(entry, nodes);
    return nodes;
  }
  for (const entry of Object.values(value)) schemaNodes(entry, nodes);
  return nodes;
}

async function inspectAsset(assetUrl, pageUrl) {
  if (!assetUrl) return null;
  try {
    const page = new URL(pageUrl);
    const requested = new URL(assetUrl, pageUrl);
    if (/^(?:www\.)?zerotovpn\.com$/i.test(requested.hostname) && /^(?:127\.0\.0\.1|localhost)$/i.test(page.hostname)) {
      requested.protocol = page.protocol;
      requested.hostname = page.hostname;
      requested.port = page.port;
    }
    const absolute = requested.toString();
    const response = await fetch(absolute, {
      headers: { Accept: "image/webp,image/avif,image/*,*/*;q=0.8" },
    });
    if (!response.ok) {
      return { url: absolute, ok: false, status: response.status };
    }
    const buffer = Buffer.from(await response.arrayBuffer());
    const metadata = await sharp(buffer).metadata();
    return {
      url: absolute,
      ok: true,
      bytes: buffer.byteLength,
      width: metadata.width ?? 0,
      height: metadata.height ?? 0,
      format: metadata.format ?? "unknown",
      contentType: response.headers.get("content-type") ?? "",
    };
  } catch (error) {
    return { url: assetUrl, ok: false, error: error instanceof Error ? error.message : String(error) };
  }
}

async function collectSnapshot(page) {
  return page.evaluate(() => {
    const clean = (value = "") => String(value).replace(/\s+/g, " ").trim();
    const text = (selector) => clean(document.querySelector(selector)?.textContent ?? "");
    const content = (selector) => document.querySelector(selector)?.getAttribute("content")?.trim() ?? "";
    const visible = (element) => {
      if (!(element instanceof HTMLElement)) return false;
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return style.display !== "none" && style.visibility !== "hidden" && Number(style.opacity) !== 0 && rect.width > 0 && rect.height > 0;
    };
    const root = document.querySelector("article") ?? document.querySelector("main") ?? document.body;
    const rootText = clean(root.textContent ?? "");
    const words = rootText.match(/[\p{L}\p{N}]+(?:[-’'][\p{L}\p{N}]+)*/gu) ?? [];
    const paragraphs = [...root.querySelectorAll("p")]
      .map((paragraph) => ({
        text: clean(paragraph.textContent ?? ""),
        sentences: (clean(paragraph.textContent ?? "").match(/[.!?]+(?=\s|$)/g) ?? []).length,
      }))
      .filter((paragraph) => paragraph.text.length >= 30);
    const headingElements = [...root.querySelectorAll("h1,h2,h3,h4,h5,h6")];
    const headings = headingElements.map((heading) => ({
      level: Number(heading.tagName.slice(1)),
      text: clean(heading.textContent ?? ""),
      id: heading.id || heading.closest("section[id],[role=region][id]")?.id || "",
      top: Math.round(heading.getBoundingClientRect().top + scrollY),
    }));
    const headingSkips = [];
    for (let index = 1; index < headings.length; index += 1) {
      if (headings[index].level > headings[index - 1].level + 1) {
        headingSkips.push(`${headings[index - 1].level}->${headings[index].level}: ${headings[index].text}`);
      }
    }
    const links = [...document.querySelectorAll("a[href]")].map((anchor, index) => {
      const href = anchor.href;
      let hostname = "";
      try { hostname = new URL(href).hostname; } catch { /* hash-only anchors */ }
      const style = getComputedStyle(anchor);
      const rect = anchor.getBoundingClientRect();
      return {
        index,
        href,
        rawHref: anchor.getAttribute("href") ?? "",
        hostname,
        text: clean(anchor.textContent ?? anchor.getAttribute("aria-label") ?? ""),
        rel: clean(anchor.getAttribute("rel") ?? "").toLowerCase(),
        target: anchor.getAttribute("target") ?? "",
        inArticle: root.contains(anchor),
        inParagraph: Boolean(anchor.closest("p,li")) && root.contains(anchor),
        top: Math.round(rect.top + scrollY),
        visible: visible(anchor),
        display: style.display,
      };
    });
    const allElements = [...document.querySelectorAll("*")];
    const disclosureElement = allElements.find((element) => /commission|commissie|affiliate disclosure|affiliateverklaring|partnerlink/i.test(clean(element.textContent ?? "")) && clean(element.textContent ?? "").length < 400);
    const affiliateElements = [...document.querySelectorAll('a[rel~="sponsored"],a[href*="go.zerotovpn.com"],a[href*="go.nordvpn.net"],a[href*="nordvpn.tpo.lv"]')].filter(visible);
    const firstAffiliateElement = affiliateElements[0];
    const disclosureBeforeAffiliate = Boolean(
      disclosureElement && firstAffiliateElement &&
      (disclosureElement.compareDocumentPosition(firstAffiliateElement) & Node.DOCUMENT_POSITION_FOLLOWING),
    );
    const images = [...root.querySelectorAll("img")].map((image) => {
      const rect = image.getBoundingClientRect();
      return {
        alt: image.getAttribute("alt"),
        srcAttr: image.getAttribute("src") ?? "",
        currentSrc: image.currentSrc || image.src,
        srcset: image.getAttribute("srcset") ?? "",
        loading: image.getAttribute("loading") ?? "",
        widthAttr: image.getAttribute("width"),
        heightAttr: image.getAttribute("height"),
        naturalWidth: image.naturalWidth,
        naturalHeight: image.naturalHeight,
        top: Math.round(rect.top + scrollY),
        inFigure: Boolean(image.closest("figure")),
        isContent: image.naturalWidth >= 300 || image.naturalHeight >= 300 || Boolean(image.closest("figure")),
      };
    });
    const faqRoot = document.querySelector("#faq") ?? document.querySelector('[data-section="faq"]');
    const faqQuestionElements = faqRoot
      ? [...faqRoot.querySelectorAll("h3,h4,summary,[data-faq-question]")]
          .filter((element) => /\?$/.test(clean(element.matches("summary") ? element.querySelector(":scope > span")?.textContent ?? element.textContent : element.textContent)))
      : [];
    const faq = faqQuestionElements.map((question) => {
      const container = question.closest("details,article,li,[data-faq-item]") ?? question.parentElement;
      const paragraphs = container ? [...container.querySelectorAll("p")].map((entry) => clean(entry.textContent ?? "")).filter(Boolean) : [];
      const answer = clean(paragraphs.join(" "));
      return {
        question: clean(question.matches("summary") ? question.querySelector(":scope > span")?.textContent ?? question.textContent : question.textContent),
        answer,
        sentences: (answer.match(/[.!?]+(?=\s|$)/g) ?? []).length,
      };
    });
    const jsonLd = [];
    for (const script of document.querySelectorAll('script[type="application/ld+json"]')) {
      try { jsonLd.push(JSON.parse(script.textContent ?? "null")); } catch { jsonLd.push({ __parseError: true }); }
    }
    const interactive = [...document.querySelectorAll("a[href],button,input,select,textarea,[role=button]")]
      .filter(visible)
      .map((element) => {
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        const labelledBy = element.getAttribute("aria-labelledby")
          ?.split(/\s+/)
          .map((id) => document.getElementById(id)?.textContent ?? "")
          .join(" ") ?? "";
        const explicitLabel = element.id ? document.querySelector(`label[for="${CSS.escape(element.id)}"]`)?.textContent ?? "" : "";
        const wrappingLabel = element.closest("label")?.textContent ?? "";
        const candidates = [
          element.getAttribute("aria-label"),
          labelledBy,
          explicitLabel,
          wrappingLabel,
          element.getAttribute("title"),
          element.textContent,
          element instanceof HTMLInputElement ? element.value || element.placeholder : "",
        ];
        const name = clean(candidates.find((candidate) => clean(candidate ?? "")) ?? "");
        const labelRect = element.getAttribute("role") === "checkbox" ? element.parentElement?.getBoundingClientRect() : null;
        return {
          tag: element.tagName.toLowerCase(),
          name,
          display: style.display,
          width: Math.round(Math.max(rect.width, labelRect?.width ?? 0)),
          height: Math.round(Math.max(rect.height, labelRect?.height ?? 0)),
          inArticle: root.contains(element),
          visuallyClipped: rect.width <= 1 || rect.height <= 1 || style.clip !== "auto" || style.clipPath !== "none",
          textLinkException: element.tagName === "A" && Boolean(element.closest('p,li,nav[aria-label*="breadcrumb" i],nav[aria-label*="broodkruim" i]')),
        };
      });
    const tocLinks = links.filter((link) => link.rawHref.startsWith("#"));
    const h2s = headings.filter((heading) => heading.level === 2 && heading.id);
    const bodyFontSize = Number.parseFloat(getComputedStyle(document.body).fontSize);
    const dialogs = [...document.querySelectorAll('[role="dialog"],dialog')].filter(visible).length;
    const socialDescription = content('meta[property="og:description"]');
    return {
      url: location.href,
      origin: location.origin,
      pathname: location.pathname,
      locale: document.documentElement.lang || location.pathname.split("/").filter(Boolean)[0] || "en",
      title: document.title,
      metaDescription: content('meta[name="description"]'),
      canonical: document.querySelector('link[rel="canonical"]')?.href ?? "",
      og: {
        title: content('meta[property="og:title"]'),
        description: socialDescription,
        image: content('meta[property="og:image"]'),
        url: content('meta[property="og:url"]'),
        type: content('meta[property="og:type"]'),
      },
      twitter: {
        card: content('meta[name="twitter:card"]'),
        title: content('meta[name="twitter:title"]'),
        description: content('meta[name="twitter:description"]'),
        image: content('meta[name="twitter:image"]'),
      },
      viewport: content('meta[name="viewport"]'),
      charset: document.querySelector("meta[charset]")?.getAttribute("charset") ?? "",
      favicon: document.querySelector('link[rel~="icon"]')?.href ?? "",
      appleTouchIcon: document.querySelector('link[rel="apple-touch-icon"]')?.href ?? "",
      rootText,
      wordCount: words.length,
      first100Words: words.slice(0, 100).join(" "),
      firstParagraph: paragraphs[0]?.text ?? "",
      paragraphs,
      headings,
      headingSkips,
      h1Count: document.querySelectorAll("h1").length,
      h1Text: text("h1"),
      h2s,
      strongCount: root.querySelectorAll("strong,b").length,
      strongWords: [...root.querySelectorAll("strong,b")].reduce((total, node) => total + (clean(node.textContent ?? "").split(/\s+/).filter(Boolean).length), 0),
      listCount: root.querySelectorAll("ul,ol").length,
      links,
      disclosureBeforeAffiliate,
      disclosureTop: disclosureElement instanceof HTMLElement ? Math.round(disclosureElement.getBoundingClientRect().top + scrollY) : null,
      firstAffiliateTop: firstAffiliateElement instanceof HTMLElement ? Math.round(firstAffiliateElement.getBoundingClientRect().top + scrollY) : null,
      images,
      allImagesHaveAlt: [...document.querySelectorAll("img")].every((image) => image.hasAttribute("alt")),
      faq,
      jsonLd,
      interactive,
      unnamedInteractive: interactive.filter((entry) => !entry.name),
      landmarks: {
        header: document.querySelectorAll("header").length,
        nav: document.querySelectorAll("nav").length,
        main: document.querySelectorAll("main").length,
        article: document.querySelectorAll("article").length,
        footer: document.querySelectorAll("footer").length,
      },
      skipLinks: links.filter((link) => /^#(?:main|main-content|content)$/i.test(link.rawHref)),
      tocLinks,
      ctaCandidates: links.filter((link) => link.visible && link.inArticle && (
        /#(?:pricing|plans|newsletter)|\/(?:quiz|best\/best-vpn)\/?$/i.test(link.rawHref) ||
        /\b(?:bekijk|vergelijk|abonneer|check|view|compare|subscribe)\b/i.test(link.text) ||
        /go\.zerotovpn\.com|go\.nordvpn\.net|nordvpn\.tpo\.lv/i.test(link.href)
      )),
      bodyFontSize,
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: innerWidth,
      hasHorizontalOverflow: document.documentElement.scrollWidth > innerWidth + 1,
      visibleDialogs: dialogs,
      authorLinks: links.filter((link) => /\/authors?\//i.test(link.rawHref) || /rel=author/i.test(link.rel)),
      timeElements: [...document.querySelectorAll("time")].map((element) => ({
        text: clean(element.textContent ?? ""),
        dateTime: element.getAttribute("datetime") ?? "",
        context: clean(element.parentElement?.textContent ?? ""),
      })),
      aboutLinks: links.filter((link) => /\/(?:[a-z]{2}\/)?about\/?$/i.test(new URL(link.href, location.href).pathname)),
      languageIndicator: Boolean(document.querySelector('[aria-label*="language" i],[aria-label*="taal" i],[data-language-switcher]')) || links.some((link) => /nederlands|english|deutsch|fran[cç]ais|español/i.test(link.text)),
      readingTimeText: clean([...document.querySelectorAll("time,p,span")].map((element) => element.textContent ?? "").find((value) => /(?:min(?:ute)?s?(?:-|\s+)read|reading time|leestijd|minuten lezen)/i.test(value)) ?? ""),
      backToTopLinks: links.filter((link) => /#(?:top|review-top|page-top)$/i.test(link.rawHref) || /back to top|terug naar boven/i.test(link.text)),
      breadcrumbVisible: Boolean(document.querySelector('nav[aria-label*="breadcrumb" i],nav[aria-label*="broodkruim" i],[data-breadcrumbs]')),
    };
  });
}

function evaluateAutomatic(checkId, context) {
  const { desktop, mobile, schemaTypes, faqSchemaQuestions, contentAssets, ogAsset, twitterAsset, expectedPaa } = context;
  const keyword = REVIEW_DETAIL_TARGETS.primaryKeyword;
  const titleLength = desktop.title.length;
  const descriptionLength = desktop.metaDescription.length;
  const slug = decodeURIComponent(desktop.pathname.split("/").filter(Boolean).at(-1) ?? "");
  const articleLinks = desktop.links.filter((link) => link.inArticle);
  const internalLinks = articleLinks.filter((link) => link.hostname === new URL(desktop.url).hostname && !link.rawHref.startsWith("#"));
  const contextualInternal = internalLinks.filter((link) => link.inParagraph);
  const externalLinks = articleLinks.filter((link) => link.hostname && link.hostname !== new URL(desktop.url).hostname);
  const affiliateLinks = externalLinks.filter((link) => affiliateHostname(link.hostname) || link.rel.split(/\s+/).includes("sponsored"));
  const sourceLinks = externalLinks.filter((link) => !affiliateLinks.includes(link));
  const authorityLinks = sourceLinks.filter((link) => authoritativeHostname(link.hostname));
  const nonProviderAuthority = authorityLinks.filter((link) => !/(^|\.)nordvpn\.com$/i.test(link.hostname));
  const badAnchorPattern = /^(?:click here|read more|learn more|more|here|klik hier|lees meer|meer|hier|open providerreview)$/i;
  const badInternalAnchors = internalLinks.filter((link) => badAnchorPattern.test(link.text));
  const badAllAnchors = desktop.links.filter((link) => link.visible && badAnchorPattern.test(link.text));
  const contentImages = desktop.images.filter((image) => image.isContent);
  const faqQuestions = desktop.faq.map((entry) => normalizeQuestion(entry.question));
  const exactPaaMatches = expectedPaa.filter((question) => faqQuestions.includes(normalizeQuestion(question)));
  const faqSchemaNormalized = faqSchemaQuestions.map(normalizeQuestion);
  const h2QuestionOrSupport = desktop.h2s.filter((heading) => /\?|privacy|apps?|prijs|prijzen|price|performance|prestaties|speed|snelheid|netflix|alternatives?|alternatieven|compare|vergelijken|evidence|bewijs|trust|vertrouw|security|veilig/i.test(heading.text));
  const paragraphShortRatio = desktop.paragraphs.length
    ? desktop.paragraphs.filter((paragraph) => paragraph.sentences <= 4 || paragraph.sentences === 0).length / desktop.paragraphs.length
    : 0;
  const keywordTokens = desktop.rootText.toLocaleLowerCase().match(/nordvpn\s+review/g) ?? [];
  const keywordDensity = desktop.wordCount ? (keywordTokens.length * 2 / desktop.wordCount) * 100 : 100;
  const undersizedTouchTargets = mobile.interactive.filter((entry) => !entry.visuallyClipped && !entry.textLinkException && entry.display !== "inline" && (entry.width < 48 || entry.height < 48));
  const touchFailures = undersizedTouchTargets.filter((entry) => entry.inArticle);
  const siteShellTouchWarnings = undersizedTouchTargets.filter((entry) => !entry.inArticle);
  const contentImageFailures = (predicate) => contentAssets.filter((asset) => !predicate(asset));

  switch (checkId) {
    case "1.1":
      return inRange(titleLength, REVIEW_DETAIL_TARGETS.titleMin, REVIEW_DETAIL_TARGETS.titleMax) && desktop.title.toLocaleLowerCase().startsWith(keyword)
        ? pass(`${titleLength} characters; keyword starts the title`, desktop.title)
        : fail(`${titleLength} characters; expected 50-60 and a title starting with “${keyword}”`, desktop.title);
    case "1.2": {
      const hasKeyword = desktop.metaDescription.toLocaleLowerCase().includes("nordvpn");
      const hasSoftCta = /bekijk|lees|ontdek|vergelijk|see|read|discover|compare|learn/i.test(desktop.metaDescription);
      return inRange(descriptionLength, REVIEW_DETAIL_TARGETS.descriptionMin, REVIEW_DETAIL_TARGETS.descriptionMax) && hasKeyword && hasSoftCta
        ? pass(`${descriptionLength} characters with keyword and soft CTA`, desktop.metaDescription)
        : fail(`${descriptionLength} characters; expected 150-160 with NordVPN and a soft CTA`, desktop.metaDescription);
    }
    case "1.3": {
      let canonicalPath = "";
      try { canonicalPath = new URL(desktop.canonical).pathname.replace(/\/$/, ""); } catch { /* reported below */ }
      const renderedPath = new URL(desktop.url).pathname.replace(/\/$/, "");
      return desktop.canonical.startsWith("https://") && canonicalPath === renderedPath
        ? pass("HTTPS canonical matches the rendered page path", desktop.canonical)
        : fail("Canonical is missing or does not match the rendered page path", { canonical: desktop.canonical, url: desktop.url });
    }
    case "1.4": {
      const fields = Object.entries(desktop.og).filter(([, value]) => !value).map(([key]) => key);
      const imageValid = ogAsset?.ok && ogAsset.width === REVIEW_DETAIL_TARGETS.ogWidth && ogAsset.height === REVIEW_DETAIL_TARGETS.ogHeight;
      return fields.length === 0 && imageValid
        ? pass("Complete Open Graph metadata with a 1200x630 image", { ...desktop.og, imageAsset: ogAsset })
        : fail("Open Graph metadata is incomplete or image dimensions are not 1200x630", { missingFields: fields, imageAsset: ogAsset });
    }
    case "1.5": {
      const complete = desktop.twitter.card === "summary_large_image" && desktop.twitter.title && desktop.twitter.description && desktop.twitter.image;
      return complete ? pass("Complete summary_large_image Twitter Card", desktop.twitter) : fail("Twitter Card metadata is incomplete", desktop.twitter);
    }
    case "1.6": return desktop.locale ? pass(`html lang=${desktop.locale}`) : fail("HTML lang attribute is missing");
    case "1.7": return /width=device-width/i.test(desktop.viewport) ? pass("Responsive viewport metadata present", desktop.viewport) : fail("Viewport metadata is missing or incomplete", desktop.viewport);
    case "1.8": return desktop.favicon && desktop.appleTouchIcon ? pass("Favicon and apple-touch-icon present") : fail("Favicon or apple-touch-icon missing", { favicon: desktop.favicon, appleTouchIcon: desktop.appleTouchIcon });
    case "1.9": return /utf-?8/i.test(desktop.charset) ? pass("Explicit UTF-8 charset present", desktop.charset) : fail("Explicit UTF-8 charset meta is missing", desktop.charset);

    case "2.1": return slug.length < REVIEW_DETAIL_TARGETS.slugMax ? pass(`${slug.length}-character slug`, slug) : fail(`Slug is ${slug.length} characters`, slug);
    case "2.2": return /nordvpn/i.test(slug) && /reviews/i.test(desktop.pathname) ? pass("Keyword is represented by the reviews hierarchy and NordVPN slug", desktop.pathname) : fail("Review keyword is not represented in the URL", desktop.pathname);
    case "2.3": return !/_/.test(slug) && /^[a-z0-9-]+$/i.test(slug) ? pass("Slug uses supported characters and no underscores", slug) : fail("Slug contains underscores or unsupported separators", slug);
    case "2.4": return slug === slug.toLocaleLowerCase() ? pass("Slug is lowercase", slug) : fail("Slug is not lowercase", slug);
    case "2.5": return !/^(?:the|a|of)-|-(?:the|a|of)-|-(?:the|a|of)$/i.test(slug) ? pass("No unnecessary English stop words in slug", slug) : fail("Slug contains an avoidable stop word", slug);
    case "2.6": return /^\/(?:[a-z]{2}\/)?reviews\/[^/]+\/?$/i.test(desktop.pathname) ? pass("Logical reviews/slug hierarchy with optional locale prefix", desktop.pathname) : fail("Unexpected review URL hierarchy", desktop.pathname);

    case "3.1": return desktop.h1Count === 1 && /nordvpn\s+review/i.test(desktop.h1Text) ? pass("Exactly one keyword-bearing H1", desktop.h1Text) : fail(`Found ${desktop.h1Count} H1 elements or missing keyword`, desktop.h1Text);
    case "3.2": return desktop.headingSkips.length === 0 ? pass("No skipped heading levels") : fail("Heading hierarchy skips levels", desktop.headingSkips);
    case "3.3": return h2QuestionOrSupport.length >= 4 ? pass(`${h2QuestionOrSupport.length} supporting/question-led H2s`, h2QuestionOrSupport.map((entry) => entry.text)) : fail("Fewer than four supporting/question-led H2s", desktop.h2s.map((entry) => entry.text));
    case "3.4": return keywordDensity <= 1.5 ? pass(`Exact primary-keyword density ${keywordDensity.toFixed(2)}%`) : fail(`Exact primary-keyword density ${keywordDensity.toFixed(2)}% is excessive`);

    case "4.1": return desktop.first100Words.toLocaleLowerCase().includes(keyword) ? pass("Primary keyword appears in first 100 words") : fail("Primary keyword does not appear in first 100 words", desktop.first100Words);
    case "4.2": {
      const direct = /nordvpn/i.test(desktop.firstParagraph) && /(?:is|biedt|past|geschikt|keuze|option|offers|suits|worth|goed|betrouw)/i.test(desktop.firstParagraph);
      return direct ? pass("Opening paragraph gives a bounded NordVPN verdict", desktop.firstParagraph) : fail("Opening paragraph does not directly answer the review query", desktop.firstParagraph);
    }
    case "4.3": return inRange(desktop.wordCount, REVIEW_DETAIL_TARGETS.wordCountMin, REVIEW_DETAIL_TARGETS.wordCountMax) ? pass(`${desktop.wordCount} rendered article words; target ${REVIEW_DETAIL_TARGETS.wordCountMin}-${REVIEW_DETAIL_TARGETS.wordCountMax}`) : fail(`${desktop.wordCount} rendered article words; target ${REVIEW_DETAIL_TARGETS.wordCountMin}-${REVIEW_DETAIL_TARGETS.wordCountMax}`);
    case "4.4": return paragraphShortRatio >= 0.8 ? pass(`${Math.round(paragraphShortRatio * 100)}% of substantive paragraphs have at most four sentences`) : fail(`Only ${Math.round(paragraphShortRatio * 100)}% of substantive paragraphs have at most four sentences`);
    case "4.7": {
      const ratio = desktop.wordCount ? (desktop.strongWords / desktop.wordCount) * 100 : 100;
      return desktop.strongCount > 0 && ratio <= 8 ? pass(`${desktop.strongCount} emphasis nodes; ${ratio.toFixed(1)}% of words emphasized`) : fail("Bold emphasis is absent or overused", { nodes: desktop.strongCount, percent: ratio.toFixed(1) });
    }
    case "4.8": return desktop.listCount >= 2 ? pass(`${desktop.listCount} semantic lists`) : fail(`Only ${desktop.listCount} semantic lists`);

    case "5.1": return inRange(desktop.faq.length, REVIEW_DETAIL_TARGETS.faqMin, REVIEW_DETAIL_TARGETS.faqMax) && exactPaaMatches.length >= 4 ? pass(`${desktop.faq.length} visible FAQs; ${exactPaaMatches.length} exact current PAA matches`, exactPaaMatches) : fail(`${desktop.faq.length} visible FAQs and ${exactPaaMatches.length} exact PAA matches; expected 4-8 FAQs with at least four exact researched questions`, { questions: desktop.faq.map((entry) => entry.question), expectedPaa });
    case "5.2": {
      const failures = desktop.faq.filter((entry) => !inRange(entry.sentences, 2, 4));
      return desktop.faq.length > 0 && failures.length === 0 ? pass("Every FAQ answer contains two to four sentences") : fail("Some FAQ answers do not contain two to four sentences", failures);
    }
    case "5.3": {
      const missing = faqQuestions.filter((question) => !faqSchemaNormalized.includes(question));
      return schemaTypes.includes("FAQPage") && missing.length === 0 && desktop.faq.length > 0 ? pass("FAQPage schema matches all visible questions") : fail("FAQPage schema is missing or differs from visible FAQ content", { schemaTypes, missing });
    }

    case "6.1": {
      const failures = contentImages.filter((image) => !normalizeSpace(image.alt));
      return contentImages.length > 0 && failures.length === 0 ? pass(`${contentImages.length} content images have descriptive alt text`) : fail("A content image is missing descriptive alt text or no content image exists", failures);
    }
    case "6.2": {
      const failures = contentAssets.filter((asset) => !/^[a-z0-9]+(?:-[a-z0-9]+)+\.(?:webp|avif|png|jpe?g)$/i.test(asset.filename));
      return contentAssets.length > 0 && failures.length === 0 ? pass("Content image filenames are descriptive and hyphenated", contentAssets.map((asset) => asset.filename)) : fail("A content image filename is not descriptive and hyphenated", failures);
    }
    case "6.3": {
      const failures = contentImageFailures((asset) => asset.ok && asset.format === "webp" && asset.bytes <= REVIEW_DETAIL_TARGETS.imageMaxBytes);
      return contentAssets.length > 0 && failures.length === 0 ? pass("Rendered content images are WebP and below 200 KB", contentAssets) : fail("A rendered content image is not WebP or exceeds 200 KB", failures);
    }
    case "6.4": {
      const failures = contentImages.filter((image) => !image.widthAttr || !image.heightAttr);
      return contentImages.length > 0 && failures.length === 0 ? pass("Content images include width and height attributes") : fail("A content image lacks explicit width or height", failures);
    }
    case "6.5": {
      const belowFold = contentImages.slice(1).filter((image) => image.top > 900);
      const failures = belowFold.filter((image) => image.loading !== "lazy");
      return failures.length === 0 ? pass(`${belowFold.length} below-fold content images are lazy loaded`) : fail("A below-fold content image is not lazy loaded", failures);
    }
    case "6.6": {
      const failures = contentImages.filter((image) => !image.srcset);
      return contentImages.length > 0 && failures.length === 0 ? pass("Content images expose responsive srcset") : fail("A content image lacks srcset", failures);
    }
    case "6.7": return contentImages.length > 0 && ogAsset?.ok ? pass("Rendered featured image and social image are both available", { pageImage: contentAssets[0], socialImage: ogAsset }) : fail("Featured page image or social image is missing");

    case "7.1": return contextualInternal.length >= 3 ? pass(`${contextualInternal.length} contextual internal links`) : fail(`Only ${contextualInternal.length} contextual internal links`, contextualInternal);
    case "7.2": {
      const related = internalLinks.filter((link) => /\/(?:reviews|guides|best|methodology|compare|blog)\//i.test(new URL(link.href).pathname) || /\/(?:methodology|editorial-policy)\/?$/i.test(new URL(link.href).pathname));
      return related.length >= 2 ? pass(`${related.length} related review/guide/category links`, related.map((link) => ({ text: link.text, href: link.href }))) : fail("Fewer than two related review/guide/category links", related);
    }
    case "7.3": return badInternalAnchors.length === 0 ? pass("Internal links use descriptive anchors") : fail("Generic internal anchor text found", badInternalAnchors);
    case "7.4": return contextualInternal.length >= 2 ? pass(`${contextualInternal.length} internal links appear inside paragraphs or list items`) : fail("Too few internal links are placed in body context", contextualInternal);
    case "7.5": return desktop.breadcrumbVisible && schemaTypes.includes("BreadcrumbList") ? pass("Visible breadcrumbs and BreadcrumbList schema present") : fail("Visible breadcrumbs or BreadcrumbList schema missing", { visible: desktop.breadcrumbVisible, schemaTypes });

    case "8.1": return authorityLinks.length >= 2 && nonProviderAuthority.length >= 1 ? pass(`${authorityLinks.length} authoritative citations including ${nonProviderAuthority.length} non-provider source(s)`, authorityLinks.map((link) => link.href)) : fail("Need at least two authoritative sources including one non-provider source", authorityLinks.map((link) => link.href));
    case "8.3": {
      const failures = sourceLinks.filter((link) => link.target !== "_blank" || !/noopener|noreferrer/.test(link.rel));
      return sourceLinks.length > 0 && failures.length === 0 ? pass("External source links use target=_blank and noopener/noreferrer") : fail("External source link target/rel policy is incomplete", failures);
    }
    case "8.4": {
      const failures = affiliateLinks.filter((link) => !link.rel.split(/\s+/).includes("sponsored") || !link.rel.split(/\s+/).includes("nofollow"));
      return affiliateLinks.length > 0 && failures.length === 0 ? pass(`${affiliateLinks.length} affiliate links use sponsored nofollow`) : fail("Affiliate links are missing or have incomplete rel policy", failures);
    }

    case "9.1": return schemaTypes.includes("Article") ? pass("Article schema present") : fail("Article schema missing", schemaTypes);
    case "9.4": return schemaTypes.includes("FAQPage") ? pass("FAQPage schema present") : fail("FAQPage schema missing", schemaTypes);
    case "9.5": return schemaTypes.includes("BreadcrumbList") ? pass("BreadcrumbList schema present") : fail("BreadcrumbList schema missing", schemaTypes);
    case "9.6": return schemaTypes.includes("Organization") ? pass("Organization schema present") : fail("Organization schema missing", schemaTypes);
    case "9.7": return schemaTypes.includes("Person") ? pass("Person schema present") : fail("Person schema missing", schemaTypes);

    case "10.1": return desktop.authorLinks.length > 0 && /marvin smit/i.test(desktop.rootText) ? pass("Named Marvin Smit byline is visible") : fail("Named author byline or author relationship is missing", desktop.authorLinks);
    case "10.3": return desktop.authorLinks.some((link) => /\/authors?\/marvin-smit\/?$/i.test(new URL(link.href).pathname)) ? pass("Byline links to the Marvin Smit author page") : fail("Byline does not link to the dedicated Marvin Smit author page", desktop.authorLinks);
    case "10.4": {
      const published = desktop.timeElements.find((entry) => /published|gepubliceerd|publicatie/i.test(entry.context));
      return published?.dateTime ? pass("Published date is visible and machine readable", published) : fail("Published date with datetime is missing", desktop.timeElements);
    }
    case "10.5": {
      const updated = desktop.timeElements.find((entry) => /updated|reviewed|beoordeeld|bijgewerkt/i.test(entry.context));
      return updated?.dateTime ? pass("Updated/reviewed date is visible and machine readable", updated) : fail("Updated/reviewed date with datetime is missing", desktop.timeElements);
    }
    case "10.7": return authorityLinks.length >= 2 ? pass(`${authorityLinks.length} authoritative citations appear in the article`) : fail("Fewer than two authoritative citations appear in the article", authorityLinks);
    case "10.8": return desktop.aboutLinks.length > 0 ? pass("About page is linked", desktop.aboutLinks[0].href) : fail("About page link is missing");

    case "11.1": {
      const { header, nav, main, article, footer } = desktop.landmarks;
      return header >= 1 && nav >= 1 && main === 1 && article >= 1 && footer >= 1 ? pass("Semantic landmarks present with exactly one main", desktop.landmarks) : fail("Semantic landmarks are incomplete or main is duplicated", desktop.landmarks);
    }
    case "11.2": {
      const articleFailures = desktop.unnamedInteractive.filter((entry) => entry.inArticle && !entry.visuallyClipped);
      const siteShellWarnings = desktop.unnamedInteractive.filter((entry) => !entry.inArticle && !entry.visuallyClipped);
      return articleFailures.length === 0
        ? pass(`Every review-template interactive element has an accessible name; ${siteShellWarnings.length} global site-shell control(s) remain a separate manual follow-up`, siteShellWarnings)
        : fail("Unnamed review-template interactive elements found", articleFailures);
    }
    case "11.5": return desktop.allImagesHaveAlt ? pass("Every image has an alt attribute") : fail("At least one image lacks an alt attribute");
    case "11.6": return badAllAnchors.length === 0 ? pass("Rendered link text is descriptive") : fail("Generic link text found", badAllAnchors);
    case "11.7": return desktop.skipLinks.length > 0 ? pass("Skip-to-content link present", desktop.skipLinks[0]) : fail("Skip-to-content link missing or points to an unexpected target");

    case "12.1": return !mobile.hasHorizontalOverflow && mobile.viewportWidth <= 430 ? pass(`Mobile layout renders at ${mobile.viewportWidth}px without overflow`) : fail("Mobile layout does not adapt cleanly", { viewport: mobile.viewportWidth, documentWidth: mobile.documentWidth });
    case "12.2": return touchFailures.length === 0
      ? pass(`All review-template non-inline touch targets are at least 48x48; ${siteShellTouchWarnings.length} global site-shell target(s) remain a separate manual follow-up`, siteShellTouchWarnings.slice(0, 20))
      : fail(`${touchFailures.length} review-template non-inline touch targets are smaller than 48x48`, touchFailures.slice(0, 20));
    case "12.3": return mobile.bodyFontSize >= 16 ? pass(`Body font is ${mobile.bodyFontSize}px`) : fail(`Body font is ${mobile.bodyFontSize}px; expected at least 16px`);
    case "12.4": return !mobile.hasHorizontalOverflow ? pass("No horizontal scrolling at 390px") : fail("Horizontal overflow at 390px", { viewport: mobile.viewportWidth, documentWidth: mobile.documentWidth });
    case "12.5": return mobile.visibleDialogs === 0 ? pass("No intrusive dialog is visible on initial mobile render") : fail(`${mobile.visibleDialogs} dialog(s) visible on initial mobile render`);

    case "13.1": return ogAsset?.ok && ogAsset.width === REVIEW_DETAIL_TARGETS.ogWidth && ogAsset.height === REVIEW_DETAIL_TARGETS.ogHeight && ogAsset.bytes < 1_000_000 ? pass("Open Graph image is 1200x630 and below 1 MB", ogAsset) : fail("Open Graph image dimensions or weight are incorrect", ogAsset);
    case "13.2": return twitterAsset?.ok && twitterAsset.width === REVIEW_DETAIL_TARGETS.twitterWidth && twitterAsset.height === REVIEW_DETAIL_TARGETS.twitterHeight ? pass("Twitter image is 1200x600", twitterAsset) : fail("Twitter image dimensions are not 1200x600", twitterAsset);
    case "13.3": return desktop.og.description.length >= 80 && /nordvpn/i.test(desktop.og.description) ? pass("Open Graph description is specific and substantial", desktop.og.description) : fail("Open Graph description is too short or generic", desktop.og.description);

    case "14.9": {
      const firstCta = [...desktop.ctaCandidates].sort((a, b) => a.top - b.top)[0];
      return firstCta && firstCta.top <= 900
        ? pass(`Primary affiliate or owned-media CTA is above the fold at ${firstCta.top}px`, { text: firstCta.text, href: firstCta.href })
        : fail("No primary affiliate or owned-media CTA appears above the 900px desktop fold", firstCta ? { text: firstCta.text, href: firstCta.href, top: firstCta.top } : null);
    }
    case "14.10": return desktop.disclosureBeforeAffiliate && desktop.disclosureTop !== null && desktop.disclosureTop <= 900 ? pass("Affiliate disclosure appears above the fold and before the first affiliate link") : fail("Disclosure must appear above the fold and before the first affiliate link", { disclosureTop: desktop.disclosureTop, firstAffiliateTop: desktop.firstAffiliateTop, disclosureBeforeAffiliate: desktop.disclosureBeforeAffiliate });
    case "14.12": return desktop.languageIndicator ? pass("Visible language or region indicator found") : fail("Visible language or region indicator not detected");

    case "15.1": return desktop.tocLinks.length >= 4 && Math.min(...desktop.tocLinks.map((link) => link.top)) <= 1_600 ? pass(`${desktop.tocLinks.length} table-of-contents jump links near the top`) : fail("Table of contents is missing or too sparse", desktop.tocLinks);
    case "15.2": {
      const targetIds = new Set(desktop.tocLinks.map((link) => decodeURIComponent(link.rawHref.slice(1))));
      const missing = desktop.h2s.filter((heading) => !targetIds.has(heading.id));
      return desktop.h2s.length > 0 && missing.length === 0 ? pass(`Every ${desktop.h2s.length} anchored H2 has a jump link`) : fail("Some substantive H2s lack jump links", missing);
    }
    case "15.3": return desktop.backToTopLinks.length > 0 ? pass("Back-to-top control present", desktop.backToTopLinks[0]) : fail("Back-to-top control missing");
    case "15.5": return desktop.readingTimeText ? pass("Estimated reading time displayed", desktop.readingTimeText) : fail("Estimated reading time not detected");
    default:
      return manual(`No automatic evaluator is registered for ${checkId}`);
  }
}

function sourceFilename(source) {
  try {
    const url = new URL(source, "http://local.invalid");
    const optimizedSource = url.searchParams.get("url");
    const pathname = optimizedSource ? decodeURIComponent(optimizedSource) : url.pathname;
    return pathname.split("/").filter(Boolean).at(-1) ?? "";
  } catch {
    return source.split(/[/?#]/).filter(Boolean).at(-1) ?? "";
  }
}

async function run() {
  const browser = await launchBrowser();
  try {
    const desktopPage = await browser.newPage({ viewport: { width: 1_440, height: 900 }, deviceScaleFactor: 1 });
    const response = await desktopPage.goto(targetUrl, { waitUntil: "domcontentloaded", timeout: 30_000 });
    if (!response?.ok()) throw new Error(`Page returned ${response?.status() ?? "no response"}: ${targetUrl}`);
    await desktopPage.waitForLoadState("networkidle", { timeout: 8_000 }).catch(() => undefined);
    const desktop = await collectSnapshot(desktopPage);

    const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
    const mobileResponse = await mobilePage.goto(targetUrl, { waitUntil: "domcontentloaded", timeout: 30_000 });
    if (!mobileResponse?.ok()) throw new Error(`Mobile page returned ${mobileResponse?.status() ?? "no response"}: ${targetUrl}`);
    await mobilePage.waitForLoadState("networkidle", { timeout: 8_000 }).catch(() => undefined);
    const mobile = await collectSnapshot(mobilePage);

    const schemaValues = desktop.jsonLd.flatMap((entry) => schemaNodes(entry));
    const schemaTypes = [...new Set(schemaValues.flatMap((entry) => {
      const type = entry?.["@type"];
      return Array.isArray(type) ? type : type ? [type] : [];
    }))];
    const faqSchemaQuestions = schemaValues
      .filter((entry) => entry?.["@type"] === "Question" && entry.name)
      .map((entry) => normalizeSpace(entry.name));
    const localeKey = desktop.locale.toLocaleLowerCase().startsWith("nl") ? "nl" : "en";
    const expectedPaa = REVIEW_DETAIL_PAA[localeKey];
    const contentImages = desktop.images.filter((image) => image.isContent);
    const contentAssets = await Promise.all(contentImages.map(async (image) => ({
      ...await inspectAsset(image.currentSrc || image.srcAttr, desktop.url),
      filename: sourceFilename(image.srcAttr || image.currentSrc),
      alt: image.alt,
    })));
    const [ogAsset, twitterAsset] = await Promise.all([
      inspectAsset(desktop.og.image, desktop.url),
      inspectAsset(desktop.twitter.image, desktop.url),
    ]);

    const context = { desktop, mobile, schemaTypes, faqSchemaQuestions, contentAssets, ogAsset, twitterAsset, expectedPaa };
    const checks = REVIEW_DETAIL_CONTRACT.map((check) => {
      let evaluated;
      if (check.mode === "na") evaluated = na(check.note);
      else if (check.mode === "blocked") evaluated = blocked(check.note);
      else if (check.mode === "manual") evaluated = manual(check.note);
      else evaluated = evaluateAutomatic(check.id, context);
      return { ...check, ...evaluated };
    });
    const counts = Object.fromEntries(Object.values(REVIEW_DETAIL_STATUS).map((status) => [status, checks.filter((check) => check.status === status).length]));
    const payload = {
      audit: "ZeroToVPN rendered review-detail 80+ point contract",
      auditedAt: new Date().toISOString(),
      url: desktop.url,
      targets: REVIEW_DETAIL_TARGETS,
      summary: { total: checks.length, ...counts },
      rendered: {
        titleLength: desktop.title.length,
        metaDescriptionLength: desktop.metaDescription.length,
        wordCount: desktop.wordCount,
        faqCount: desktop.faq.length,
        internalArticleLinks: desktop.links.filter((link) => link.inArticle && link.hostname === new URL(desktop.url).hostname).length,
        externalArticleLinks: desktop.links.filter((link) => link.inArticle && link.hostname && link.hostname !== new URL(desktop.url).hostname).length,
        schemaTypes,
        contentAssets,
        ogAsset,
        twitterAsset,
        siteShellTouchWarnings: mobile.interactive.filter((entry) => !entry.inArticle && !entry.visuallyClipped && !entry.textLinkException && entry.display !== "inline" && (entry.width < 48 || entry.height < 48)),
        siteShellAccessibleNameWarnings: desktop.unnamedInteractive.filter((entry) => !entry.inArticle && !entry.visuallyClipped),
      },
      checks,
    };

    if (jsonOnly) {
      console.log(JSON.stringify(payload, null, 2));
    } else {
      console.log(`Review-detail audit: ${desktop.url}`);
      console.log(`PASS ${counts.pass} | FAIL ${counts.fail} | MANUAL ${counts.manual} | N/A ${counts.na} | BLOCKED ${counts.blocked} | TOTAL ${checks.length}`);
      console.log(`Rendered: title ${desktop.title.length}, description ${desktop.metaDescription.length}, words ${desktop.wordCount}, FAQ ${desktop.faq.length}`);
      let category = "";
      for (const check of checks) {
        if (check.category !== category) {
          category = check.category;
          console.log(`\n${category}`);
        }
        console.log(`  ${check.status.toUpperCase().padEnd(7)} ${check.id} ${check.label} — ${check.detail}`);
      }
    }

    if (counts.fail > 0) process.exitCode = 1;
  } finally {
    await browser.close();
  }
}

run().catch((error) => {
  const payload = {
    audit: "ZeroToVPN rendered review-detail 80+ point contract",
    auditedAt: new Date().toISOString(),
    url: targetUrl,
    fatal: error instanceof Error ? error.message : String(error),
  };
  console.error(jsonOnly ? JSON.stringify(payload, null, 2) : `Review-detail audit failed: ${payload.fatal}`);
  process.exitCode = 1;
});
