// Toegangslaag voor VPN-gegevens. Eén bron: src/lib/vpn-data.ts.
//
// Dit heette een "hybrid data layer": database indien beschikbaar, statische
// data als terugval. Die database (Neon) is in juli 2026 opgeheven. Wat overbleef
// was een vertakking op isBuildPhase waarin beide takken dezelfde gegevens langs
// een andere route lazen — en dat liep uit elkaar, want op Vercel is
// process.env.VERCEL gezet, dus daar won de "database"-tak met een oude
// Postgres-export. Prijscorrecties in vpn-data.ts bereikten productie niet.
//
// Nu leest alles vpn-data.ts, in elke omgeving.
import { type VpnProvider as StaticVpnProvider } from "./vpn-data";
import {
  getAllVpnsFromDb,
  getFeaturedVpnsFromDb,
  getVpnBySlugFromDb,
  type VpnData,
} from "./db/vpn-service";

export type VpnProvider = StaticVpnProvider | VpnData;
export type { VpnData };

export async function getAllVpns(): Promise<VpnData[]> {
  return getAllVpnsFromDb();
}

export async function getFeaturedVpns(): Promise<VpnData[]> {
  return getFeaturedVpnsFromDb();
}

export async function getVpnBySlug(slug: string): Promise<VpnData | null> {
  return getVpnBySlugFromDb(slug);
}
