import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | DebtHydra",
  description: "DebtHydra's privacy policy. We don't collect personal data.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
      <div className="prose text-sm space-y-4 text-gray-700">
        <p>
          <strong>Short version: we don&apos;t collect personal data.</strong> All calculations
          happen in your browser. We don&apos;t store your financial inputs, create user accounts,
          or sell your data.
        </p>

        <h2 className="text-lg font-bold text-gray-900 mt-6 mb-2">Information we collect</h2>
        <p>
          DebtHydra does not require you to create an account or provide any personal information.
          The calculator inputs you enter are processed entirely in your browser and are never sent
          to our servers.
        </p>
        <p>
          Like most websites, our hosting provider may collect standard server logs including IP
          addresses, browser type, and pages visited. These are used for security and performance
          monitoring only.
        </p>

        <h2 className="text-lg font-bold text-gray-900 mt-6 mb-2">Cookies</h2>
        <p>
          We do not use tracking cookies or third-party advertising cookies. Any cookies set are
          strictly necessary for the site to function.
        </p>

        <h2 className="text-lg font-bold text-gray-900 mt-6 mb-2">Third-party services</h2>
        <p>
          This site is hosted on Vercel, which has its own{" "}
          <a href="https://vercel.com/legal/privacy-policy" className="text-teal-600 underline">
            privacy policy
          </a>
          . We do not use Google Analytics or any other behavioural tracking services.
        </p>

        <h2 className="text-lg font-bold text-gray-900 mt-6 mb-2">Contact</h2>
        <p>
          Questions about this policy? Reach us through the{" "}
          <a href="/contact" className="text-teal-600 underline">
            contact page
          </a>
          .
        </p>
        <p className="text-xs text-gray-400 mt-6">Last updated: December 2024</p>
      </div>
    </div>
  );
}
