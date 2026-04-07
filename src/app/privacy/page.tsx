import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | DebtHydra",
  description:
    "DebtHydra's privacy policy covering calculator inputs, contact form messages, analytics, cookies, and advertising disclosures.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
      <div className="prose text-sm space-y-4 text-gray-700">
        <p>
          <strong>Short version:</strong> your calculator inputs stay in your browser, we only
          collect the information you choose to send us through the contact form, and we may use
          privacy-focused analytics and advertising tools to keep the site running.
        </p>

        <h2 className="text-lg font-bold text-gray-900 mt-6 mb-2">Information we collect</h2>
        <p>
          DebtHydra does not require an account to use the calculators or read the guides. The
          debt balances, rates, and other calculator inputs you type into the tools are processed
          locally in your browser and are not stored by us.
        </p>
        <p>
          If you contact us, we collect the information you submit in the contact form, such as
          your name, email address, and message, so we can reply and keep basic correspondence
          records.
        </p>
        <p>
          Like most websites, our hosting and infrastructure providers may also collect standard
          technical data such as IP address, browser type, device information, referrer, and pages
          visited for security, fraud prevention, site reliability, and performance monitoring.
        </p>

        <h2 className="text-lg font-bold text-gray-900 mt-6 mb-2">
          How we use your information
        </h2>
        <p>
          We use information to operate the site, respond to messages, monitor performance, prevent
          abuse, and improve the calculators and guides. We do not sell your personal information.
        </p>

        <h2 className="text-lg font-bold text-gray-900 mt-6 mb-2">Analytics and cookies</h2>
        <p>
          DebtHydra uses Vercel Analytics and Vercel Speed Insights to understand aggregate traffic
          and site performance. These tools help us measure which pages are useful and whether the
          site is fast and stable.
        </p>
        <p>
          We and our service providers may use cookies, local storage, or similar technologies for
          essential site behavior, measurement, fraud prevention, and performance. If we enable
          advertising features that rely on cookies or similar identifiers, this policy will apply
          to those uses as well.
        </p>

        <h2 className="text-lg font-bold text-gray-900 mt-6 mb-2">Advertising</h2>
        <p>
          DebtHydra may display ads to support the cost of running the site. If advertising is
          enabled, third-party vendors including Google may use cookies to serve ads based on a
          user&apos;s visit to this site and other sites.
        </p>
        <p>
          Google&apos;s use of advertising cookies enables it and its partners to serve ads based on
          visits to this site and/or other sites on the Internet. Users may be able to manage or
          opt out of certain personalized advertising by visiting Google&apos;s{" "}
          <a
            href="https://adssettings.google.com/"
            className="text-teal-600 underline"
            rel="noreferrer"
            target="_blank"
          >
            Ads Settings
          </a>{" "}
          and by reviewing Google&apos;s{" "}
          <a
            href="https://support.google.com/adsense/answer/140377"
            className="text-teal-600 underline"
            rel="noreferrer"
            target="_blank"
          >
            personalized advertising guidance
          </a>
          .
        </p>
        <p>
          Depending on your location, you may also see a consent message before personalized ads
          are shown where required by law.
        </p>

        <h2 className="text-lg font-bold text-gray-900 mt-6 mb-2">Third-party services</h2>
        <p>We use third-party providers to operate parts of DebtHydra, including:</p>
        <ul>
          <li>
            <a
              href="https://vercel.com/legal/privacy-policy"
              className="text-teal-600 underline"
              rel="noreferrer"
              target="_blank"
            >
              Vercel
            </a>{" "}
            for hosting, analytics, and performance monitoring.
          </li>
          <li>
            <a
              href="https://resend.com/legal/privacy-policy"
              className="text-teal-600 underline"
              rel="noreferrer"
              target="_blank"
            >
              Resend
            </a>{" "}
            for delivering contact form email.
          </li>
          <li>
            <a
              href="https://policies.google.com/privacy"
              className="text-teal-600 underline"
              rel="noreferrer"
              target="_blank"
            >
              Google
            </a>{" "}
            if AdSense or other Google advertising products are enabled.
          </li>
        </ul>

        <h2 className="text-lg font-bold text-gray-900 mt-6 mb-2">Data retention</h2>
        <p>
          We keep contact form submissions only as long as reasonably necessary to respond,
          maintain correspondence records, troubleshoot issues, and comply with legal obligations.
        </p>

        <h2 className="text-lg font-bold text-gray-900 mt-6 mb-2">Your choices</h2>
        <p>
          You can choose not to use the contact form, disable cookies in your browser, or use the
          ad controls made available by Google and other vendors where applicable. Some features may
          not work properly if essential cookies are blocked.
        </p>

        <h2 className="text-lg font-bold text-gray-900 mt-6 mb-2">Contact</h2>
        <p>
          Questions about this policy? Reach us through the{" "}
          <Link href="/contact" className="text-teal-600 underline">
            contact page
          </Link>
          .
        </p>
        <p className="text-xs text-gray-400 mt-6">Last updated: April 5, 2026</p>
      </div>
    </div>
  );
}
