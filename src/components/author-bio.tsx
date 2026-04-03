import Link from "next/link";

export function AuthorBio() {
  return (
    <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-6 flex items-start gap-4 mt-10">
      <img
        src="/images/team/marvin.webp"
        alt="Marvin Smit — Founder of ZeroToVPN"
        className="w-16 h-16 rounded-full object-cover flex-shrink-0 border-2 border-orange-500"
      />
      <div>
        <p className="font-bold text-slate-900 dark:text-white mb-1">
          Written by Marvin Smit
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
          Marvin is a privacy advocate and the founder of ZeroToVPN. He personally tests every VPN service on speed, security, streaming, and privacy to bring you honest, unbiased reviews.
        </p>
        <Link
          href="/about"
          className="text-sm text-orange-500 hover:text-orange-600 font-medium transition-colors"
        >
          Learn more about our testing methodology →
        </Link>
      </div>
    </div>
  );
}
