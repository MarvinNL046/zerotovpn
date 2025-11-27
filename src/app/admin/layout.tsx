"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LayoutDashboard,
  MessageSquare,
  MousePointer,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
} from "lucide-react";
import "@/app/globals.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminKey, setAdminKey] = useState("");
  const [error, setError] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Check for stored admin key
    const storedKey = localStorage.getItem("adminKey");
    if (storedKey) {
      setAdminKey(storedKey);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple key validation (in production, verify against server)
    if (adminKey.length >= 8) {
      localStorage.setItem("adminKey", adminKey);
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid admin key");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminKey");
    setIsAuthenticated(false);
    setAdminKey("");
  };

  if (!isAuthenticated) {
    return (
      <html lang="en">
        <body>
          <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
                <p className="text-muted-foreground">Enter your admin key to continue</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Input
                      type="password"
                      placeholder="Admin Key"
                      value={adminKey}
                      onChange={(e) => setAdminKey(e.target.value)}
                    />
                  </div>
                  {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                  )}
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </body>
      </html>
    );
  }

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/reviews", label: "Review Moderation", icon: MessageSquare },
    { href: "/admin/clicks", label: "Click Analytics", icon: MousePointer },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ];

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
          {/* Mobile Header */}
          <div className="lg:hidden bg-white dark:bg-gray-800 border-b px-4 py-3 flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <span className="font-semibold">ZeroToVPN Admin</span>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex">
            {/* Sidebar */}
            <aside
              className={`${
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
              } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r transition-transform duration-200 ease-in-out`}
            >
              <div className="flex flex-col h-full">
                {/* Logo */}
                <div className="p-6 border-b hidden lg:block">
                  <Link href="/admin" className="flex items-center gap-2">
                    <Shield className="h-8 w-8 text-primary" />
                    <span className="font-bold text-xl">Admin</span>
                  </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                        onClick={() => setIsSidebarOpen(false)}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>

                {/* Footer */}
                <div className="p-4 border-t">
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-5 w-5 mr-3" />
                    Logout
                  </Button>
                  <Link
                    href="/"
                    className="flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground hover:text-foreground"
                  >
                    View Site
                  </Link>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 lg:p-8 min-h-screen">
              {children}
            </main>
          </div>

          {/* Mobile overlay */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black/50 lg:hidden z-40"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}
        </div>
      </body>
    </html>
  );
}
