"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser, UserButton } from "@stackframe/stack";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LayoutDashboard,
  MessageSquare,
  MousePointer,
  Settings,
  Menu,
  X,
  Shield,
  LogIn,
  Loader2,
  Workflow,
} from "lucide-react";

function AdminLoading() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

const ALLOWED_ADMIN_EMAILS = (
  process.env.NEXT_PUBLIC_ADMIN_EMAILS || "marvinsmit1988@gmail.com,info@staycoolairco.nl"
)
  .split(",")
  .map((e) => e.trim().toLowerCase());

function AdminContent({ children }: { children: React.ReactNode }) {
  const user = useUser();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  // Show login prompt if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
            <p className="text-muted-foreground">Sign in to access the admin dashboard</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/handler/sign-in">
              <Button className="w-full">
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            </Link>
            <p className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/handler/sign-up" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Block unauthorized users — only allowed emails can access admin
  const userEmail = user.primaryEmail?.toLowerCase();
  if (!userEmail || !ALLOWED_ADMIN_EMAILS.includes(userEmail)) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-red-500" />
            </div>
            <CardTitle className="text-2xl">Access Denied</CardTitle>
            <p className="text-muted-foreground">
              Your account ({userEmail}) does not have admin access.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/">
              <Button variant="outline" className="w-full">
                Back to Site
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/pipeline", label: "Content Pipeline", icon: Workflow },
    { href: "/admin/reviews", label: "Review Moderation", icon: MessageSquare },
    { href: "/admin/clicks", label: "Click Analytics", icon: MousePointer },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ];

  return (
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
        <UserButton />
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
            <div className="p-4 border-t space-y-2">
              <div className="flex items-center gap-3 px-4 py-2">
                <UserButton />
                <span className="text-sm text-muted-foreground truncate">
                  {user.primaryEmail}
                </span>
              </div>
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
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<AdminLoading />}>
      <AdminContent>{children}</AdminContent>
    </Suspense>
  );
}
