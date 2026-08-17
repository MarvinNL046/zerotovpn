import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "@/lib/stack";

type StackProviderApp = NonNullable<
  React.ComponentProps<typeof StackProvider>["app"]
>;

export default function HandlerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!stackServerApp) return children;

  return (
    <StackProvider app={stackServerApp as unknown as StackProviderApp}>
      <StackTheme>{children}</StackTheme>
    </StackProvider>
  );
}
