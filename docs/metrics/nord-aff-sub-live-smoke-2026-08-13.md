# Nord `aff_sub` live smoke

**Checked:** 13 August 2026 12:45 UTC  
**Deployment:** Vercel production commit `f4b5de2e`  
**Routes:** `https://www.zerotovpn.com/nl/best/best-vpn`, `https://go.zerotovpn.com/nordvpn`

The production page returned HTTP 200. The redirect path was then checked with a public test placement code:

```text
https://go.zerotovpn.com/nordvpn?aff_sub=zt_nl-best-best-vpn
→ https://go.nordvpn.net/aff_c?offer_id=15&aff_id=153993&url_id=902&aff_sub=zt_nl-best-best-vpn
```

The same query parameter on the Surfshark short link stayed a Surfshark parameter and did not receive a Nord code. The application only adds `aff_sub` for `vpnId === "nordvpn"`; the value is derived from the public pathname and contains no user identifier, cookie value or personal data.

This proves forwarding, not conversion attribution. The next Nord Performance Report must include the returned `aff_sub` field before page-level EPC or conversion conclusions are made.
