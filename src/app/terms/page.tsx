import type { Metadata } from "next";
import { LegalLayout, LegalH2, LegalP, LegalUl } from "@/components/ui/legal-layout";

export const metadata: Metadata = {
  title: "Terms of Service — VirtualPersonal.ai",
  description:
    "Read the Terms of Service governing your use of the VirtualPersonal.ai platform and virtual assistant recruiting services.",
  alternates: { canonical: "https://virtualpersonal.ai/terms" },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="April 13, 2026">

      <LegalP>
        These Terms of Service (&quot;Terms&quot;) govern your access to and use of the
        virtualpersonal.ai platform, website, and services (collectively, the
        &quot;Service&quot;) operated by VirtualPersonal.ai (&quot;we&quot;, &quot;us&quot;, or
        &quot;our&quot;). By accessing or using our Service you agree to be bound by these Terms.
      </LegalP>

      <LegalH2>1. Acceptance of Terms</LegalH2>
      <LegalP>
        By creating an account, posting a job, or otherwise accessing the Service, you confirm that
        you are at least 18 years of age, have the legal authority to enter into this agreement, and
        accept these Terms in full. If you are using the Service on behalf of a company or other
        legal entity, you represent that you have the authority to bind that entity.
      </LegalP>

      <LegalH2>2. Description of Service</LegalH2>
      <LegalP>
        VirtualPersonal.ai is an elite virtual assistant recruiting agency that connects businesses
        with vetted virtual professionals. We are not an employer of the virtual assistants placed
        through our platform. We act as an intermediary, providing matching, vetting, and support
        services.
      </LegalP>
      <LegalUl>
        <li>Job posting and candidate discovery tools</li>
        <li>AI-powered candidate matching</li>
        <li>12-step candidate vetting and verification</li>
        <li>Onboarding support and dedicated success management</li>
        <li>Post-placement performance monitoring</li>
      </LegalUl>

      <LegalH2>3. User Obligations</LegalH2>
      <LegalP>
        As a user of the Service, you agree to:
      </LegalP>
      <LegalUl>
        <li>Provide accurate and complete information when creating your account or posting roles</li>
        <li>Treat all candidates and virtual assistants with respect and professionalism</li>
        <li>Not use the Service to engage in any unlawful, harmful, or discriminatory activity</li>
        <li>Not attempt to circumvent our platform by contacting candidates outside of our process</li>
        <li>Keep your login credentials confidential and notify us immediately of any unauthorised access</li>
      </LegalUl>

      <LegalH2>4. Payment Terms</LegalH2>
      <LegalP>
        Subscription fees are billed monthly in advance. All fees are non-refundable except where
        required by law or as outlined in our 30-day satisfaction guarantee. We reserve the right to
        modify pricing with 30 days&apos; written notice. Failure to pay may result in suspension of
        your account.
      </LegalP>

      <LegalH2>5. Placement Guarantee</LegalH2>
      <LegalP>
        We offer a replacement guarantee as outlined in your plan. If a placed virtual assistant
        does not meet the agreed performance criteria within the guarantee period, we will conduct
        a new search and placement at no additional cost. This guarantee does not apply if the
        placement was terminated due to client-side changes (e.g., role elimination, budget
        constraints).
      </LegalP>

      <LegalH2>6. Intellectual Property</LegalH2>
      <LegalP>
        All content on the Service, including text, graphics, logos, and software, is the property
        of VirtualPersonal.ai or its licensors and is protected by intellectual property laws. You
        may not reproduce, distribute, or create derivative works without our express written consent.
      </LegalP>

      <LegalH2>7. Limitation of Liability</LegalH2>
      <LegalP>
        To the fullest extent permitted by law, VirtualPersonal.ai shall not be liable for any
        indirect, incidental, special, consequential, or punitive damages arising from your use of
        the Service. Our total liability shall not exceed the fees paid by you in the three months
        preceding the claim.
      </LegalP>

      <LegalH2>8. Termination</LegalH2>
      <LegalP>
        Either party may terminate the agreement with 30 days&apos; written notice. We reserve
        the right to suspend or terminate your access immediately if you breach these Terms.
        Upon termination, your right to use the Service ceases immediately.
      </LegalP>

      <LegalH2>9. Governing Law</LegalH2>
      <LegalP>
        These Terms shall be governed by and construed in accordance with the laws of the State of
        Delaware, United States, without regard to its conflict of law provisions. Any disputes
        shall be resolved exclusively in the state or federal courts located in Delaware.
      </LegalP>

      <LegalH2>10. Changes to These Terms</LegalH2>
      <LegalP>
        We may update these Terms from time to time. We will notify you of significant changes via
        email or a prominent notice on the Service. Your continued use of the Service after changes
        take effect constitutes your acceptance of the revised Terms.
      </LegalP>

      <LegalH2>11. Contact Us</LegalH2>
      <LegalP>
        If you have questions about these Terms, please contact us at{" "}
        <a href="mailto:legal@virtualpersonal.ai" className="text-primary hover:underline">
          legal@virtualpersonal.ai
        </a>
        .
      </LegalP>
    </LegalLayout>
  );
}
