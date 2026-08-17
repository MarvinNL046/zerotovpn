"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  locale,
  ...props
}: React.ComponentProps<typeof NextThemesProvider> & { locale?: string }) {
  React.useEffect(() => {
    if (locale) document.documentElement.lang = locale;
  }, [locale]);

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
