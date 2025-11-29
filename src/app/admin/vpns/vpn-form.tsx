"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { VpnData } from "@/lib/db/vpn-service";

interface VpnFormProps {
  vpn?: VpnData;
  onSuccess: () => void;
}

export function VpnForm({ vpn, onSuccess }: VpnFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Basic info
  const [name, setName] = useState(vpn?.name || "");
  const [slug, setSlug] = useState(vpn?.slug || "");
  const [website, setWebsite] = useState(vpn?.website || "");
  const [affiliateUrl, setAffiliateUrl] = useState(vpn?.affiliateUrl || "");
  const [shortDescription, setShortDescription] = useState(vpn?.shortDescription || "");

  // Images
  const [logo, setLogo] = useState(vpn?.logo || "");
  const [screenshot, setScreenshot] = useState(vpn?.screenshot || "");
  const [thumbnailImage, setThumbnailImage] = useState(vpn?.thumbnailImage || "");
  const [cardImage, setCardImage] = useState(vpn?.cardImage || "");
  const [ogImage, setOgImage] = useState(vpn?.ogImage || "");

  // Pricing
  const [priceMonthly, setPriceMonthly] = useState(vpn?.priceMonthly?.toString() || "0");
  const [priceYearly, setPriceYearly] = useState(vpn?.priceYearly?.toString() || "0");
  const [priceTwoYear, setPriceTwoYear] = useState(vpn?.priceTwoYear?.toString() || "");
  const [moneyBackDays, setMoneyBackDays] = useState(vpn?.moneyBackDays?.toString() || "30");
  const [freeTier, setFreeTier] = useState(vpn?.freeTier || false);

  // Features
  const [servers, setServers] = useState(vpn?.servers?.toString() || "0");
  const [countries, setCountries] = useState(vpn?.countries?.toString() || "0");
  const [maxDevices, setMaxDevices] = useState(vpn?.maxDevices?.toString() || "1");

  // Scores
  const [speedScore, setSpeedScore] = useState(vpn?.speedScore?.toString() || "50");
  const [securityScore, setSecurityScore] = useState(vpn?.securityScore?.toString() || "50");
  const [streamingScore, setStreamingScore] = useState(vpn?.streamingScore?.toString() || "50");
  const [overallRating, setOverallRating] = useState(vpn?.overallRating?.toString() || "3.0");

  // Security
  const [protocols, setProtocols] = useState(vpn?.protocols?.join(", ") || "WireGuard, OpenVPN");
  const [encryption, setEncryption] = useState(vpn?.encryption || "AES-256");
  const [killSwitch, setKillSwitch] = useState(vpn?.killSwitch ?? true);
  const [noLogs, setNoLogs] = useState(vpn?.noLogs ?? true);

  // Support
  const [netflixSupport, setNetflixSupport] = useState(vpn?.netflixSupport || false);
  const [torrentSupport, setTorrentSupport] = useState(vpn?.torrentSupport || false);

  // Pros & Cons
  const [pros, setPros] = useState(vpn?.pros?.join("\n") || "");
  const [cons, setCons] = useState(vpn?.cons?.join("\n") || "");

  // Display
  const [featured, setFeatured] = useState(vpn?.featured || false);
  const [editorChoice, setEditorChoice] = useState(vpn?.editorChoice || false);
  const [sortOrder, setSortOrder] = useState(vpn?.sortOrder?.toString() || "999");

  const generateSlug = () => {
    const newSlug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    setSlug(newSlug);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = {
        name,
        slug,
        website,
        affiliateUrl,
        shortDescription: shortDescription || null,
        logo: logo || null,
        screenshot: screenshot || null,
        thumbnailImage: thumbnailImage || null,
        cardImage: cardImage || null,
        ogImage: ogImage || null,
        priceMonthly: parseFloat(priceMonthly) || 0,
        priceYearly: parseFloat(priceYearly) || 0,
        priceTwoYear: priceTwoYear ? parseFloat(priceTwoYear) : null,
        moneyBackDays: parseInt(moneyBackDays) || 30,
        freeTier,
        servers: parseInt(servers) || 0,
        countries: parseInt(countries) || 0,
        maxDevices: parseInt(maxDevices) || 1,
        speedScore: parseInt(speedScore) || 50,
        securityScore: parseInt(securityScore) || 50,
        streamingScore: parseInt(streamingScore) || 50,
        overallRating: parseFloat(overallRating) || 3.0,
        protocols: protocols.split(",").map((p) => p.trim()).filter(Boolean),
        encryption,
        killSwitch,
        noLogs,
        netflixSupport,
        torrentSupport,
        pros: pros.split("\n").map((p) => p.trim()).filter(Boolean),
        cons: cons.split("\n").map((c) => c.trim()).filter(Boolean),
        featured,
        editorChoice,
        sortOrder: parseInt(sortOrder) || 999,
      };

      const url = vpn ? `/api/admin/vpns/${vpn.id}` : "/api/admin/vpns";
      const method = vpn ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to save VPN");
      }

      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="basic">Basic</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
        </TabsList>

        {/* Basic Tab */}
        <TabsContent value="basic" className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="NordVPN"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug *</Label>
              <div className="flex gap-2">
                <Input
                  id="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="nordvpn"
                  required
                />
                <Button type="button" variant="outline" onClick={generateSlug}>
                  Generate
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="website">Website *</Label>
              <Input
                id="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://nordvpn.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="affiliateUrl">Affiliate URL *</Label>
              <Input
                id="affiliateUrl"
                value={affiliateUrl}
                onChange={(e) => setAffiliateUrl(e.target.value)}
                placeholder="https://go.zerotovpn.com/nordvpn"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="shortDescription">Short Description</Label>
            <Textarea
              id="shortDescription"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="Industry-leading VPN with exceptional speed..."
              rows={2}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="logo">Logo URL</Label>
              <Input
                id="logo"
                value={logo}
                onChange={(e) => setLogo(e.target.value)}
                placeholder="/logos/nordvpn.svg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="screenshot">Screenshot URL</Label>
              <Input
                id="screenshot"
                value={screenshot}
                onChange={(e) => setScreenshot(e.target.value)}
                placeholder="/vpn-images/nordvpn-hero.webp"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="thumbnailImage">Thumbnail Image</Label>
              <Input
                id="thumbnailImage"
                value={thumbnailImage}
                onChange={(e) => setThumbnailImage(e.target.value)}
                placeholder="/vpn-images/nordvpn-thumb.webp"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cardImage">Card Image</Label>
              <Input
                id="cardImage"
                value={cardImage}
                onChange={(e) => setCardImage(e.target.value)}
                placeholder="/vpn-images/nordvpn-card.webp"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ogImage">OG Image</Label>
              <Input
                id="ogImage"
                value={ogImage}
                onChange={(e) => setOgImage(e.target.value)}
                placeholder="/vpn-images/nordvpn-og.webp"
              />
            </div>
          </div>

          <div className="flex items-center gap-8 pt-4">
            <div className="flex items-center gap-2">
              <Switch
                id="featured"
                checked={featured}
                onCheckedChange={setFeatured}
              />
              <Label htmlFor="featured">Featured</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="editorChoice"
                checked={editorChoice}
                onCheckedChange={setEditorChoice}
              />
              <Label htmlFor="editorChoice">Editor&apos;s Choice</Label>
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="sortOrder">Sort Order</Label>
              <Input
                id="sortOrder"
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-20"
              />
            </div>
          </div>
        </TabsContent>

        {/* Pricing Tab */}
        <TabsContent value="pricing" className="space-y-4 mt-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priceMonthly">Monthly Price ($)</Label>
              <Input
                id="priceMonthly"
                type="number"
                step="0.01"
                value={priceMonthly}
                onChange={(e) => setPriceMonthly(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="priceYearly">Yearly Price ($/mo)</Label>
              <Input
                id="priceYearly"
                type="number"
                step="0.01"
                value={priceYearly}
                onChange={(e) => setPriceYearly(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="priceTwoYear">2-Year Price ($/mo)</Label>
              <Input
                id="priceTwoYear"
                type="number"
                step="0.01"
                value={priceTwoYear}
                onChange={(e) => setPriceTwoYear(e.target.value)}
                placeholder="Optional"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="moneyBackDays">Money-Back Days</Label>
              <Input
                id="moneyBackDays"
                type="number"
                value={moneyBackDays}
                onChange={(e) => setMoneyBackDays(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 pt-8">
              <Switch
                id="freeTier"
                checked={freeTier}
                onCheckedChange={setFreeTier}
              />
              <Label htmlFor="freeTier">Has Free Tier</Label>
            </div>
          </div>
        </TabsContent>

        {/* Features Tab */}
        <TabsContent value="features" className="space-y-4 mt-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="servers">Servers</Label>
              <Input
                id="servers"
                type="number"
                value={servers}
                onChange={(e) => setServers(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="countries">Countries</Label>
              <Input
                id="countries"
                type="number"
                value={countries}
                onChange={(e) => setCountries(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxDevices">Max Devices</Label>
              <Input
                id="maxDevices"
                type="number"
                value={maxDevices}
                onChange={(e) => setMaxDevices(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="speedScore">Speed Score (1-100)</Label>
              <Input
                id="speedScore"
                type="number"
                min="1"
                max="100"
                value={speedScore}
                onChange={(e) => setSpeedScore(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="securityScore">Security Score (1-100)</Label>
              <Input
                id="securityScore"
                type="number"
                min="1"
                max="100"
                value={securityScore}
                onChange={(e) => setSecurityScore(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="streamingScore">Streaming Score (1-100)</Label>
              <Input
                id="streamingScore"
                type="number"
                min="1"
                max="100"
                value={streamingScore}
                onChange={(e) => setStreamingScore(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="overallRating">Overall Rating (1-5)</Label>
              <Input
                id="overallRating"
                type="number"
                step="0.1"
                min="1"
                max="5"
                value={overallRating}
                onChange={(e) => setOverallRating(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-8 pt-4">
            <div className="flex items-center gap-2">
              <Switch
                id="netflixSupport"
                checked={netflixSupport}
                onCheckedChange={setNetflixSupport}
              />
              <Label htmlFor="netflixSupport">Netflix Support</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="torrentSupport"
                checked={torrentSupport}
                onCheckedChange={setTorrentSupport}
              />
              <Label htmlFor="torrentSupport">Torrent Support</Label>
            </div>
          </div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="protocols">Protocols (comma-separated)</Label>
              <Input
                id="protocols"
                value={protocols}
                onChange={(e) => setProtocols(e.target.value)}
                placeholder="WireGuard, OpenVPN, IKEv2"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="encryption">Encryption</Label>
              <Input
                id="encryption"
                value={encryption}
                onChange={(e) => setEncryption(e.target.value)}
                placeholder="AES-256"
              />
            </div>
          </div>

          <div className="flex items-center gap-8 pt-4">
            <div className="flex items-center gap-2">
              <Switch
                id="killSwitch"
                checked={killSwitch}
                onCheckedChange={setKillSwitch}
              />
              <Label htmlFor="killSwitch">Kill Switch</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="noLogs"
                checked={noLogs}
                onCheckedChange={setNoLogs}
              />
              <Label htmlFor="noLogs">No-Logs Policy</Label>
            </div>
          </div>
        </TabsContent>

        {/* Content Tab */}
        <TabsContent value="content" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="pros">Pros (one per line)</Label>
            <Textarea
              id="pros"
              value={pros}
              onChange={(e) => setPros(e.target.value)}
              placeholder="Excellent speeds&#10;Great for streaming&#10;Strong security"
              rows={5}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cons">Cons (one per line)</Label>
            <Textarea
              id="cons"
              value={cons}
              onChange={(e) => setCons(e.target.value)}
              placeholder="Expensive&#10;Limited servers&#10;No free tier"
              rows={5}
            />
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-4 pt-4 border-t">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : vpn ? "Update VPN" : "Create VPN"}
        </Button>
      </div>
    </form>
  );
}
