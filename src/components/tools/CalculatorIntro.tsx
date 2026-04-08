import type { ReactNode } from "react";

interface CalculatorIntroProps {
  eyebrow: string;
  title: string;
  description: string;
  bestFor: string;
  highlights: string[];
  asideTitle: string;
  asideBody: ReactNode;
}

export default function CalculatorIntro({
  eyebrow,
  title,
  description,
  bestFor,
  highlights,
  asideTitle,
  asideBody,
}: CalculatorIntroProps) {
  return (
    <section className="mb-8 rounded-3xl border border-teal-100 bg-gradient-to-br from-white via-teal-50/70 to-amber-50/40 px-6 py-8 shadow-sm sm:px-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(280px,1fr)] lg:items-start">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-700 mb-3">
            {eyebrow}
          </p>
          <h1 className="font-display text-4xl leading-tight text-gray-900 sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
            {description}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-800">
              Best for: {bestFor}
            </span>
            {highlights.map((item) => (
              <span
                key={item}
                className="rounded-full border border-teal-200 bg-white/80 px-3 py-1 text-xs font-medium text-gray-700"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <aside className="rounded-2xl border border-white/70 bg-white/90 p-5 shadow-sm">
          <p className="text-sm font-semibold text-gray-900 mb-2">{asideTitle}</p>
          <div className="text-sm leading-6 text-gray-600">{asideBody}</div>
        </aside>
      </div>
    </section>
  );
}
