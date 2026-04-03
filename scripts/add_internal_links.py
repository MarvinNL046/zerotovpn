#!/usr/bin/env python3
"""
Add internal linking sections to VPN review JSON files:
1. "How It Compares" CTA section (before Sources)
2. "Continue Reading" bridge section (after speed/performance section)
3. "Related Reviews" CTA block (after Sources)
"""

import json
import os
import re

DATA_DIR = "/home/marvin/Projecten/zerotovpn/src/data/reviews"

# VPN config: comparisons and related reviews
VPN_CONFIG = {
    "nordvpn": {
        "name": "NordVPN",
        "comparisons": [
            {
                "slug": "nordvpn-vs-surfshark",
                "rival": "Surfshark",
                "rival_slug": "surfshark",
                "desc": "price vs performance, and which handles unlimited devices better",
            },
            {
                "slug": "nordvpn-vs-expressvpn",
                "rival": "ExpressVPN",
                "rival_slug": "expressvpn",
                "desc": "two premium giants compared on speed, audits, and value",
            },
            {
                "slug": "nordvpn-vs-cyberghost",
                "rival": "CyberGhost",
                "rival_slug": "cyberghost",
                "desc": "server network depth vs raw speed and streaming reliability",
            },
        ],
        "related": [
            {"slug": "protonvpn", "name": "Proton VPN", "reason": "best alternative for privacy-first users who want Swiss jurisdiction and open-source apps"},
            {"slug": "mullvad", "name": "Mullvad VPN", "reason": "the go-to choice if you want anonymous sign-up with no email required"},
            {"slug": "ipvanish", "name": "IPVanish VPN", "reason": "unlimited devices at a lower price point — worth considering if NordVPN's 10-device cap is a dealbreaker"},
        ],
    },
    "surfshark": {
        "name": "Surfshark",
        "comparisons": [
            {
                "slug": "nordvpn-vs-surfshark",
                "rival": "NordVPN",
                "rival_slug": "nordvpn",
                "desc": "the unlimited-devices budget pick vs the speed and audit champion",
            },
            {
                "slug": "surfshark-vs-expressvpn",
                "rival": "ExpressVPN",
                "rival_slug": "expressvpn",
                "desc": "budget-friendly unlimited connections vs premium BVI-jurisdiction speed",
            },
            {
                "slug": "surfshark-vs-cyberghost",
                "rival": "CyberGhost",
                "rival_slug": "cyberghost",
                "desc": "which budget VPN delivers more for streaming and everyday use",
            },
        ],
        "related": [
            {"slug": "nordvpn", "name": "NordVPN", "reason": "faster speeds and more audits if you're willing to pay a little more"},
            {"slug": "ipvanish", "name": "IPVanish VPN", "reason": "another unlimited-device VPN at a competitive price — compare the two before deciding"},
            {"slug": "protonvpn", "name": "Proton VPN", "reason": "a privacy-focused alternative with a genuine free tier and Swiss jurisdiction"},
        ],
    },
    "expressvpn": {
        "name": "ExpressVPN",
        "comparisons": [
            {
                "slug": "expressvpn-vs-nordvpn",
                "rival": "NordVPN",
                "rival_slug": "nordvpn",
                "desc": "Lightway Turbo vs NordLynx — which protocol delivers faster real-world speeds",
            },
            {
                "slug": "surfshark-vs-expressvpn",
                "rival": "Surfshark",
                "rival_slug": "surfshark",
                "desc": "premium BVI jurisdiction vs unlimited devices at nearly half the price",
            },
            {
                "slug": "expressvpn-vs-cyberghost",
                "rival": "CyberGhost",
                "rival_slug": "cyberghost",
                "desc": "TrustedServer RAM infrastructure vs CyberGhost's massive 11,690-server fleet",
            },
        ],
        "related": [
            {"slug": "nordvpn", "name": "NordVPN", "reason": "NordLynx consistently beats Lightway on raw throughput — see how the speed gap looks in our full review"},
            {"slug": "protonvpn", "name": "Proton VPN", "reason": "similar premium positioning but with open-source apps and Swiss jurisdiction for privacy purists"},
            {"slug": "vyprvpn", "name": "VyprVPN", "reason": "another VPN with a proprietary protocol (Chameleon) built for bypassing censorship — a niche ExpressVPN alternative"},
        ],
    },
    "cyberghost": {
        "name": "CyberGhost",
        "comparisons": [
            {
                "slug": "nordvpn-vs-cyberghost",
                "rival": "NordVPN",
                "rival_slug": "nordvpn",
                "desc": "CyberGhost's 11,690 servers and 45-day guarantee vs NordVPN's superior speeds",
            },
            {
                "slug": "surfshark-vs-cyberghost",
                "rival": "Surfshark",
                "rival_slug": "surfshark",
                "desc": "two budget champions — which one wins on streaming, speed, and device limits",
            },
            {
                "slug": "expressvpn-vs-cyberghost",
                "rival": "ExpressVPN",
                "rival_slug": "expressvpn",
                "desc": "CyberGhost's NoSpy servers and 45-day refund vs ExpressVPN's TrustedServer and BVI jurisdiction",
            },
        ],
        "related": [
            {"slug": "nordvpn", "name": "NordVPN", "reason": "significantly faster speeds if your connection can benefit from NordLynx's 780 Mbps average"},
            {"slug": "surfshark", "name": "Surfshark VPN", "reason": "unlimited simultaneous connections for the same budget — ideal for large households"},
            {"slug": "ipvanish", "name": "IPVanish VPN", "reason": "another budget-tier VPN with unlimited devices and fast WireGuard speeds worth comparing"},
        ],
    },
    "protonvpn": {
        "name": "Proton VPN",
        "comparisons": [
            {
                "slug": "protonvpn-vs-nordvpn",
                "rival": "NordVPN",
                "rival_slug": "nordvpn",
                "desc": "Swiss open-source privacy vs Panama's speed and streaming powerhouse",
            },
            {
                "slug": "protonvpn-vs-mullvad",
                "rival": "Mullvad",
                "rival_slug": "mullvad",
                "desc": "the two gold-standard privacy VPNs — which one fits your threat model",
            },
            {
                "slug": "protonvpn-vs-surfshark",
                "rival": "Surfshark",
                "rival_slug": "surfshark",
                "desc": "privacy-first Swiss jurisdiction vs the most affordable unlimited-device VPN",
            },
        ],
        "related": [
            {"slug": "mullvad", "name": "Mullvad VPN", "reason": "the most private VPN available — no email, no name, accepts cash — if Proton's free tier isn't enough anonymity"},
            {"slug": "nordvpn", "name": "NordVPN", "reason": "6x faster average speeds if streaming and throughput matter more than maximum privacy"},
            {"slug": "expressvpn", "name": "ExpressVPN", "reason": "another audited premium VPN with BVI jurisdiction and 23 published security reports"},
        ],
    },
    "mullvad": {
        "name": "Mullvad",
        "comparisons": [
            {
                "slug": "protonvpn-vs-mullvad",
                "rival": "Proton VPN",
                "rival_slug": "protonvpn",
                "desc": "anonymous account numbers vs Proton's Swiss jurisdiction and free tier",
            },
            {
                "slug": "mullvad-vs-nordvpn",
                "rival": "NordVPN",
                "rival_slug": "nordvpn",
                "desc": "radical privacy with flat-rate pricing vs speed and streaming excellence",
            },
            {
                "slug": "mullvad-vs-ivpn",
                "rival": "IVPN",
                "rival_slug": "ivpn",
                "desc": "two audited no-email VPNs compared on price, features, and anonymity",
            },
        ],
        "related": [
            {"slug": "protonvpn", "name": "Proton VPN", "reason": "the closest privacy-focused competitor — Swiss jurisdiction, open-source, but also great for streaming"},
            {"slug": "nordvpn", "name": "NordVPN", "reason": "if you want the best streaming VPN without sacrificing security, NordVPN is the obvious alternative"},
            {"slug": "surfshark", "name": "Surfshark VPN", "reason": "unlimited devices and solid privacy audits at $1.99/mo — a good middle ground if Mullvad's streaming gap is a dealbreaker"},
        ],
    },
    "ipvanish": {
        "name": "IPVanish",
        "comparisons": [
            {
                "slug": "ipvanish-vs-nordvpn",
                "rival": "NordVPN",
                "rival_slug": "nordvpn",
                "desc": "unlimited devices at a lower price vs NordVPN's superior audit history and server network",
            },
            {
                "slug": "ipvanish-vs-surfshark",
                "rival": "Surfshark",
                "rival_slug": "surfshark",
                "desc": "two unlimited-device VPNs compared on speed, streaming, and trust",
            },
            {
                "slug": "ipvanish-vs-cyberghost",
                "rival": "CyberGhost",
                "rival_slug": "cyberghost",
                "desc": "US-based unlimited connections vs Romania's NoSpy servers and 45-day guarantee",
            },
        ],
        "related": [
            {"slug": "nordvpn", "name": "NordVPN", "reason": "more independent audits, faster speeds, and a stronger privacy track record if trust matters most"},
            {"slug": "surfshark", "name": "Surfshark VPN", "reason": "unlimited devices with a cleaner corporate history and better international streaming reliability"},
            {"slug": "protonvpn", "name": "Proton VPN", "reason": "the best alternative for privacy-conscious users who need Swiss jurisdiction and open-source apps"},
        ],
    },
    "vyprvpn": {
        "name": "VyprVPN",
        "comparisons": [
            {
                "slug": "vyprvpn-vs-nordvpn",
                "rival": "NordVPN",
                "rival_slug": "nordvpn",
                "desc": "Chameleon obfuscation and self-owned servers vs NordVPN's speed dominance",
            },
            {
                "slug": "vyprvpn-vs-expressvpn",
                "rival": "ExpressVPN",
                "rival_slug": "expressvpn",
                "desc": "two VPNs with proprietary protocols — Chameleon vs Lightway in censorship-heavy environments",
            },
            {
                "slug": "vyprvpn-vs-surfshark",
                "rival": "Surfshark",
                "rival_slug": "surfshark",
                "desc": "VyprVPN's server ownership and Chameleon vs Surfshark's unlimited devices and lower price",
            },
        ],
        "related": [
            {"slug": "nordvpn", "name": "NordVPN", "reason": "NordLynx's 780 Mbps average makes it the clear winner if speed and streaming are your top priorities"},
            {"slug": "expressvpn", "name": "ExpressVPN", "reason": "Lightway Turbo is faster than Chameleon, and 23 published audits give it a stronger security track record"},
            {"slug": "protonvpn", "name": "Proton VPN", "reason": "Swiss jurisdiction and open-source apps — if you're switching from VyprVPN for privacy reasons, Proton is the top pick"},
        ],
    },
}

BRIDGE_SECTION = '<div class="pro-tip"><strong>📖 Keep Reading:</strong> If you\'re still deciding, our <a href="/best-vpn">Best VPNs of 2026</a> guide ranks the top 10 based on speed, security, and value. Or jump to our <a href="/guides/what-is-vpn">beginner\'s guide to VPNs</a> if you\'re new to VPN technology.</div>'

def build_comparison_section(config):
    """Build the 'How It Compares' HTML section."""
    name = config["name"]
    lines = [
        f"\n\n## How {name} Compares\n",
        f"Wondering how {name} stacks up against the competition? Check out our head-to-head comparisons:\n",
        "<ul>",
    ]
    for comp in config["comparisons"]:
        lines.append(
            f'<li><a href="/compare/{comp["slug"]}"><strong>{name} vs {comp["rival"]}</strong></a> — {comp["desc"]}</li>'
        )
    lines.append("</ul>")
    return "\n".join(lines)


def build_related_section(config):
    """Build the 'Related Reviews' HTML section."""
    lines = [
        "\n\n## Related Reviews\n",
        "Explore more VPN reviews from our testing lab:\n",
        "<ul>",
    ]
    for rel in config["related"]:
        lines.append(
            f'<li><a href="/reviews/{rel["slug"]}"><strong>{rel["name"]} Review</strong></a> — {rel["reason"]}</li>'
        )
    lines.append("</ul>")
    return "\n".join(lines)


def find_sources_position(content):
    """
    Find the position just before the Sources section.
    Returns index or -1 if not found.
    """
    # Try various patterns for the sources heading
    patterns = [
        r"\n## Sources",
        r"\n## Sources & References",
        r"\n<h2>Sources",
        r"\n<h2>Sources &amp;",
    ]
    for pat in patterns:
        m = re.search(pat, content)
        if m:
            return m.start()
    return -1


def find_speed_section_end(content):
    """
    Find a good insertion point after the speed/performance section.
    We look for the first H2 section after the speed test results heading.
    """
    # Find the speed test results heading
    speed_headings = [
        r"## Speed Test Results",
        r"### Speed Test Results",
        r"### Nearby Server Performance",
    ]
    speed_pos = -1
    for pat in speed_headings:
        m = re.search(pat, content)
        if m:
            speed_pos = m.start()
            break

    if speed_pos == -1:
        return -1

    # Now find the next H2 (##) section after the speed section
    # We want to insert the bridge BEFORE the next major H2 section
    after_speed = content[speed_pos + 20:]  # skip past the heading
    next_h2 = re.search(r"\n## ", after_speed)
    if next_h2:
        return speed_pos + 20 + next_h2.start()
    return -1


def already_has_section(content, marker):
    """Check if a section already exists to avoid duplicates."""
    return marker in content


def process_file(slug):
    filepath = os.path.join(DATA_DIR, f"{slug}.json")
    config = VPN_CONFIG[slug]

    with open(filepath, "r", encoding="utf-8") as f:
        data = json.load(f)

    review_content = data["reviewContent"]
    original = review_content

    # ----------------------------------------------------------------
    # 1. Add "Continue Reading" bridge section after speed section
    # ----------------------------------------------------------------
    if not already_has_section(review_content, "Best VPNs of 2026"):
        bridge_pos = find_speed_section_end(review_content)
        if bridge_pos != -1:
            review_content = (
                review_content[:bridge_pos]
                + "\n\n"
                + BRIDGE_SECTION
                + review_content[bridge_pos:]
            )
            print(f"  [{slug}] Added bridge section at pos {bridge_pos}")
        else:
            print(f"  [{slug}] WARNING: Could not find speed section end for bridge")
    else:
        print(f"  [{slug}] Bridge section already exists, skipping")

    # ----------------------------------------------------------------
    # 2. Add "How It Compares" section before Sources
    # ----------------------------------------------------------------
    if not already_has_section(review_content, "## How " + config["name"] + " Compares"):
        sources_pos = find_sources_position(review_content)
        if sources_pos != -1:
            comparison_section = build_comparison_section(config)
            review_content = (
                review_content[:sources_pos]
                + comparison_section
                + review_content[sources_pos:]
            )
            print(f"  [{slug}] Added comparison section")
        else:
            print(f"  [{slug}] WARNING: Could not find Sources section for comparison")
    else:
        print(f"  [{slug}] Comparison section already exists, skipping")

    # ----------------------------------------------------------------
    # 3. Add "Related Reviews" section at the very end
    # ----------------------------------------------------------------
    if not already_has_section(review_content, "## Related Reviews"):
        related_section = build_related_section(config)
        review_content = review_content.rstrip() + related_section
        print(f"  [{slug}] Added related reviews section at end")
    else:
        print(f"  [{slug}] Related reviews section already exists, skipping")

    if review_content != original:
        data["reviewContent"] = review_content
        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"  [{slug}] File saved.")
    else:
        print(f"  [{slug}] No changes made.")


def main():
    slugs = ["nordvpn", "surfshark", "expressvpn", "cyberghost", "protonvpn", "mullvad", "ipvanish", "vyprvpn"]
    for slug in slugs:
        print(f"\nProcessing {slug}...")
        process_file(slug)
    print("\nDone!")


if __name__ == "__main__":
    main()
