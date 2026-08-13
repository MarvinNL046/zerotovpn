import { Apple, CheckCircle2, CircleAlert, Laptop, LockKeyhole, Wifi } from "lucide-react";
import { ArticleJsonLd } from "@/components/seo/json-ld";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { FAQSchema } from "@/components/seo/faq-schema";
import { BestVpnEditorialTemplate } from "@/components/editorial/best-vpn-editorial-template";
import { AffiliateButton, AffiliateTextLink } from "@/components/vpn/affiliate-button";
import { Link } from "@/i18n/navigation";
import type { EditorialContentBrief } from "@/lib/editorial-content-brief";
import type { VpnData } from "@/lib/vpn-data-layer";

export const macosVpnEditorialTitle = "Best VPNs for macOS in 2026: Mac App, Apple Silicon and Privacy Checks";
export const macosVpnEditorialDescription = "Compare Mac VPN options by current macOS app support, Apple Silicon and Intel boundaries, public Wi-Fi behaviour, privacy checks and plan terms - not fixed speed or battery claims.";
const siteUrl = "https://www.zerotovpn.com";
const brief = { primaryKeyword: "best vpn for macos", intent: "commercial", cluster: "mobile-and-device-privacy", lastReviewedAt: "2026-08-13", evidence: ["docs/research/dataforseo-macos-vpn-cluster-2026-08-13.md", "/methodology", "/best/vpn-laptops"], affiliateContext: "vpn-selection", schemaType: "CollectionPage" } satisfies EditorialContentBrief;

type FaqItem = { question: string; answer: string };
type ProviderSlug = "nordvpn" | "expressvpn" | "surfshark";
type MacosCopy = {
  title: string;
  description: string;
  breadcrumbRoot: string;
  breadcrumbCurrent: string;
  badge: string;
  evidenceBoundary: string;
  reviewed: string;
  nav: Array<{ href: string; label: string }>;
  quickTitle: string;
  quickIntro: string;
  providerLabels: Record<ProviderSlug, string>;
  providerNotes: Record<ProviderSlug, string>;
  priceSuffix: string;
  catalogLabel: string;
  checkLabel: string;
  compareTitle: string;
  compareIntro: string;
  tableCaption: string;
  tableHeaders: [string, string, string];
  tableRows: Array<[string, string, string]>;
  setupTitle: string;
  setupChecks: string[];
  boundaryCards: Array<[string, string]>;
  faqTitle: string;
  faq: FaqItem[];
  sourcesTitle: string;
  sourcesIntro: string;
  sourceLinks: Array<[string, string]>;
  measurementLead: string;
};

const englishFaq: FaqItem[] = [
  { question: "Does a Mac VPN support Apple Silicon?", answer: "Support depends on the provider app version, macOS release and whether the app uses a native or translated path. Check current provider documentation for the exact Mac and macOS version you use." },
  { question: "Will a VPN slow down my Mac?", answer: "Throughput and latency vary with protocol, server, network, Mac hardware and workload. Measure the same route before and after connecting instead of relying on a universal speed claim." },
  { question: "Should I use a VPN on Mac public Wi-Fi?", answer: "It can reduce exposure to the local network, but it does not make a cafe, hotel or airport network trustworthy. Keep macOS updated and confirm auto-connect and reconnect behaviour." },
  { question: "Do Mac VPN browser extensions cover every app?", answer: "Usually not. A browser extension generally affects browser traffic, while a desktop app can manage a broader system route. Test the browser, a sensitive app and local-network access separately." },
  { question: "What should I check before subscribing to a Mac VPN?", answer: "Confirm macOS and hardware support, permissions, auto-connect, kill-switch behaviour, device limits, renewal terms, refund window and privacy documentation. Verify the plan at checkout." },
];

const baseCopy: MacosCopy = {
  title: macosVpnEditorialTitle,
  description: macosVpnEditorialDescription,
  breadcrumbRoot: "Best VPNs",
  breadcrumbCurrent: "macOS VPNs",
  badge: "macOS privacy and Mac decision guide",
  evidenceBoundary: "Apple Silicon support, battery use, speed and privacy outcomes vary by Mac model, macOS version, protocol, network and permissions. Verify the route you need before subscribing.",
  reviewed: "Reviewed 13 August 2026. DataForSEO guided Mac, macOS and Apple Silicon questions; it does not prove provider performance.",
  nav: [{ href: "#quick-picks", label: "Options" }, { href: "#comparison", label: "Compare" }, { href: "#setup", label: "Setup" }, { href: "#faq", label: "FAQ" }, { href: "#sources", label: "Sources" }],
  quickTitle: "Mac VPN options to verify",
  quickIntro: "These providers are commercial starting points, not fixed winners. Use current first-party macOS documentation and your own Mac checks as the source of truth.",
  providerLabels: { nordvpn: "Everyday Mac shortlist", expressvpn: "App simplicity comparison", surfshark: "Device-count comparison" },
  providerNotes: { nordvpn: "Check the current macOS app, auto-connect and device terms against your workflow.", expressvpn: "Compare permissions, protocol choices and reconnect behaviour on your Mac.", surfshark: "Review current simultaneous-device terms when one plan must cover a Mac and other devices." },
  priceSuffix: "/mo equivalent",
  catalogLabel: "Catalog checked",
  checkLabel: "Check Mac route",
  compareTitle: "Compare the macOS route",
  compareIntro: "A Mac VPN is a set of app, permission and network behaviours. Compare failure boundaries, not a universal performance score.",
  tableCaption: "macOS VPN evidence checklist",
  tableHeaders: ["Question", "What to verify", "Boundary"],
  tableRows: [["Hardware and OS", "Current app, macOS release, Apple Silicon and Intel support", "A download page does not prove every hardware or OS path"], ["System coverage", "Desktop app versus browser extension, exclusions and local access", "A browser extension usually covers less than a desktop app"], ["Public Wi-Fi", "Auto-connect, reconnect, DNS and kill-switch behaviour", "A VPN does not replace HTTPS, updates or account security"], ["Plan terms", "Device limits, renewal price and refund conditions", "Catalog prices change; verify checkout before purchase"]],
  setupTitle: "Six checks before you rely on a Mac VPN",
  setupChecks: ["Record the Mac model, macOS version, app version, network and date.", "Install only from the provider's verified source and inspect permissions.", "Test Wi-Fi changes, auto-connect and reconnect after sleep or network handoffs.", "Check browser traffic, a sensitive app and local-network access separately.", "Test DNS, kill-switch and split-tunnelling behaviour before travelling.", "Write down device limits, renewal price, refund path and cancellation steps."],
  boundaryCards: [["Hardware boundary", "Test your exact Apple Silicon or Intel model and current macOS release."], ["Network changes", "Test home Wi-Fi, tethering and a public network separately."], ["Privacy boundary", "A VPN changes one network observer's view; it does not make every app anonymous."]],
  faqTitle: "macOS VPN FAQ",
  faq: englishFaq,
  sourcesTitle: "Sources and related checks",
  sourcesIntro: "The US/English DataForSEO dossier was refreshed 13 August 2026. Verify current macOS support and terms on the provider page before subscribing.",
  sourceLinks: [["Laptop VPN comparison", "/best/vpn-laptops"], ["iPhone VPN comparison", "/best/vpn-iphone"], ["iPad VPN comparison", "/best/vpn-ipad"], ["VPN privacy comparison", "/best/vpn-privacy"], ["VPN protocols explained", "/guides/vpn-protocols-explained"], ["ZeroToVPN methodology", "/methodology"]],
  measurementLead: "Need a deeper measurement? Record the result with your device and network context using the linked tool.",
};

const localizedCopy: Record<string, Partial<MacosCopy>> = {
  nl: {
    title: "Beste VPN's voor macOS in 2026: app-ondersteuning en privacychecks",
    description: "Vergelijk VPN's voor Mac op actuele app-ondersteuning, Apple Silicon- en Intelgrenzen, openbaar wifi, privacychecks en planvoorwaarden — niet op vaste snelheids- of batterijclaims.",
    breadcrumbRoot: "Beste VPN's",
    breadcrumbCurrent: "macOS VPN's",
    badge: "macOS privacy- en beslisgids",
    evidenceBoundary: "Ondersteuning voor Apple Silicon, batterijgebruik, snelheid en privacy-uitkomsten verschillen per Mac-model, macOS-versie, protocol, netwerk en toestemming. Controleer jouw route voordat je abonneert.",
    reviewed: "Beoordeeld op 13 augustus 2026. DataForSEO hielp bij de vragen over Mac, macOS en Apple Silicon; het bewijst geen providerprestaties.",
    nav: [{ href: "#quick-picks", label: "Opties" }, { href: "#comparison", label: "Vergelijken" }, { href: "#setup", label: "Instellen" }, { href: "#faq", label: "FAQ" }, { href: "#sources", label: "Bronnen" }],
    quickTitle: "Mac-VPN-opties om te controleren",
    quickIntro: "Deze providers zijn commerciële startpunten, geen vaste winnaars. Gebruik actuele documentatie van de provider en je eigen Mac-tests als bron van waarheid.",
    providerLabels: { nordvpn: "Dagelijkse Mac-shortlist", expressvpn: "Vergelijking van app-eenvoud", surfshark: "Vergelijking van apparaattermen" },
    providerNotes: { nordvpn: "Controleer de actuele macOS-app, automatische verbinding en apparaattermen voor jouw gebruik.", expressvpn: "Vergelijk toestemmingen, protocolkeuzes en opnieuw verbinden op je Mac.", surfshark: "Controleer de actuele limiet voor gelijktijdige apparaten als één plan meerdere apparaten moet dekken." },
    priceSuffix: "/mnd equivalent",
    catalogLabel: "Catalogus gecontroleerd",
    checkLabel: "Controleer Mac-route",
    compareTitle: "Vergelijk de macOS-route",
    compareIntro: "Een Mac-VPN bestaat uit app-, toestemmings- en netwerkgedrag. Vergelijk foutgrenzen, geen universele prestatiescore.",
    tableCaption: "Evidence-checklist voor macOS-VPN's",
    tableHeaders: ["Vraag", "Wat controleer je?", "Grens"],
    tableRows: [["Hardware en OS", "Actuele app, macOS-release en Apple Silicon- of Intel-ondersteuning", "Een downloadpagina bewijst niet elke hardware- of OS-route"], ["Systeemdekking", "Desktopapp versus browserextensie, uitzonderingen en lokale toegang", "Een browserextensie dekt meestal minder dan een desktopapp"], ["Openbare wifi", "Automatisch verbinden, opnieuw verbinden, DNS en kill switch", "Een VPN vervangt geen HTTPS, updates of accountbeveiliging"], ["Planvoorwaarden", "Apparaatlimiet, verlengingsprijs en restitutievoorwaarden", "Catalogusprijzen wijzigen; controleer de checkout"]],
    setupTitle: "Zes checks voordat je op een Mac-VPN vertrouwt",
    setupChecks: ["Noteer Mac-model, macOS-versie, appversie, netwerk en datum.", "Installeer alleen via een geverifieerde bron en controleer toestemmingen.", "Test wifi-wissels, automatisch verbinden en opnieuw verbinden na slaapstand.", "Controleer browserverkeer, een gevoelige app en lokale toegang afzonderlijk.", "Test DNS-, kill-switch- en split-tunnelinggedrag voordat je reist.", "Noteer apparaattermen, verlengingsprijs, restitutie en annulering."],
    boundaryCards: [["Hardwaregrens", "Test jouw exacte Apple Silicon- of Intel-model en actuele macOS-release."], ["Netwerkwissels", "Test thuiswifi, tethering en een openbaar netwerk afzonderlijk."], ["Privacygrens", "Een VPN verandert het zicht van één netwerkwaarnemer; niet elke app wordt anoniem."]],
    faqTitle: "macOS-VPN FAQ",
    faq: [{ question: "Ondersteunt een Mac-VPN Apple Silicon?", answer: "Dat hangt af van de appversie, macOS-release en de gebruikte native of vertaalde route. Controleer de actuele documentatie voor jouw Mac en macOS-versie." }, { question: "Maakt een VPN mijn Mac trager?", answer: "Doorvoer en latency verschillen per protocol, server, netwerk, hardware en taak. Meet dezelfde route voor en na verbinden in plaats van een universele snelheidsclaim te gebruiken." }, { question: "Moet ik een VPN gebruiken op openbare wifi op mijn Mac?", answer: "Het kan blootstelling aan het lokale netwerk verminderen, maar maakt een café-, hotel- of luchthavennetwerk niet betrouwbaar. Houd macOS bijgewerkt en controleer automatisch verbinden en herstelgedrag." }, { question: "Dekt een Mac-VPN-browserextensie elke app?", answer: "Meestal niet. Een browserextensie beïnvloedt doorgaans browserverkeer; een desktopapp kan een bredere systeemroute beheren. Test browser, gevoelige app en lokale toegang apart." }, { question: "Wat controleer ik voordat ik een Mac-VPN neem?", answer: "Controleer macOS- en hardwareondersteuning, toestemmingen, automatisch verbinden, kill-switchgedrag, apparaattermen, verlenging, restitutie en privacydocumentatie. Verifieer het plan bij checkout." }],
    sourcesTitle: "Bronnen en gerelateerde checks",
    sourcesIntro: "Het Amerikaanse/Engelse DataForSEO-dossier is vernieuwd op 13 augustus 2026. Controleer actuele macOS-ondersteuning en voorwaarden op de providerpagina.",
    sourceLinks: [["Laptop-VPN-vergelijking", "/best/vpn-laptops"], ["iPhone-VPN-vergelijking", "/best/vpn-iphone"], ["iPad-VPN-vergelijking", "/best/vpn-ipad"], ["VPN-privacyvergelijking", "/best/vpn-privacy"], ["VPN-protocollen uitgelegd", "/guides/vpn-protocols-explained"], ["ZeroToVPN-methodologie", "/methodology"]],
    measurementLead: "Wil je dieper meten? Noteer het resultaat met je apparaat- en netwerkcontext via de gekoppelde tool.",
  },
  de: {
    title: "Beste VPNs für macOS 2026: App-Unterstützung und Datenschutzchecks",
    description: "Vergleichen Sie Mac-VPNs nach aktueller App-Unterstützung, Apple-Silicon- und Intel-Grenzen, öffentlichem WLAN, Datenschutzchecks und Tarifbedingungen — nicht nach festen Geschwindigkeits- oder Akkuversprechen.",
    breadcrumbRoot: "Beste VPNs",
    breadcrumbCurrent: "macOS-VPNs",
    badge: "macOS-Datenschutz- und Entscheidungsleitfaden",
    evidenceBoundary: "Apple-Silicon-Unterstützung, Akkuverbrauch, Geschwindigkeit und Datenschutzergebnisse hängen von Mac-Modell, macOS-Version, Protokoll, Netzwerk und Berechtigungen ab. Prüfen Sie Ihre Route vor dem Abschluss.",
    reviewed: "Geprüft am 13. August 2026. DataForSEO leitete Fragen zu Mac, macOS und Apple Silicon; es beweist keine Anbieterleistung.",
    nav: [{ href: "#quick-picks", label: "Optionen" }, { href: "#comparison", label: "Vergleichen" }, { href: "#setup", label: "Einrichtung" }, { href: "#faq", label: "FAQ" }, { href: "#sources", label: "Quellen" }],
    quickTitle: "Mac-VPN-Optionen zum Prüfen",
    quickIntro: "Diese Anbieter sind kommerzielle Ausgangspunkte, keine festen Gewinner. Nutzen Sie aktuelle Herstellerdokumentation und eigene Mac-Checks als Quelle.",
    providerLabels: { nordvpn: "Mac-Shortlist für den Alltag", expressvpn: "Vergleich der App-Einfachheit", surfshark: "Vergleich der Gerätebedingungen" },
    providerNotes: { nordvpn: "Prüfen Sie aktuelle macOS-App, automatische Verbindung und Gerätebedingungen für Ihren Ablauf.", expressvpn: "Vergleichen Sie Berechtigungen, Protokollauswahl und Wiederverbindung auf Ihrem Mac.", surfshark: "Prüfen Sie aktuelle Bedingungen für gleichzeitige Geräte, wenn ein Tarif mehrere Geräte abdecken soll." },
    priceSuffix: "/Monat rechnerisch",
    catalogLabel: "Katalog geprüft",
    checkLabel: "Mac-Route prüfen",
    compareTitle: "Die macOS-Route vergleichen",
    compareIntro: "Ein Mac-VPN besteht aus App-, Berechtigungs- und Netzwerkverhalten. Vergleichen Sie Fehlergrenzen statt einer universellen Leistungspunktzahl.",
    tableCaption: "macOS-VPN-Evidence-Checkliste",
    tableHeaders: ["Frage", "Was prüfen?", "Grenze"],
    tableRows: [["Hardware und OS", "Aktuelle App, macOS-Version sowie Apple-Silicon- und Intel-Unterstützung", "Eine Downloadseite beweist nicht jeden Hardware- oder OS-Pfad"], ["Systemabdeckung", "Desktop-App gegenüber Browser-Erweiterung, Ausnahmen und lokaler Zugriff", "Eine Browser-Erweiterung deckt meist weniger als eine Desktop-App ab"], ["Öffentliches WLAN", "Auto-Connect, Wiederverbindung, DNS und Kill-Switch-Verhalten", "Ein VPN ersetzt weder HTTPS noch Updates oder Kontosicherheit"], ["Tarifbedingungen", "Geräte-Limits, Verlängerungspreis und Erstattungsbedingungen", "Katalogpreise ändern sich; prüfen Sie den Checkout"]],
    setupTitle: "Sechs Checks, bevor Sie einem Mac-VPN vertrauen",
    setupChecks: ["Notieren Sie Mac-Modell, macOS-Version, App-Version, Netzwerk und Datum.", "Installieren Sie nur aus einer verifizierten Quelle und prüfen Sie Berechtigungen.", "Testen Sie WLAN-Wechsel, Auto-Connect und Wiederverbindung nach dem Ruhezustand.", "Prüfen Sie Browserverkehr, eine sensible App und lokalen Zugriff getrennt.", "Testen Sie DNS-, Kill-Switch- und Split-Tunneling-Verhalten vor einer Reise.", "Notieren Sie Geräte-Limits, Verlängerungspreis, Erstattung und Kündigung."] ,
    boundaryCards: [["Hardwaregrenze", "Testen Sie Ihr exaktes Apple-Silicon- oder Intel-Modell und die aktuelle macOS-Version."], ["Netzwerkwechsel", "Testen Sie Heim-WLAN, Tethering und ein öffentliches Netzwerk getrennt."], ["Datenschutzgrenze", "Ein VPN verändert die Sicht eines Netzwerkbeobachters; es macht nicht jede App anonym."]],
    faqTitle: "macOS-VPN-FAQ",
    faq: [{ question: "Unterstützt ein Mac-VPN Apple Silicon?", answer: "Das hängt von App-Version, macOS-Release und dem nativen oder übersetzten Pfad ab. Prüfen Sie die aktuelle Dokumentation für Ihr Mac- und macOS-Modell." }, { question: "Wird ein VPN meinen Mac verlangsamen?", answer: "Durchsatz und Latenz variieren nach Protokoll, Server, Netzwerk, Hardware und Aufgabe. Messen Sie dieselbe Route vor und nach dem Verbinden statt ein universelles Versprechen anzunehmen." }, { question: "Soll ich ein VPN im öffentlichen WLAN nutzen?", answer: "Es kann die Belastung durch das lokale Netzwerk reduzieren, macht ein Café-, Hotel- oder Flughafen-WLAN aber nicht vertrauenswürdig. Halten Sie macOS aktuell und prüfen Sie Auto-Connect und Wiederverbindung." }, { question: "Decken Mac-VPN-Browser-Erweiterungen jede App ab?", answer: "Meist nicht. Eine Browser-Erweiterung betrifft normalerweise Browserverkehr; eine Desktop-App kann eine breitere Systemroute verwalten. Testen Sie Browser, sensible App und lokalen Zugriff getrennt." }, { question: "Was sollte ich vor einem Mac-VPN-Abo prüfen?", answer: "Prüfen Sie macOS- und Hardware-Support, Berechtigungen, Auto-Connect, Kill-Switch-Verhalten, Geräte-Limits, Verlängerung, Erstattung und Datenschutzdokumente. Verifizieren Sie den Tarif beim Checkout." }],
    sourcesTitle: "Quellen und weitere Checks",
    sourcesIntro: "Das US/englische DataForSEO-Dossier wurde am 13. August 2026 erneuert. Prüfen Sie aktuelle macOS-Unterstützung und Bedingungen auf der Anbieterseite.",
    sourceLinks: [["Laptop-VPN-Vergleich", "/best/vpn-laptops"], ["iPhone-VPN-Vergleich", "/best/vpn-iphone"], ["iPad-VPN-Vergleich", "/best/vpn-ipad"], ["VPN-Datenschutzvergleich", "/best/vpn-privacy"], ["VPN-Protokolle erklärt", "/guides/vpn-protocols-explained"], ["ZeroToVPN-Methodik", "/methodology"]],
    measurementLead: "Für eine tiefere Messung: Notieren Sie das Ergebnis mit Geräte- und Netzwerkkontext über das verlinkte Tool.",
  },
  es: {
    title: "Mejores VPN para macOS en 2026: compatibilidad de la app y privacidad",
    description: "Compara VPN para Mac por compatibilidad actual de la app, límites de Apple Silicon e Intel, Wi‑Fi público, comprobaciones de privacidad y condiciones del plan — no por promesas fijas de velocidad o batería.",
    breadcrumbRoot: "Mejores VPN",
    breadcrumbCurrent: "VPN para macOS",
    badge: "Guía de privacidad y decisión para macOS",
    evidenceBoundary: "La compatibilidad con Apple Silicon, el consumo de batería, la velocidad y la privacidad dependen del modelo de Mac, versión de macOS, protocolo, red y permisos. Verifica tu caso antes de suscribirte.",
    reviewed: "Revisado el 13 de agosto de 2026. DataForSEO orientó las preguntas sobre Mac, macOS y Apple Silicon; no demuestra el rendimiento de un proveedor.",
    nav: [{ href: "#quick-picks", label: "Opciones" }, { href: "#comparison", label: "Comparar" }, { href: "#setup", label: "Configurar" }, { href: "#faq", label: "FAQ" }, { href: "#sources", label: "Fuentes" }],
    quickTitle: "Opciones de VPN para Mac que debes verificar",
    quickIntro: "Estos proveedores son puntos de partida comerciales, no ganadores permanentes. Usa documentación actual del proveedor y tus propias comprobaciones en Mac.",
    providerLabels: { nordvpn: "Lista corta para el Mac diario", expressvpn: "Comparación de simplicidad", surfshark: "Comparación de dispositivos" },
    providerNotes: { nordvpn: "Comprueba la app actual para macOS, la conexión automática y los límites de dispositivos.", expressvpn: "Compara permisos, protocolos y reconexión en tu Mac.", surfshark: "Revisa las condiciones actuales de dispositivos simultáneos si un plan debe cubrir varios equipos." },
    priceSuffix: "/mes equivalente",
    catalogLabel: "Catálogo comprobado",
    checkLabel: "Comprobar ruta de Mac",
    compareTitle: "Compara la ruta de macOS",
    compareIntro: "Una VPN para Mac combina comportamiento de app, permisos y red. Compara límites y fallos, no una puntuación universal de rendimiento.",
    tableCaption: "Lista de comprobación basada en evidencia para VPN de macOS",
    tableHeaders: ["Pregunta", "Qué verificar", "Límite"],
    tableRows: [["Hardware y sistema", "App actual, versión de macOS y soporte para Apple Silicon e Intel", "Una página de descarga no demuestra todas las rutas de hardware u OS"], ["Cobertura del sistema", "App de escritorio frente a extensión, exclusiones y acceso local", "Una extensión suele cubrir menos que una app de escritorio"], ["Wi‑Fi público", "Conexión automática, reconexión, DNS y kill switch", "Una VPN no sustituye HTTPS, actualizaciones ni seguridad de cuenta"], ["Condiciones del plan", "Límites de dispositivos, renovación y reembolso", "Los precios de catálogo cambian; verifica el checkout"]],
    setupTitle: "Seis comprobaciones antes de confiar en una VPN para Mac",
    setupChecks: ["Anota el modelo de Mac, versión de macOS, versión de la app, red y fecha.", "Instala solo desde una fuente verificada y revisa los permisos.", "Prueba cambios de Wi‑Fi, conexión automática y reconexión tras reposo.", "Comprueba por separado el navegador, una app sensible y el acceso local.", "Prueba DNS, kill switch y split tunneling antes de viajar.", "Anota límites de dispositivos, renovación, reembolso y cancelación."],
    boundaryCards: [["Límite de hardware", "Prueba tu modelo exacto de Apple Silicon o Intel y la versión actual de macOS."], ["Cambios de red", "Prueba por separado la red doméstica, el tethering y una red pública."], ["Límite de privacidad", "Una VPN cambia la visión de un observador de red; no hace anónima cada app."]],
    faqTitle: "Preguntas frecuentes sobre VPN para macOS",
    faq: [{ question: "¿Una VPN para Mac es compatible con Apple Silicon?", answer: "Depende de la versión de la app, de macOS y de si usa una ruta nativa o traducida. Consulta la documentación actual para tu modelo exacto." }, { question: "¿Una VPN ralentizará mi Mac?", answer: "El caudal y la latencia cambian según protocolo, servidor, red, hardware y tarea. Mide la misma ruta antes y después de conectar en lugar de confiar en una promesa universal." }, { question: "¿Debo usar una VPN en Wi‑Fi público con mi Mac?", answer: "Puede reducir la exposición a la red local, pero no convierte una red de café, hotel o aeropuerto en confiable. Mantén macOS actualizado y comprueba la reconexión." }, { question: "¿Las extensiones de navegador VPN cubren todas las apps?", answer: "Normalmente no. Una extensión suele afectar al navegador, mientras que una app de escritorio puede gestionar una ruta más amplia. Prueba ambos casos por separado." }, { question: "¿Qué debo comprobar antes de suscribirme?", answer: "Confirma soporte de macOS y hardware, permisos, conexión automática, kill switch, límites, renovación, reembolso y documentación de privacidad. Verifica el plan en el checkout." }],
    sourcesTitle: "Fuentes y comprobaciones relacionadas",
    sourcesIntro: "El dossier estadounidense/inglés de DataForSEO se actualizó el 13 de agosto de 2026. Verifica el soporte y las condiciones actuales en la página del proveedor.",
    sourceLinks: [["Comparativa de VPN para portátiles", "/best/vpn-laptops"], ["Comparativa para iPhone", "/best/vpn-iphone"], ["Comparativa para iPad", "/best/vpn-ipad"], ["Comparativa de privacidad", "/best/vpn-privacy"], ["Protocolos VPN explicados", "/guides/vpn-protocols-explained"], ["Metodología de ZeroToVPN", "/methodology"]],
    measurementLead: "¿Quieres medir más? Registra el resultado con el contexto del dispositivo y la red mediante la herramienta enlazada.",
  },
  fr: {
    title: "Meilleurs VPN pour macOS en 2026 : application et vérifications de confidentialité",
    description: "Comparez les VPN pour Mac selon l’application macOS actuelle, les limites Apple Silicon et Intel, le Wi‑Fi public, les vérifications de confidentialité et les conditions du forfait — sans promesse fixe de vitesse ou de batterie.",
    breadcrumbRoot: "Meilleurs VPN",
    breadcrumbCurrent: "VPN pour macOS",
    badge: "Guide de décision et de confidentialité macOS",
    evidenceBoundary: "La compatibilité Apple Silicon, la batterie, la vitesse et les résultats de confidentialité varient selon le Mac, macOS, le protocole, le réseau et les autorisations. Vérifiez votre usage avant de vous abonner.",
    reviewed: "Revu le 13 août 2026. DataForSEO a orienté les questions Mac, macOS et Apple Silicon ; il ne prouve pas les performances d’un fournisseur.",
    nav: [{ href: "#quick-picks", label: "Options" }, { href: "#comparison", label: "Comparer" }, { href: "#setup", label: "Configurer" }, { href: "#faq", label: "FAQ" }, { href: "#sources", label: "Sources" }],
    quickTitle: "Options VPN Mac à vérifier",
    quickIntro: "Ces fournisseurs sont des points de départ commerciaux, pas des gagnants permanents. Utilisez la documentation actuelle et vos propres vérifications sur Mac.",
    providerLabels: { nordvpn: "Sélection Mac au quotidien", expressvpn: "Comparaison de simplicité", surfshark: "Comparaison des appareils" },
    providerNotes: { nordvpn: "Vérifiez l’application macOS, la connexion automatique et les conditions d’appareils actuelles.", expressvpn: "Comparez les autorisations, les protocoles et la reconnexion sur votre Mac.", surfshark: "Vérifiez les conditions actuelles d’appareils simultanés si un forfait doit couvrir plusieurs appareils." },
    priceSuffix: "/mois équivalent",
    catalogLabel: "Catalogue vérifié",
    checkLabel: "Vérifier le parcours Mac",
    compareTitle: "Comparer le parcours macOS",
    compareIntro: "Un VPN Mac combine le comportement de l’application, les autorisations et le réseau. Comparez les limites d’échec, pas une note universelle.",
    tableCaption: "Checklist de vérification d’un VPN macOS",
    tableHeaders: ["Question", "À vérifier", "Limite"],
    tableRows: [["Matériel et OS", "Application actuelle, version macOS, support Apple Silicon et Intel", "Une page de téléchargement ne prouve pas tous les chemins matériels ou OS"], ["Couverture système", "Application de bureau contre extension, exclusions et accès local", "Une extension couvre généralement moins qu’une application de bureau"], ["Wi‑Fi public", "Connexion automatique, reconnexion, DNS et kill switch", "Un VPN ne remplace ni HTTPS, ni les mises à jour, ni la sécurité du compte"], ["Conditions du forfait", "Limites d’appareils, renouvellement et remboursement", "Les prix du catalogue changent ; vérifiez le paiement"]],
    setupTitle: "Six vérifications avant de compter sur un VPN Mac",
    setupChecks: ["Notez le modèle de Mac, la version macOS, la version de l’application, le réseau et la date.", "Installez uniquement depuis une source vérifiée et examinez les autorisations.", "Testez les changements Wi‑Fi, la connexion automatique et la reconnexion après veille.", "Vérifiez séparément le navigateur, une application sensible et l’accès local.", "Testez le DNS, le kill switch et le split tunneling avant un déplacement.", "Notez les limites d’appareils, le renouvellement, le remboursement et l’annulation."],
    boundaryCards: [["Limite matérielle", "Testez votre modèle Apple Silicon ou Intel exact et la version macOS actuelle."], ["Changements réseau", "Testez séparément le Wi‑Fi domestique, le partage de connexion et un réseau public."], ["Limite de confidentialité", "Un VPN modifie la visibilité d’un observateur réseau ; il ne rend pas chaque application anonyme."]],
    faqTitle: "FAQ VPN macOS",
    faq: [{ question: "Un VPN Mac prend-il en charge Apple Silicon ?", answer: "Cela dépend de la version de l’application, de macOS et du chemin natif ou traduit utilisé. Consultez la documentation actuelle pour votre Mac." }, { question: "Un VPN ralentira-t-il mon Mac ?", answer: "Le débit et la latence varient selon le protocole, le serveur, le réseau, le matériel et la tâche. Mesurez le même parcours avant et après la connexion plutôt que d’utiliser une promesse universelle." }, { question: "Faut-il utiliser un VPN sur le Wi‑Fi public avec un Mac ?", answer: "Il peut réduire l’exposition au réseau local, mais ne rend pas fiable un réseau de café, d’hôtel ou d’aéroport. Gardez macOS à jour et vérifiez la reconnexion." }, { question: "Les extensions VPN Mac couvrent-elles toutes les applications ?", answer: "Généralement non. Une extension concerne surtout le navigateur, tandis qu’une application de bureau peut gérer un parcours système plus large. Testez séparément chaque cas." }, { question: "Que vérifier avant de souscrire à un VPN Mac ?", answer: "Confirmez le support macOS et matériel, les autorisations, la connexion automatique, le kill switch, les limites, le renouvellement, le remboursement et la documentation de confidentialité." }],
    sourcesTitle: "Sources et vérifications associées",
    sourcesIntro: "Le dossier DataForSEO américain/anglais a été actualisé le 13 août 2026. Vérifiez le support macOS et les conditions actuelles sur la page du fournisseur.",
    sourceLinks: [["Comparatif VPN pour ordinateur portable", "/best/vpn-laptops"], ["Comparatif VPN iPhone", "/best/vpn-iphone"], ["Comparatif VPN iPad", "/best/vpn-ipad"], ["Comparatif confidentialité VPN", "/best/vpn-privacy"], ["Protocoles VPN expliqués", "/guides/vpn-protocols-explained"], ["Méthodologie ZeroToVPN", "/methodology"]],
    measurementLead: "Besoin d’une mesure plus poussée ? Notez le résultat avec le contexte de l’appareil et du réseau via l’outil lié.",
  },
};

const providers: Array<{ slug: ProviderSlug }> = [{ slug: "nordvpn" }, { slug: "expressvpn" }, { slug: "surfshark" }];
const money = (value: number | undefined) => typeof value === "number" ? `$${value.toFixed(2)}` : "-";

export function MacosVpnEditorialPage({ vpns, locale = "en" }: { vpns: VpnData[]; locale?: string }) {
  const copy = { ...baseCopy, ...(localizedCopy[locale] ?? {}) } as MacosCopy;
  const options = providers.map((provider) => ({ provider, vpn: vpns.find((vpn) => vpn.slug === provider.slug) })).filter((row): row is typeof row & { vpn: VpnData } => Boolean(row.vpn));
  const localizedPageUrl = locale === "en" ? `${siteUrl}/best/vpn-macos` : `${siteUrl}/${locale}/best/vpn-macos`;
  return <>
    <ArticleJsonLd title={copy.title} description={copy.description} url={localizedPageUrl} datePublished="2026-01-01" dateModified="2026-08-13" />
    <BreadcrumbSchema items={[{ name: copy.breadcrumbRoot, href: "/best/best-vpn" }, { name: copy.breadcrumbCurrent, href: "/best/vpn-macos" }]} />
    <FAQSchema title={copy.faqTitle} faqs={copy.faq} />
    <BestVpnEditorialTemplate navigation={copy.nav} brief={brief}>
      <div className="flex flex-col"><main className="container max-w-5xl py-8 lg:py-12">
        <header className="mb-10 max-w-4xl"><p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">{copy.badge}</p><h1 className="text-4xl font-bold tracking-tight md:text-5xl">{copy.title}</h1><p className="mt-5 text-xl text-muted-foreground">{copy.description}</p><div className="mt-5 flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm leading-6"><CircleAlert className="mt-0.5 size-5 shrink-0 text-amber-700" aria-hidden="true" /><p><strong>Evidence boundary:</strong> {copy.evidenceBoundary}</p></div><p className="mt-4 text-sm text-muted-foreground">{copy.reviewed}</p></header>
        <section id="quick-picks" className="scroll-mt-24"><h2 className="text-3xl font-bold">{copy.quickTitle}</h2><p className="mt-3 max-w-3xl text-muted-foreground">{copy.quickIntro}</p><div className="mt-6 grid gap-5 md:grid-cols-3">{options.map(({ provider, vpn }) => <article key={provider.slug} className="rounded-xl border bg-card p-5 shadow-sm"><div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground"><Apple className="size-4 text-primary" aria-hidden="true" /><span>{copy.providerLabels[provider.slug]}</span></div><h3 className="text-xl font-semibold">{vpn.name}</h3><p className="mt-2 min-h-16 text-sm text-muted-foreground">{copy.providerNotes[provider.slug]}</p><p className="mt-4 text-2xl font-bold text-primary"><AffiliateTextLink vpnId={vpn.id} vpnName={vpn.name} affiliateUrl={vpn.affiliateUrl} dataPriceLink>{money(vpn.priceTwoYear ?? vpn.priceYearly)}</AffiliateTextLink><span className="ml-1 text-sm font-normal text-muted-foreground">{copy.priceSuffix}</span></p><p className="mt-1 text-xs text-muted-foreground">{copy.catalogLabel} {vpn.priceLastVerified ?? "not recorded"}; verify checkout terms.</p><AffiliateButton vpnId={vpn.id} vpnName={vpn.name} affiliateUrl={vpn.affiliateUrl} className="mt-4 w-full">{copy.checkLabel}: {vpn.name}</AffiliateButton></article>)}</div></section>
        <section id="comparison" className="mt-16 scroll-mt-24"><h2 className="text-3xl font-bold">{copy.compareTitle}</h2><p className="mt-3 max-w-3xl text-muted-foreground">{copy.compareIntro}</p><div className="mt-6 overflow-x-auto rounded-xl border"><table className="w-full min-w-[720px] text-left text-sm"><caption className="sr-only">{copy.tableCaption}</caption><thead className="bg-muted/60"><tr>{copy.tableHeaders.map((header) => <th scope="col" key={header} className="p-4">{header}</th>)}</tr></thead><tbody>{copy.tableRows.map(([question, verify, boundary]) => <tr className="border-t" key={question}><th scope="row" className="p-4 font-semibold">{question}</th><td className="p-4">{verify}</td><td className="p-4">{boundary}</td></tr>)}</tbody></table></div></section>
        <section id="setup" className="mt-16 scroll-mt-24"><h2 className="text-3xl font-bold">{copy.setupTitle}</h2><ol className="mt-5 grid gap-4 md:grid-cols-2">{copy.setupChecks.map((item, index) => <li key={item} className="flex gap-3 rounded-lg border p-4"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-green-600" aria-hidden="true" /><span><strong>{index + 1}.</strong> {item}</span></li>)}</ol><div className="mt-6 grid gap-4 md:grid-cols-3"><div className="rounded-xl border p-5"><Laptop className="size-6 text-primary" aria-hidden="true" /><h3 className="mt-3 font-semibold">{copy.boundaryCards[0][0]}</h3><p className="mt-2 text-sm text-muted-foreground">{copy.boundaryCards[0][1]}</p></div><div className="rounded-xl border p-5"><Wifi className="size-6 text-primary" aria-hidden="true" /><h3 className="mt-3 font-semibold">{copy.boundaryCards[1][0]}</h3><p className="mt-2 text-sm text-muted-foreground">{copy.boundaryCards[1][1]}</p></div><div className="rounded-xl border p-5"><LockKeyhole className="size-6 text-primary" aria-hidden="true" /><h3 className="mt-3 font-semibold">{copy.boundaryCards[2][0]}</h3><p className="mt-2 text-sm text-muted-foreground">{copy.boundaryCards[2][1]}</p></div></div></section>
        <section id="faq" className="mt-16 scroll-mt-24"><h2 className="text-3xl font-bold">{copy.faqTitle}</h2><div className="mt-5 space-y-5">{copy.faq.map((item) => <div key={item.question} className="rounded-xl border p-5"><h3 className="font-semibold">{item.question}</h3><p className="mt-2 text-muted-foreground">{item.answer}</p></div>)}</div></section>
        <section id="sources" className="mt-16 scroll-mt-24 border-t pt-8"><h2 className="text-2xl font-bold">{copy.sourcesTitle}</h2><p className="mt-2 text-sm text-muted-foreground">{copy.sourcesIntro}</p><ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">{copy.sourceLinks.map(([label, href]) => <li key={href}><Link href={href} className="text-primary underline">{label}</Link></li>)}</ul><p className="mt-5 text-sm text-muted-foreground">{copy.measurementLead} <Link href="/tools/dns-leak-test" className="text-primary underline">DNS leak test</Link>.</p></section>
      </main></div>
    </BestVpnEditorialTemplate>
  </>;
}
