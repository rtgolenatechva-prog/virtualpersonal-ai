import type { Metadata } from "next";
import { LegalLayout, LegalH2, LegalP, LegalUl } from "@/components/ui/legal-layout";

export const metadata: Metadata = {
  title: "Privacy Policy — VirtualPersonal.ai",
  description:
    "Learn how VirtualPersonal.ai collects, uses, and protects your personal information across our virtual assistant recruiting platform.",
  alternates: { canonical: "https://virtualpersonal.ai/privacy" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="April 13, 2026">

      <LegalP>
        VirtualPersonal.ai (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to
        protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and
        safeguard your information when you use our platform and services.
      </LegalP>

      <LegalH2>1. Information We Collect</LegalH2>
      <LegalP>
        We collect information you provide directly to us, information collected automatically when
        you use the Service, and information from third-party sources.
      </LegalP>
      <LegalUl>
        <li>
          <strong>Account information:</strong> Name, email address, company name, billing details
        </li>
        <li>
          <strong>Job postings:</strong> Role descriptions, requirements, preferences
        </li>
        <li>
          <strong>Communication data:</strong> Messages sent through our platform
        </li>
        <li>
          <strong>Usage data:</strong> Pages visited, features used, time spent on the Service
        </li>
        <li>
          <strong>Device data:</strong> IP address, browser type, operating system
        </li>
      </LegalUl>

      <LegalH2>2. How We Use Your Information</LegalH2>
      <LegalP>
        We use the information we collect to:
      </LegalP>
      <LegalUl>
        <li>Provide, operate, and improve our Service</li>
        <li>Match you with suitable virtual assistant candidates</li>
        <li>Process payments and send billing-related communications</li>
        <li>Send service updates, security alerts, and support messages</li>
        <li>Personalise your experience and deliver relevant content</li>
        <li>Comply with legal obligations and enforce our Terms of Service</li>
        <li>Detect and prevent fraudulent or harmful activity</li>
      </LegalUl>

      <LegalH2>3. Information Sharing</LegalH2>
      <LegalP>
        We do not sell your personal information. We may share your information with:
      </LegalP>
      <LegalUl>
        <li>
          <strong>Virtual assistant candidates:</strong> Limited profile information necessary for
          the matching process
        </li>
        <li>
          <strong>Service providers:</strong> Trusted third parties who assist us in operating the
          platform (e.g., payment processors, cloud hosting, email delivery)
        </li>
        <li>
          <strong>Legal authorities:</strong> When required by law, regulation, or legal process
        </li>
        <li>
          <strong>Business transfers:</strong> In connection with a merger, acquisition, or sale of
          assets, with appropriate confidentiality obligations
        </li>
      </LegalUl>

      <LegalH2>4. Cookies and Tracking Technologies</LegalH2>
      <LegalP>
        We use cookies and similar tracking technologies to enhance your experience on our platform.
        For detailed information about the cookies we use and how to manage them, please see our{" "}
        <a href="/cookies" className="text-primary hover:underline">
          Cookie Policy
        </a>
        .
      </LegalP>

      <LegalH2>5. Data Retention</LegalH2>
      <LegalP>
        We retain your personal information for as long as your account is active or as needed to
        provide the Service. We also retain information as necessary to comply with legal
        obligations, resolve disputes, and enforce agreements. When you close your account, we will
        delete or anonymise your data within 90 days, unless retention is required by law.
      </LegalP>

      <LegalH2>6. Your Rights</LegalH2>
      <LegalP>
        Depending on your location, you may have the following rights regarding your personal data:
      </LegalP>
      <LegalUl>
        <li>Access — request a copy of the personal data we hold about you</li>
        <li>Rectification — request correction of inaccurate data</li>
        <li>Erasure — request deletion of your personal data</li>
        <li>Portability — receive your data in a structured, machine-readable format</li>
        <li>Objection — object to certain processing of your data</li>
        <li>Restriction — request we restrict processing of your data</li>
      </LegalUl>
      <LegalP>
        To exercise any of these rights, please contact us at{" "}
        <a href="mailto:privacy@virtualpersonal.ai" className="text-primary hover:underline">
          privacy@virtualpersonal.ai
        </a>
        .
      </LegalP>

      <LegalH2>7. Security</LegalH2>
      <LegalP>
        We implement industry-standard security measures to protect your information, including
        encryption in transit (TLS), encryption at rest, access controls, and regular security
        audits. However, no method of transmission over the internet is 100% secure, and we cannot
        guarantee absolute security.
      </LegalP>

      <LegalH2>8. Children&apos;s Privacy</LegalH2>
      <LegalP>
        Our Service is not directed to individuals under the age of 18. We do not knowingly collect
        personal information from children. If we become aware that we have collected personal
        information from a child, we will take steps to delete that information promptly.
      </LegalP>

      <LegalH2>9. Changes to This Policy</LegalH2>
      <LegalP>
        We may update this Privacy Policy periodically. We will notify you of material changes via
        email or through the Service. The &quot;Last updated&quot; date at the top of this page
        reflects the most recent revision.
      </LegalP>

      <LegalH2>10. Contact Us</LegalH2>
      <LegalP>
        If you have questions about this Privacy Policy or our data practices, please contact our
        Data Protection team at{" "}
        <a href="mailto:privacy@virtualpersonal.ai" className="text-primary hover:underline">
          privacy@virtualpersonal.ai
        </a>
        .
      </LegalP>
    </LegalLayout>
  );
}
