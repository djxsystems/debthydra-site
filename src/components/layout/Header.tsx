"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/tools", label: "Calculators" },
  { href: "/guides", label: "Guides" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white font-bold text-sm group-hover:bg-teal-700 transition-colors">
              DH
            </div>
            <span className="font-display text-2xl leading-none text-gray-900 tracking-tight">
              Debt<span className="text-teal-600">Hydra</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors ${
                  isActive(link.href)
                    ? "text-teal-700 font-semibold"
                    : "text-gray-600 hover:text-teal-600 font-medium"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/tools"
              className={`text-sm font-semibold px-4 py-2 rounded-lg transition-colors ${
                isActive("/tools")
                  ? "bg-teal-700 text-white"
                  : "bg-teal-600 hover:bg-teal-700 text-white"
              }`}
            >
              Try a Calculator
            </Link>
          </nav>

          <button
            className="md:hidden p-2 text-gray-600 hover:text-teal-600"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className="block w-5 h-0.5 bg-current mb-1" />
            <span className="block w-5 h-0.5 bg-current mb-1" />
            <span className="block w-5 h-0.5 bg-current" />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 flex flex-col gap-3">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`py-1 ${
                isActive(link.href)
                  ? "text-teal-700 font-semibold"
                  : "text-gray-700 hover:text-teal-600 font-medium"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/tools"
            className={`text-sm font-semibold px-4 py-2 rounded-lg text-center mt-1 ${
              isActive("/tools") ? "bg-teal-700 text-white" : "bg-teal-600 text-white"
            }`}
            onClick={() => setMenuOpen(false)}
          >
            Try a Calculator
          </Link>
        </div>
      )}
    </header>
  );
}
