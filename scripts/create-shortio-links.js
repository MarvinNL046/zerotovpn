const API_KEY = 'sk_W3WMj17FK7x0MG5D';
const DOMAIN = 'go.zerotovpn.com';

const vpnLinks = [
  { slug: 'nordvpn', url: 'https://nordvpn.com' },
  { slug: 'surfshark', url: 'https://surfshark.com' },
  { slug: 'expressvpn', url: 'https://expressvpn.com' },
  { slug: 'cyberghost', url: 'https://cyberghostvpn.com' },
  { slug: 'protonvpn', url: 'https://protonvpn.com' },
  { slug: 'private-internet-access', url: 'https://privateinternetaccess.com' },
  { slug: 'mullvad', url: 'https://mullvad.net' },
  { slug: 'ipvanish', url: 'https://ipvanish.com' },
  { slug: 'vyprvpn', url: 'https://vyprvpn.com' },
  { slug: 'tunnelbear', url: 'https://tunnelbear.com' },
  { slug: 'windscribe', url: 'https://windscribe.com' },
  { slug: 'hotspot-shield', url: 'https://hotspotshield.com' },
  { slug: 'strongvpn', url: 'https://strongvpn.com' },
  { slug: 'purevpn', url: 'https://purevpn.com' },
  { slug: 'atlas-vpn', url: 'https://atlasvpn.com' },
  { slug: 'privatevpn', url: 'https://privatevpn.com' },
  { slug: 'torguard', url: 'https://torguard.net' },
  { slug: 'airvpn', url: 'https://airvpn.org' },
  { slug: 'ivpn', url: 'https://ivpn.net' },
  { slug: 'mozilla-vpn', url: 'https://vpn.mozilla.org' },
  { slug: 'hide-me', url: 'https://hide.me' },
  { slug: 'zenmate', url: 'https://zenmate.com' },
  { slug: 'privadovpn', url: 'https://privadovpn.com' },
  { slug: 'hma', url: 'https://hidemyass.com' },
  { slug: 'astrill', url: 'https://astrill.com' },
  { slug: 'perfect-privacy', url: 'https://perfect-privacy.com' },
  { slug: 'goose-vpn', url: 'https://goosevpn.com' },
  { slug: 'trust-zone', url: 'https://trust.zone' },
  { slug: 'fastestvpn', url: 'https://fastestvpn.com' },
  { slug: 'ovpn', url: 'https://ovpn.com' },
  { slug: 'cactusvpn', url: 'https://cactusvpn.com' },
  { slug: 'betternet', url: 'https://betternet.co' },
  { slug: 'speedify', url: 'https://speedify.com' },
  { slug: 'vpn-unlimited', url: 'https://vpnunlimitedapp.com' },
  { slug: 'nordlayer', url: 'https://nordlayer.com' },
  { slug: 'perimeter-81', url: 'https://perimeter81.com' },
  { slug: 'urban-vpn', url: 'https://urban-vpn.com' },
  { slug: 'x-vpn', url: 'https://xvpn.io' },
];

async function createLink(vpn) {
  try {
    const response = await fetch('https://api.short.io/links', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'Authorization': API_KEY
      },
      body: JSON.stringify({
        allowDuplicates: false,
        originalURL: vpn.url,
        path: vpn.slug,
        domain: DOMAIN
      })
    });

    const data = await response.json();

    if (data.success || data.shortURL) {
      console.log('✅ ' + vpn.slug + ': ' + (data.shortURL || data.secureShortURL));
      return { success: true, slug: vpn.slug };
    } else if (data.error === 'Link already exists') {
      console.log('⏭️  ' + vpn.slug + ': Already exists');
      return { success: true, slug: vpn.slug, exists: true };
    } else {
      console.log('❌ ' + vpn.slug + ': ' + (data.error || JSON.stringify(data)));
      return { success: false, slug: vpn.slug, error: data.error };
    }
  } catch (err) {
    console.log('❌ ' + vpn.slug + ': ' + err.message);
    return { success: false, slug: vpn.slug, error: err.message };
  }
}

async function main() {
  console.log('🚀 Creating Short.io links for ' + vpnLinks.length + ' VPNs...\n');

  let success = 0;
  let failed = 0;

  for (const vpn of vpnLinks) {
    const result = await createLink(vpn);
    if (result.success) success++;
    else failed++;

    // Small delay to avoid rate limiting
    await new Promise(r => setTimeout(r, 300));
  }

  console.log('\n📊 Results: ' + success + ' success, ' + failed + ' failed');
}

main();
