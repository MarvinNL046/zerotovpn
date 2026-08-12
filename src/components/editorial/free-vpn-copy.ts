import type { VpnLinkSlug } from "@/lib/vpn-links";

export type FreeVpnCardCopy = {
  name: string;
  vpnId: VpnLinkSlug;
  badge: string;
  description: string;
  limit: string;
  bestFor: string;
  officialUrl: string;
};

export type FreeVpnCopy = {
  updated: string;
  heroTitle: string;
  heroIntro: string;
  disclosure: string;
  quickAnswer: string;
  quickAnswerText: string;
  freeTiersLabel: string;
  freeTiersTitle: string;
  freeTiersIntro: string;
  safetyLabel: string;
  safetyTitle: string;
  safetyIntro: string;
  safetyItems: string[];
  paidLabel: string;
  paidTitle: string;
  paidIntro: string;
  restrictedLead: string;
  restrictedBody: string;
  comparePaid: string;
  faqTitle: string;
  sourcesTitle: string;
  sourceProton: string;
  sourceWindscribe: string;
  sourceTunnelBear: string;
  sourceDataForSeo: string;
  continueLead: string;
  continueTravel: string;
  continueWifi: string;
  continueProtocol: string;
  continueBest: string;
  cardBoundary: string;
  cardFit: string;
  cardVisit: string;
  cardOfficial: string;
  jsonLdTitle: string;
  jsonLdDescription: string;
  faqSchemaTitle: string;
  nav: { href: string; label: string }[];
  cards: FreeVpnCardCopy[];
  faq: { question: string; answer: string }[];
};

const sharedCards: FreeVpnCardCopy[] = [
  {
    name: "Proton VPN Free",
    vpnId: "protonvpn",
    badge: "Most usable data allowance",
    description: "Proton’s official free-plan page says the tier is free forever, ad-free and has no data limit. Server selection and streaming guarantees remain more limited than on paid plans.",
    limit: "Unlimited bandwidth; limited free locations and plan features.",
    bestFor: "Occasional browsing and a no-cost privacy baseline.",
    officialUrl: "https://protonvpn.com/free-vpn/download",
  },
  {
    name: "Windscribe Free",
    vpnId: "windscribe",
    badge: "Flexible capped tier",
    description: "Windscribe documents 10 GB per month with a confirmed email (2 GB without one), 10 free countries and unlimited devices on its current free Windows page.",
    limit: "10 GB/month with confirmed email; 2 GB without; fewer locations than Pro.",
    bestFor: "Several devices with light, capped usage.",
    officialUrl: "https://windscribe.com/features/windows",
  },
  {
    name: "TunnelBear Free",
    vpnId: "tunnelbear",
    badge: "Beginner-friendly trial tier",
    description: "TunnelBear’s current pricing page documents 2 GB of secure browsing for its free option. That makes it a small test tier rather than a general streaming or travel plan.",
    limit: "2 GB of secure browsing; check current platform availability.",
    bestFor: "Testing the app before deciding whether to pay.",
    officialUrl: "https://www.tunnelbear.com/pricing/",
  },
];

const englishFaq = [
  { question: "Is there any 100% free VPN?", answer: "Yes, some providers offer a free tier without a subscription fee. “Free” still comes with trade-offs such as limited locations, data caps, fewer simultaneous features or slower access. Read the current plan and privacy terms before installing." },
  { question: "Are free VPNs safe to use?", answer: "Safety depends on the provider, app, privacy policy, permissions and update path. Treat a free download as untrusted until you can identify the operator, the business model and current independent evidence. A free price is not evidence of privacy." },
  { question: "Can I use a free VPN for streaming?", answer: "Sometimes a free tier may connect to a streaming service, but providers often limit locations or explicitly reserve guaranteed streaming support for paid plans. We do not treat one successful playback as a stable feature." },
  { question: "Which free VPN works in China?", answer: "There is no responsible universal answer. Availability changes by network, device, protocol and date, and local rules matter. Prepare before travel and use the evidence-led China and restricted-network guides rather than a permanent-work claim." },
  { question: "Do free VPNs sell your data?", answer: "Some free VPN business models have collected or monetised user data, while others are funded by paid subscribers or another model. Check the current privacy policy, independent audits and permissions instead of applying a blanket percentage to every provider." },
  { question: "Are free VPNs illegal?", answer: "A free VPN is not automatically illegal, but VPN rules and permitted uses vary by country. Check local law and the provider's terms, and remember that a VPN does not make unlawful activity lawful." },
  { question: "Can the FBI track a free VPN?", answer: "A free VPN does not guarantee anonymity. Provider records, account or payment details, device signals and website logs can still identify activity, so review the provider's current privacy policy and do not promise that a VPN makes you untraceable." },
  { question: "Is there a free VPN without a credit card?", answer: "Some free tiers can be used without entering payment details, while trials and paid promotions may require a card. Verify the signup flow and note email, data and location limits; do not confuse a time-limited trial with a free tier." },
  { question: "Will Netflix ban me for using a free VPN?", answer: "Netflix and other streaming services may block VPN endpoints or show a proxy error. A free VPN therefore cannot promise stable access, and you should follow the service's terms rather than treating one successful playback as a guarantee." },
];

export const freeVpnCopy: Record<"en" | "fr", FreeVpnCopy> = {
  en: {
    updated: "Updated August 12, 2026 · free-tier guide",
    heroTitle: "Best free VPNs: what is actually free, safe and useful?",
    heroIntro: "A free VPN can be a sensible choice for light, occasional use—but “free” does not mean unlimited, private or suitable for censorship and streaming. Compare the plan boundary, privacy evidence and failure mode before you connect.",
    disclosure: "Independent editorial research. Affiliate links may earn us a commission;",
    quickAnswer: "Quick answer",
    quickAnswerText: "For a no-cost starting point, Proton VPN Free documents unlimited bandwidth and a free plan; Windscribe documents a monthly data allowance; TunnelBear documents a smaller monthly allowance. Those facts do not make any tier the best choice for every device, country or service. Check the official plan pages linked below.",
    freeTiersLabel: "Free-tier shortlist",
    freeTiersTitle: "Compare the limit you will actually hit",
    freeTiersIntro: "These cards separate provider-documented plan facts from our editorial fit. They are not a claim that a free tier will unblock a particular service.",
    safetyLabel: "Safety checklist",
    safetyTitle: "A free download is not a privacy audit",
    safetyIntro: "Before installing any free VPN, save the current privacy policy and app-store publisher, check permissions and confirm how the provider funds the service. Avoid sideloads, fake “100% free” browser extensions and apps that promise impossible anonymity.",
    safetyItems: ["Identify the operator and official download source.", "Read the current privacy policy and retention language.", "Check permissions, update history and independent audits.", "Record data, location and device limits before connecting.", "Test DNS/traffic fallback and the kill-switch behaviour.", "Do not use a free tier for high-risk work without a threat model."],
    paidLabel: "When to pay",
    paidTitle: "Upgrade for a requirement, not a fear headline",
    paidIntro: "A paid plan may add locations, support, higher limits, multi-device controls or streaming features. Compare the exact need and current renewal terms rather than assuming paid means private or guaranteed.",
    restrictedLead: "Restricted networks:",
    restrictedBody: "a free tier is not evidence that a provider works in China, Iran or on a blocked Wi-Fi network. Use the",
    comparePaid: "Compare paid plans",
    faqTitle: "Free VPN FAQ",
    sourcesTitle: "Sources and related guides",
    sourceProton: "Proton VPN Free plan — bandwidth, plan and streaming boundaries.",
    sourceWindscribe: "Windscribe Free plan — data and location limits.",
    sourceTunnelBear: "TunnelBear pricing — current free allowance.",
    sourceDataForSeo: "DataForSEO US/English dossier fetched August 12, 2026: PAA questions about truly free VPNs, legality, tracking, no-card access, streaming and China. Metrics prioritise questions; they do not prove provider outcomes.",
    continueLead: "Continue with the",
    continueTravel: "travel guide",
    continueWifi: "public Wi-Fi safety guide",
    continueProtocol: "protocol guide",
    continueBest: "Best VPN comparison",
    cardBoundary: "Data / access boundary",
    cardFit: "Best fit",
    cardVisit: "Visit",
    cardOfficial: "Verify free plan",
    jsonLdTitle: "Best Free VPNs: Safety, Limits and Trade-offs",
    jsonLdDescription: "Compare free VPN tiers by data limits, privacy evidence, locations and realistic use cases without blanket safety claims.",
    faqSchemaTitle: "Free VPN FAQ",
    nav: [{ href: "#quick-answer", label: "Quick answer" }, { href: "#free-tiers", label: "Free tiers" }, { href: "#safety", label: "Safety" }, { href: "#paid-upgrade", label: "When to pay" }, { href: "#faq", label: "FAQ" }, { href: "#sources", label: "Sources" }],
    cards: sharedCards,
    faq: englishFaq,
  },
  fr: {
    updated: "Mis à jour le 12 août 2026 · guide des offres gratuites",
    heroTitle: "Meilleurs VPN gratuits : ce qui est vraiment gratuit, sûr et utile",
    heroIntro: "Un VPN gratuit peut convenir à une utilisation légère et occasionnelle, mais « gratuit » ne signifie ni illimité, ni privé, ni adapté à la censure ou au streaming. Comparez les limites du forfait, les preuves de confidentialité et les risques avant de vous connecter.",
    disclosure: "Recherche éditoriale indépendante. Les liens affiliés peuvent nous rémunérer ;",
    quickAnswer: "Réponse rapide",
    quickAnswerText: "Pour commencer sans payer, Proton VPN Free indique une bande passante illimitée et un forfait gratuit ; Windscribe indique un quota mensuel ; TunnelBear indique un quota plus réduit. Ces éléments ne rendent aucun forfait idéal pour tous les appareils, pays ou services. Consultez les pages officielles ci-dessous.",
    freeTiersLabel: "Sélection de forfaits gratuits",
    freeTiersTitle: "Comparez la limite que vous atteindrez réellement",
    freeTiersIntro: "Ces fiches séparent les faits publiés par les fournisseurs de notre appréciation éditoriale. Elles ne garantissent pas qu’un forfait gratuit débloquera un service particulier.",
    safetyLabel: "Checklist de sécurité",
    safetyTitle: "Un téléchargement gratuit n’est pas un audit de confidentialité",
    safetyIntro: "Avant d’installer un VPN gratuit, enregistrez la politique de confidentialité et l’éditeur de l’application, vérifiez les permissions et comprenez le financement du service. Évitez les installations hors boutique, les extensions prétendument « 100 % gratuites » et les promesses d’anonymat impossible.",
    safetyItems: ["Identifiez l’opérateur et la source officielle de téléchargement.", "Lisez la politique de confidentialité et les règles de conservation actuelles.", "Vérifiez les permissions, les mises à jour et les audits indépendants.", "Notez les limites de données, de pays et d’appareils avant la connexion.", "Testez les fuites DNS, le basculement réseau et le coupe-circuit.", "N’utilisez pas un forfait gratuit pour une activité à risque sans modèle de menace."],
    paidLabel: "Quand payer",
    paidTitle: "Payez pour un besoin précis, pas sous l’effet d’un titre alarmiste",
    paidIntro: "Un forfait payant peut ajouter des pays, une assistance, des quotas plus élevés, des fonctions multi-appareils ou le streaming. Comparez votre besoin exact et les conditions de renouvellement au lieu de supposer que le payant est privé ou garanti.",
    restrictedLead: "Réseaux restreints :",
    restrictedBody: "un forfait gratuit ne prouve pas qu’un fournisseur fonctionne en Chine, en Iran ou sur un Wi-Fi bloqué. Consultez le",
    comparePaid: "Comparer les forfaits payants",
    faqTitle: "FAQ sur les VPN gratuits",
    sourcesTitle: "Sources et guides associés",
    sourceProton: "Forfait gratuit Proton VPN — limites de bande passante, de forfait et de streaming.",
    sourceWindscribe: "Forfait gratuit Windscribe — limites de données et de pays.",
    sourceTunnelBear: "Tarifs TunnelBear — quota gratuit actuel.",
    sourceDataForSeo: "Dossier DataForSEO US/anglais récupéré le 12 août 2026 : questions PAA sur les VPN vraiment gratuits, la légalité, le suivi, l’accès sans carte, le streaming et la Chine. Ces métriques orientent les questions ; elles ne prouvent pas les performances d’un fournisseur.",
    continueLead: "Poursuivez avec le",
    continueTravel: "guide VPN pour les voyages",
    continueWifi: "guide de sécurité du Wi-Fi public",
    continueProtocol: "guide des protocoles",
    continueBest: "comparatif des meilleurs VPN",
    cardBoundary: "Limite de données / accès",
    cardFit: "Idéal pour",
    cardVisit: "Voir",
    cardOfficial: "Vérifier le forfait gratuit",
    jsonLdTitle: "Meilleurs VPN gratuits : sécurité, limites et compromis",
    jsonLdDescription: "Comparez les forfaits VPN gratuits selon leurs limites de données, leurs preuves de confidentialité, leurs pays disponibles et leurs usages réels, sans promesse générale de sécurité.",
    faqSchemaTitle: "FAQ sur les VPN gratuits",
    nav: [{ href: "#quick-answer", label: "Réponse rapide" }, { href: "#free-tiers", label: "Forfaits gratuits" }, { href: "#safety", label: "Sécurité" }, { href: "#paid-upgrade", label: "Quand payer" }, { href: "#faq", label: "FAQ" }, { href: "#sources", label: "Sources" }],
    cards: [
      { ...sharedCards[0], badge: "Quota le plus utilisable", description: "La page officielle du forfait gratuit Proton indique une offre gratuite sans publicité et sans limite de données. Le choix des serveurs et les garanties de streaming restent plus limités que dans les forfaits payants.", limit: "Bande passante illimitée ; pays et fonctions gratuits limités.", bestFor: "Navigation occasionnelle et première protection sans frais." },
      { ...sharedCards[1], badge: "Forfait plafonné flexible", description: "Windscribe indique 10 Go par mois avec une adresse e-mail confirmée (2 Go sans confirmation), 10 pays gratuits et un nombre d’appareils illimité sur sa page Windows actuelle.", limit: "10 Go/mois avec e-mail confirmé ; 2 Go sans confirmation ; moins de pays que Pro.", bestFor: "Plusieurs appareils avec une utilisation légère et plafonnée." },
      { ...sharedCards[2], badge: "Forfait d’essai pour débuter", description: "La page tarifaire actuelle de TunnelBear indique 2 Go de navigation sécurisée pour son option gratuite. Il s’agit donc d’un petit forfait de test, pas d’une solution générale pour le streaming ou les voyages.", limit: "2 Go de navigation sécurisée ; vérifiez la disponibilité sur votre appareil.", bestFor: "Tester l’application avant de décider de payer." },
    ],
    faq: [
      { question: "Existe-t-il un VPN 100 % gratuit ?", answer: "Oui, certains fournisseurs proposent un forfait gratuit sans abonnement. « Gratuit » implique toutefois des compromis : pays limités, quota de données, moins de fonctions simultanées ou accès plus lent. Lisez les conditions actuelles avant l’installation." },
      { question: "Les VPN gratuits sont-ils sûrs ?", answer: "La sécurité dépend du fournisseur, de l’application, de la politique de confidentialité, des permissions et des mises à jour. Identifiez l’opérateur, son modèle économique et les preuves indépendantes actuelles ; un prix nul ne prouve pas la confidentialité." },
      { question: "Puis-je utiliser un VPN gratuit pour le streaming ?", answer: "Parfois, un forfait gratuit peut se connecter à un service de streaming, mais les fournisseurs limitent souvent les pays ou réservent le streaming garanti aux forfaits payants. Une lecture réussie ne constitue pas une fonctionnalité stable." },
      { question: "Quel VPN gratuit fonctionne en Chine ?", answer: "Il n’existe pas de réponse universelle responsable. La disponibilité dépend du réseau, de l’appareil, du protocole et de la date, et les règles locales comptent. Préparez votre voyage et consultez les guides Chine et réseaux restreints plutôt qu’une promesse permanente." },
      { question: "Les VPN gratuits vendent-ils vos données ?", answer: "Certains modèles gratuits ont collecté ou monétisé des données, tandis que d’autres sont financés par des abonnés payants ou autrement. Vérifiez la politique de confidentialité, les audits et les permissions au lieu d’appliquer un pourcentage à tous les fournisseurs." },
      { question: "Les VPN gratuits sont-ils légaux ?", answer: "Un VPN gratuit n’est pas automatiquement illégal, mais les règles et usages permis varient selon le pays. Vérifiez le droit local et les conditions du fournisseur ; un VPN ne rend pas une activité illégale licite." },
      { question: "Le FBI peut-il suivre un VPN gratuit ?", answer: "Un VPN gratuit ne garantit pas l’anonymat. Les données du fournisseur, le compte ou le paiement, l’appareil et les journaux du site peuvent encore identifier une activité. Ne promettez donc pas qu’un VPN vous rend intraçable." },
      { question: "Existe-t-il un VPN gratuit sans carte bancaire ?", answer: "Certains forfaits gratuits s’utilisent sans saisir de moyen de paiement, tandis que les essais et promotions payantes peuvent demander une carte. Vérifiez le parcours d’inscription et les limites d’e-mail, de données et de pays ; ne confondez pas essai limité et forfait gratuit." },
      { question: "Netflix peut-il me bannir si j’utilise un VPN gratuit ?", answer: "Netflix et d’autres services peuvent bloquer des serveurs VPN ou afficher une erreur de proxy. Un VPN gratuit ne peut donc pas garantir un accès stable ; suivez les conditions du service et ne prenez pas une lecture réussie pour une garantie." },
    ],
  },
};

export const spanishFreeVpnCopy: FreeVpnCopy = {
  ...freeVpnCopy.en,
  updated: "Actualizado el 12 de agosto de 2026 · guía de planes gratuitos",
  heroTitle: "Mejores VPN gratis: qué es realmente gratuito, seguro y útil",
  heroIntro: "Una VPN gratis puede servir para un uso ligero y ocasional, pero «gratis» no significa ilimitada, privada ni adecuada para la censura o el streaming. Compara los límites del plan, las pruebas de privacidad y los posibles fallos antes de conectarte.",
  disclosure: "Investigación editorial independiente. Los enlaces de afiliado pueden generar una comisión;",
  quickAnswer: "Respuesta rápida",
  quickAnswerText: "Para empezar sin pagar, Proton VPN Free documenta ancho de banda ilimitado y un plan gratuito; Windscribe documenta un límite mensual de datos; TunnelBear documenta un límite menor. Estos datos no convierten ningún plan en la mejor opción para todos los dispositivos, países o servicios. Consulta las páginas oficiales enlazadas abajo.",
  freeTiersLabel: "Selección de planes gratuitos",
  freeTiersTitle: "Compara el límite que realmente vas a alcanzar",
  freeTiersIntro: "Estas fichas separan los datos publicados por cada proveedor de nuestra valoración editorial. No garantizan que un plan gratuito desbloquee un servicio concreto.",
  safetyLabel: "Lista de seguridad",
  safetyTitle: "Una descarga gratis no es una auditoría de privacidad",
  safetyIntro: "Antes de instalar una VPN gratis, guarda la política de privacidad actual y el editor de la aplicación, revisa los permisos y confirma cómo se financia el servicio. Evita instalaciones externas, extensiones que prometen ser «100 % gratis» y aplicaciones que ofrecen un anonimato imposible.",
  safetyItems: ["Identifica al operador y la fuente oficial de descarga.", "Lee la política de privacidad y las reglas de conservación actuales.", "Revisa permisos, historial de actualizaciones y auditorías independientes.", "Anota los límites de datos, países y dispositivos antes de conectarte.", "Prueba las fugas DNS, el cambio de red y el interruptor de emergencia.", "No uses un plan gratuito para actividades de alto riesgo sin un modelo de amenazas."],
  paidLabel: "Cuándo pagar",
  paidTitle: "Paga por una necesidad concreta, no por un titular alarmista",
  paidIntro: "Un plan de pago puede añadir países, asistencia, límites más altos, controles para varios dispositivos o funciones de streaming. Compara tu necesidad exacta y las condiciones de renovación actuales; pagar no implica automáticamente privacidad ni garantía.",
  restrictedLead: "Redes restringidas:",
  restrictedBody: "un plan gratuito no demuestra que un proveedor funcione en China, Irán o una red Wi-Fi bloqueada. Consulta la",
  comparePaid: "Comparar planes de pago",
  faqTitle: "Preguntas frecuentes sobre VPN gratis",
  sourcesTitle: "Fuentes y guías relacionadas",
  sourceProton: "Plan gratuito de Proton VPN — límites de ancho de banda, plan y streaming.",
  sourceWindscribe: "Plan gratuito de Windscribe — límites de datos y ubicaciones.",
  sourceTunnelBear: "Precios de TunnelBear — cuota gratuita actual.",
  sourceDataForSeo: "Dossier DataForSEO US/inglés obtenido el 12 de agosto de 2026: preguntas PAA sobre VPN realmente gratis, legalidad, seguimiento, acceso sin tarjeta, streaming y China. Las métricas priorizan preguntas; no demuestran resultados de proveedores.",
  continueLead: "Continúa con la",
  continueTravel: "guía de VPN para viajes",
  continueWifi: "guía de seguridad en Wi-Fi público",
  continueProtocol: "guía de protocolos",
  continueBest: "comparativa de mejores VPN",
  cardBoundary: "Límite de datos / acceso",
  cardFit: "Ideal para",
  cardVisit: "Ver",
  cardOfficial: "Verificar plan gratuito",
  jsonLdTitle: "Mejores VPN gratis: seguridad, límites y compromisos",
  jsonLdDescription: "Compara planes VPN gratuitos por límites de datos, pruebas de privacidad, ubicaciones y usos reales, sin afirmaciones generales de seguridad.",
  faqSchemaTitle: "Preguntas frecuentes sobre VPN gratis",
  nav: [{ href: "#quick-answer", label: "Respuesta rápida" }, { href: "#free-tiers", label: "Planes gratuitos" }, { href: "#safety", label: "Seguridad" }, { href: "#paid-upgrade", label: "Cuándo pagar" }, { href: "#faq", label: "Preguntas frecuentes" }, { href: "#sources", label: "Fuentes" }],
  cards: [
    { ...sharedCards[0], badge: "Límite de datos más útil", description: "La página oficial del plan gratuito de Proton indica que es gratis para siempre, sin anuncios y sin límite de datos. La selección de servidores y las garantías de streaming son más limitadas que en los planes de pago.", limit: "Ancho de banda ilimitado; ubicaciones y funciones gratuitas limitadas.", bestFor: "Navegación ocasional y una base de privacidad sin coste." },
    { ...sharedCards[1], badge: "Plan flexible con límite", description: "Windscribe documenta 10 GB al mes con un correo confirmado (2 GB sin confirmarlo), 10 países gratuitos y dispositivos ilimitados en su página actual para Windows.", limit: "10 GB/mes con correo confirmado; 2 GB sin confirmarlo; menos ubicaciones que Pro.", bestFor: "Varios dispositivos con un uso ligero y limitado." },
    { ...sharedCards[2], badge: "Plan de prueba para principiantes", description: "La página de precios actual de TunnelBear documenta 2 GB de navegación segura para su opción gratuita. Es un plan pequeño para probar, no una solución general para streaming o viajes.", limit: "2 GB de navegación segura; comprueba la disponibilidad en tu plataforma.", bestFor: "Probar la aplicación antes de decidir si pagar." },
  ],
  faq: [
    { question: "¿Existe alguna VPN 100 % gratis?", answer: "Sí, algunos proveedores ofrecen un plan gratuito sin suscripción. «Gratis» sigue implicando límites de ubicaciones, datos o funciones, además de un acceso más lento. Lee las condiciones actuales antes de instalarla." },
    { question: "¿Es seguro usar una VPN gratis?", answer: "La seguridad depende del proveedor, la aplicación, la política de privacidad, los permisos y las actualizaciones. Identifica al operador, su modelo de negocio y las pruebas independientes actuales; un precio de cero no demuestra privacidad." },
    { question: "¿Puedo usar una VPN gratis para streaming?", answer: "A veces un plan gratuito puede conectarse a un servicio de streaming, pero los proveedores suelen limitar ubicaciones o reservar el streaming garantizado para planes de pago. Una reproducción correcta no es una función estable." },
    { question: "¿Qué VPN gratis funciona en China?", answer: "No existe una respuesta universal responsable. La disponibilidad cambia según red, dispositivo, protocolo y fecha, y las normas locales importan. Prepárate antes de viajar y consulta las guías de China y redes restringidas, no una promesa permanente." },
    { question: "¿Las VPN gratis venden tus datos?", answer: "Algunos modelos gratuitos han recopilado o monetizado datos, mientras otros se financian con suscriptores de pago u otro modelo. Comprueba la política de privacidad, las auditorías y los permisos en lugar de aplicar un porcentaje a todos los proveedores." },
    { question: "¿Son ilegales las VPN gratis?", answer: "Una VPN gratuita no es automáticamente ilegal, pero las normas y los usos permitidos varían según el país. Comprueba la legislación local y las condiciones del proveedor; una VPN no convierte una actividad ilegal en legal." },
    { question: "¿Puede el FBI rastrear una VPN gratis?", answer: "Una VPN gratis no garantiza anonimato. Los registros del proveedor, la cuenta o el pago, las señales del dispositivo y los registros del sitio aún pueden identificar actividad; no prometas que una VPN te vuelve imposible de rastrear." },
    { question: "¿Hay una VPN gratis sin tarjeta?", answer: "Algunos planes gratuitos se pueden usar sin introducir datos de pago, mientras que las pruebas y promociones de pago pueden pedir una tarjeta. Verifica el registro y los límites de correo, datos y ubicaciones; no confundas una prueba temporal con un plan gratuito." },
    { question: "¿Netflix puede bloquearme por usar una VPN gratis?", answer: "Netflix y otros servicios pueden bloquear servidores VPN o mostrar un error de proxy. Una VPN gratis no puede garantizar acceso estable; sigue las condiciones del servicio y no confundas una reproducción con una garantía." },
  ],
};
