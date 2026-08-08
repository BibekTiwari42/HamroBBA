import Link from "next/link";

const headingClass =
  "text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-slate-100";
const linkItemClass =
  "group inline-flex items-center gap-1.5 transition-all duration-200 hover:text-blue-600 dark:hover:text-blue-400 hover:translate-x-1";
const linkArrowClass =
  "text-xs opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 text-blue-600 dark:text-blue-400";
const baseIconClass =
  "w-9 h-9 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 transition-all duration-300 hover:shadow-sm";  const legalLinkClass =
  "transition-colors hover:text-slate-900 dark:hover:text-slate-200";

const linkColumns: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "About",
    links: [
      { href: "/about", label: "Our Story" },
      { href: "/bba-program", label: "The BBA Program" },
      { href: "/contributors", label: "Contributors" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/report-issue", label: "Report an Issue" },
      { href: "/request-notes", label: "Request Notes" },
      { href: "/faq", label: "FAQ" },
      { href: "/feedback", label: "Feedback" },
    ],
  },
];


const socialLinks = [
  {
    href: "https://facebook.com",
    label: "Facebook",
    hoverClass: "hover:text-[#1877F2] hover:border-[#1877F2]",
    paths: [
      "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
    ],
  },
  {
    href: "https://instagram.com",
    label: "Instagram",
    hoverClass: "hover:text-[#E4405F] hover:border-[#E4405F]",
    paths: [
      "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
    ],
  },
  {
    href: "https://youtube.com",
    label: "YouTube",
    hoverClass: "hover:text-[#FF0000] hover:border-[#FF0000]",
    paths: [
      "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
    ],
  },
  {
    href: "https://tiktok.com",
    label: "TikTok",
    hoverClass: "hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white",
    paths: [
      "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z",
    ],
  },
  {
    href: "https://linkedin.com",
    label: "LinkedIn",
    hoverClass: "hover:text-[#0A66C2] hover:border-[#0A66C2]",
    paths: [
      "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
    ],
  },
];

const legalLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/cookie-policy", label: "Cookie Policy" },
  { href: "/copyright", label: "Copyright" },
];

function FooterLinkColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div className="space-y-4">
      <h3 className={headingClass}>{title}</h3>
      <ul className="space-y-2.5 text-sm font-medium text-slate-600 dark:text-slate-400">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link href={href} className={linkItemClass}>
              <span>{label}</span>
              <span className={linkArrowClass} aria-hidden="true">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-slate-200/80 bg-slate-50 text-slate-800 transition-colors duration-200 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 print:hidden">
      <div className="mx-auto max-w-7xl px-5 pt-12 pb-6 sm:px-6 md:pt-16">
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:gap-x-10 lg:grid-cols-4 lg:gap-x-8">
          {/* Column 1: Brand Info */}
          <div className="space-y-4 col-span-2 lg:col-span-1">
            <Link href="/" className="text-3xl font-tillana font-extrabold tracking-tight text-blue-600 dark:text-blue-500">
              हाम्रो<span className="text-slate-800 dark:text-slate-100">BBA</span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-800 dark:text-slate-200">
              A comprehensive open-resource hub tailored exclusively for Tribhuvan University BBA Students. Streamlining preparation with notes, board papers, and announcements.
            </p>
          </div>

          {/* Columns 2-3: Link Columns */}
          {linkColumns.map((column) => (
            <FooterLinkColumn key={column.title} {...column} />
          ))}

          {/* Column 4: Reach Us */}
          <div className="space-y-4 col-span-2 lg:col-span-1">
            <h3 className={`font-mono ${headingClass}`}>Reach Us</h3>
            <div className="text-sm space-y-1.5 text-slate-600 dark:text-slate-400 font-medium">
              <p>
                <a href="mailto:hello@hamrobba.com" className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">
                  hello@hamrobba.com
                </a>
              </p>
              <p>Kirtipur, Kathmandu</p>
              <p>TU Central Campus, Nepal</p>
            </div>

            {/* Social Icons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
                {socialLinks.map(({ href, label, paths, hoverClass }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className={`${baseIconClass} ${hoverClass}`}
                    aria-label={label}
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      {paths.map((d, index) => (
                        <path key={index} d={d} />
                      ))}
                    </svg>
                  </a>
                ))}
              </div>
          </div>
        </div>

        {/* Middle Section */}
        <div className="flex justify-center items-center select-none overflow-hidden bg-slate-50 py-5 md:py-6 dark:bg-slate-950">
          <h1 className="text-[max(2.5rem,11vw)] md:text-[12vw] leading-normal whitespace-nowrap text-center flex items-center justify-center gap-3 md:gap-5">
            <span className="font-tillana font-extrabold bg-linear-to-t from-blue-800 via-blue-600 to-blue-400 dark:from-blue-700 dark:via-cyan-500 dark:to-cyan-300 bg-clip-text text-transparent drop-shadow-sm ">
              हाम्रो
            </span>
            <span className="font-tillana font-black bg-linear-to-t from-slate-900 to-slate-500 dark:from-slate-500 dark:to-white bg-clip-text text-transparent drop-shadow-sm">
              BBA
            </span>
          </h1>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500 dark:text-slate-400">
          <p className="text-center sm:text-left">
            © {currentYear} HamroBBA. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 font-medium">
            {legalLinks.map(({ href, label }) => (
              <Link key={href} href={href} className={legalLinkClass}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
