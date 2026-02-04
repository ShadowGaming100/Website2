import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TrustpilotWidget from "@/components/TrustpilotWidget";
import Terminal from "@/components/Terminal";

export default function Hero() {
  return (
    <section className="relative pt-12 pb-24 lg:pt-32 lg:pb-32 overflow-hidden">
      {/* Decorative background }*/}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute -inset-x-10 bottom-0 h-[60%] opacity-40 blur-[100px]">
          <div
            className="size-full"
            style={{
              backgroundImage:
                "radial-gradient(77% 116% at 37% 67%, rgba(59,130,246,0.12), rgba(59,130,246,0) 50%), radial-gradient(56% 84% at 34% 56%, rgba(59,130,246,0.08), rgba(58,139,253,0) 50%)",
            }}
          />
        </div>
      </div>

      <div className="container-default relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Announcement / Trust */}
            <div className="fade-in slide-in-from-bottom-10 group mx-auto flex w-fit items-center gap-3 rounded-full border bg-[rgb(var(--card))] p-1.5 pl-3 shadow transition-all duration-500 ease-out active:scale-98 mb-6">
              <span className="text-xs font-semibold">
                5,000+ developers trust us
              </span>
              <TrustpilotWidget />
            </div>

            <h1 className="heading-1 text-[rgb(var(--text))] mb-6 text-balance">
              Find the Perfect Free Hosting for Your Project
            </h1>

            <p className="body-default text-[rgb(var(--muted))] mb-8 max-w-xl mx-auto lg:mx-0 text-balance font-medium">
              The most comprehensive directory of verified free hosting
              providers. Deploy apps without spending a dime.
            </p>

            <div className="fade-in slide-in-from-bottom-10 flex animate-in flex-row flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href="/hosts"
                className="inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap font-medium text-sm outline-none transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 rounded-full border bg-[rgb(var(--card))] hover:bg-[rgb(var(--accent))] hover:text-[rgb(var(--accent-foreground))] h-10 px-6 has-[&>svg]:px-4"
              >
                Browse Hosts
              </a>

              <a
                href="/hosts"
                className="inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap font-medium text-sm outline-none transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 rounded-full bg-[rgb(var(--accent))] text-[rgb(var(--accent-foreground))] h-10 px-6 has-[&>svg]:px-4"
              >
                Learn More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-right ml-1"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
            </div>

            <div className="mt-6 hidden sm:block"></div>
          </div>

          {/* Right Content - Terminal */}
          <div className="hidden lg:block relative">
            <Terminal />
          </div>
        </div>
      </div>
    </section>
  );
}
