import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

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
        <ContactForm />
      </div>
    </div>
  );
}
