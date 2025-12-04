"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Save,
  Database,
  Key,
  Bell,
  Shield,
  Globe,
  CheckCircle,
} from "lucide-react";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);

  // Settings state
  const [settings, setSettings] = useState({
    // General
    siteName: "ZeroToVPN",
    siteUrl: "https://zerotovpn.com",
    adminEmail: "admin@zerotovpn.com",

    // Reviews
    autoApproveReviews: false,
    requireEmailVerification: true,
    minReviewLength: 50,
    maxReviewsPerDay: 5,

    // Notifications
    emailOnNewReview: true,
    emailOnSpam: true,
    dailyDigest: false,

    // Database
    databaseConnected: false,
    databaseUrl: "",
  });

  const handleSave = () => {
    // In production: save to database/env
    console.log("Saving settings:", settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Configure your admin dashboard</p>
      </div>

      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            General Settings
          </CardTitle>
          <CardDescription>Basic site configuration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">Site Name</Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) =>
                  setSettings({ ...settings, siteName: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="siteUrl">Site URL</Label>
              <Input
                id="siteUrl"
                value={settings.siteUrl}
                onChange={(e) =>
                  setSettings({ ...settings, siteUrl: e.target.value })
                }
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="adminEmail">Admin Email</Label>
            <Input
              id="adminEmail"
              type="email"
              value={settings.adminEmail}
              onChange={(e) =>
                setSettings({ ...settings, adminEmail: e.target.value })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Review Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Review Moderation
          </CardTitle>
          <CardDescription>Configure how reviews are handled</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Auto-approve Reviews</Label>
              <p className="text-sm text-muted-foreground">
                Automatically approve all new reviews (not recommended)
              </p>
            </div>
            <Switch
              checked={settings.autoApproveReviews}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, autoApproveReviews: checked })
              }
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Require Email Verification</Label>
              <p className="text-sm text-muted-foreground">
                Require users to verify their email before review is shown
              </p>
            </div>
            <Switch
              checked={settings.requireEmailVerification}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, requireEmailVerification: checked })
              }
            />
          </div>
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="minReviewLength">Minimum Review Length</Label>
              <Input
                id="minReviewLength"
                type="number"
                value={settings.minReviewLength}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    minReviewLength: parseInt(e.target.value) || 0,
                  })
                }
              />
              <p className="text-xs text-muted-foreground">Characters</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxReviewsPerDay">Max Reviews Per Day (per IP)</Label>
              <Input
                id="maxReviewsPerDay"
                type="number"
                value={settings.maxReviewsPerDay}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    maxReviewsPerDay: parseInt(e.target.value) || 1,
                  })
                }
              />
              <p className="text-xs text-muted-foreground">Prevent spam</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
          <CardDescription>Email notification preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>New Review Notification</Label>
              <p className="text-sm text-muted-foreground">
                Get notified when a new review is submitted
              </p>
            </div>
            <Switch
              checked={settings.emailOnNewReview}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, emailOnNewReview: checked })
              }
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Spam Alert</Label>
              <p className="text-sm text-muted-foreground">
                Get notified when potential spam is detected
              </p>
            </div>
            <Switch
              checked={settings.emailOnSpam}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, emailOnSpam: checked })
              }
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Daily Digest</Label>
              <p className="text-sm text-muted-foreground">
                Receive a daily summary of activity
              </p>
            </div>
            <Switch
              checked={settings.dailyDigest}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, dailyDigest: checked })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Database Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Database Connection
          </CardTitle>
          <CardDescription>Configure your Neon PostgreSQL database</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <div
              className={`w-3 h-3 rounded-full ${
                settings.databaseConnected ? "bg-green-500" : "bg-red-500"
              }`}
            />
            <span className="text-sm">
              {settings.databaseConnected ? "Connected" : "Not Connected"}
            </span>
          </div>
          <div className="space-y-2">
            <Label htmlFor="databaseUrl">Database URL</Label>
            <Input
              id="databaseUrl"
              type="password"
              placeholder="postgresql://..."
              value={settings.databaseUrl}
              onChange={(e) =>
                setSettings({ ...settings, databaseUrl: e.target.value })
              }
            />
            <p className="text-xs text-muted-foreground">
              Get your connection string from{" "}
              <a
                href="https://neon.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Neon Console
              </a>
            </p>
          </div>
          <Button variant="outline" className="w-full">
            Test Connection
          </Button>
        </CardContent>
      </Card>

      {/* API Keys */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            API Keys
          </CardTitle>
          <CardDescription>Manage API access keys</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Admin Key</Label>
            <div className="flex gap-2">
              <Input type="password" value="••••••••••••" readOnly />
              <Button variant="outline">Regenerate</Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Used for API authentication. Keep this secret!
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex items-center gap-4">
        <Button onClick={handleSave} className="w-40">
          {saved ? (
            <>
              <CheckCircle className="h-4 w-4 mr-2" />
              Saved!
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </>
          )}
        </Button>
        {saved && (
          <span className="text-sm text-green-600">
            Settings saved successfully
          </span>
        )}
      </div>

      {/* Info */}
      <Card className="bg-muted/50">
        <CardContent className="py-4">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> Some settings require environment variables to be set in your{" "}
            <code className="bg-muted px-1 rounded">.env</code> file. See the documentation for more details.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
