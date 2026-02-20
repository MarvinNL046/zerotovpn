import { StackServerApp } from "@stackframe/stack";

let stackServerApp: StackServerApp | null = null;

try {
  stackServerApp = new StackServerApp({
    tokenStore: "nextjs-cookie",
    urls: {
      home: "/admin",
      signIn: "/handler/sign-in",
      afterSignIn: "/admin",
      afterSignUp: "/admin",
      signOut: "/handler/sign-in",
    },
  });
} catch (e) {
  console.warn("[stack] Failed to initialize Stack Auth:", e instanceof Error ? e.message : e);
}

export { stackServerApp };
