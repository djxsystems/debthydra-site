import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | DebtHydra",
  description: "Get in touch with the DebtHydra team.",
};

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact</h1>
      <p className="text-gray-600 mb-8">
        Have a question, found a bug, or want to suggest a new calculator? We&apos;d love to hear
        from you.
      </p>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <p className="text-sm text-gray-600 mb-6">
          Email us at{" "}
          <a href="mailto:hello@debthydra.com" className="text-teal-600 font-medium underline">
            hello@debthydra.com
          </a>
          . We typically respond within 1–2 business days.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              rows={5}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
              placeholder="What's on your mind?"
            />
          </div>
          <p className="text-xs text-gray-400">
            Note: this form is decorative — please email us directly at hello@debthydra.com.
          </p>
        </div>
      </div>
    </div>
  );
}
