import Link from "next/link";
import { FileQuestion, Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 px-4">
      <div className="w-full max-w-md text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <FileQuestion className="h-10 w-10 text-primary" />
        </div>

        {/* Error Code */}
        <h1 className="mb-2 text-6xl font-bold tracking-tight text-foreground">
          404
        </h1>

        {/* Title */}
        <h2 className="mb-4 text-xl font-semibold text-muted-foreground">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="mb-8 text-muted-foreground">
          The page you are looking for does not exist or has been moved.
          Try searching for what you need or return to the homepage.
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <Home className="h-4 w-4" />
            Go to Homepage
          </Link>
          <Link
            href="/vpn-index"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-medium text-card-foreground shadow-sm transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <Search className="h-4 w-4" />
            Browse VPNs
          </Link>
        </div>
      </div>

      {/* Footer */}
      <p className="mt-12 text-sm text-muted-foreground">
        ZeroToVPN &copy; {new Date().getFullYear()}
      </p>
    </div>
  );
}
