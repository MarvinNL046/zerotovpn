import { StackServerApp } from "@stackframe/stack";

export const stackServerApp = new StackServerApp({
  tokenStore: "nextjs-cookie",
  urls: {
    home: "/admin",
    signIn: "/handler/sign-in",
    afterSignIn: "/admin",
    afterSignUp: "/admin",
    signOut: "/handler/sign-in",
  },
});
