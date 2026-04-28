import Link from "next/link";
import { LogoMark } from "@/components/ui/logo";

type FooterLinkEntry = { label: string; href: string; external?: boolean };

const platformLinks: FooterLinkEntry[] = [
  { label: "Find Talent",  href: "/#talent"       },
  { label: "Post a Job",   href: "/#pricing"      },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Pricing",      href: "/#pricing"      },
];

const companyLinks: FooterLinkEntry[] = [
  { label: "About Us", href: "#" },
  { label: "Careers",  href: "#" },
  { label: "Blog",     href: "#" },
  { label: "Press",    href: "#" },
];

const supportLinks: FooterLinkEntry[] = [
  { label: "Help Center",      href: "#"        },
  { label: "Contact Us",       href: "#"        },
  { label: "Privacy Policy",   href: "/privacy" },
  { label: "Terms of Service", href: "/terms"   },
  { label: "Cookie Policy",    href: "/cookies" },
];

const columns = [
  { heading: "Platform", links: platformLinks },
  { heading: "Company",  links: companyLinks  },
  { heading: "Support",  links: supportLinks  },
] as const;

function FooterLink({ href, label }: FooterLinkEntry) {
  const isAnchor  = href.startsWith("/#") || href === "#";
  const isInternal = href.startsWith("/") && !href.startsWith("/#");

  const cls =
    "group relative inline-flex items-center gap-1 text-sm text-neutral-500 transition-colors duration-200 hover:text-white";

  const inner = (
    <>
      {label}
      {/* Underline slide-in on hover */}
      <span
        className="absolute -bottom-px left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full"
        aria-hidden
      />
    </>
  );

  if (isInternal) {
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  }

  // anchor links and placeholder "#" both use <a>
  return (
    <a href={href} className={cls}>
      {inner}
    </a>
  );
}

export function Footer() {
  return (
    <footer className="bg-navy-900 border-t border-white/[0.06]">
      {/* ── Main grid ─────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 pt-14 pb-10 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_auto]">

          {/* Brand column */}
          <div className="flex max-w-xs flex-col gap-5">
            <Link
              href="/"
              className="group flex w-fit items-center transition-opacity hover:opacity-90"
            >
              <LogoMark inverted className="h-14 w-auto" />
            </Link>

            {/* Gold rule */}
            <div className="h-px w-8 bg-gold/60" />

            <p className="text-[13px] leading-relaxed text-neutral-500">
              The elite VA recruiting agency connecting ambitious businesses with
              the top&nbsp;1% of vetted virtual professionals.
            </p>
            <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-neutral-700">
              Smarter than Upwork ·{" "}
              <span className="text-neutral-600">More curated than OnlineJobs.ph</span>
            </p>
          </div>

          {/* Three link columns — packed together on the right */}
          <div className="grid grid-cols-3 gap-x-10 gap-y-10 sm:gap-x-14">
            {columns.map(({ heading, links }) => (
              <div key={heading}>
                <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-400">
                  {heading}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {links.map((link) => (
                    <li key={link.label} className="relative">
                      <FooterLink {...link} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom bar ─────────────────────────────────────────── */}
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/[0.06] pt-6 sm:flex-row sm:items-center">
          <p className="text-[11px] text-neutral-600">
            © {new Date().getFullYear()} VirtualPersonal.ai. All rights reserved.
          </p>

          {/* Inline legal links */}
          <div className="flex items-center gap-4">
            {([
              { label: "Privacy",  href: "/privacy"  },
              { label: "Terms",    href: "/terms"    },
              { label: "Cookies",  href: "/cookies"  },
            ] as FooterLinkEntry[]).map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-[11px] text-neutral-600 transition-colors duration-200 hover:text-gold"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
