import type { Metadata } from "next";
import { LegalLayout, LegalH2, LegalP, LegalUl } from "@/components/ui/legal-layout";

export const metadata: Metadata = {
  title: "Cookie Policy — VirtualPersonal.ai",
  description:
    "Learn about the cookies VirtualPersonal.ai uses on our virtual assistant recruiting platform, why we use them, and how you can control them.",
  alternates: { canonical: "https://virtualpersonal.ai/cookies" },
  robots: { index: false, follow: true },
};

export default function CookiesPage() {
  return (
    <LegalLayout title="Cookie Policy" lastUpdated="April 13, 2026">

      <LegalP>
        This Cookie Policy explains how VirtualPersonal.ai (&quot;we&quot;, &quot;us&quot;, or
        &quot;our&quot;) uses cookies and similar tracking technologies on our website and platform.
        By using our Service, you consent to the use of cookies as described in this policy.
      </LegalP>

      <LegalH2>1. What Are Cookies?</LegalH2>
      <LegalP>
        Cookies are small text files that are placed on your device when you visit a website. They
        are widely used to make websites work efficiently, to provide analytics data to site owners,
        and to deliver personalised advertising. Cookies can be &quot;session&quot; cookies (deleted
        when you close your browser) or &quot;persistent&quot; cookies (remain on your device for a
        set period or until manually deleted).
      </LegalP>

      <LegalH2>2. Types of Cookies We Use</LegalH2>

      <LegalP>
        <strong className="text-neutral-800">Essential Cookies</strong>
      </LegalP>
      <LegalP>
        These cookies are strictly necessary for the Service to function. They cannot be switched
        off. They include cookies that remember your login session, maintain your preferences, and
        enable security features.
      </LegalP>
      <LegalUl>
        <li>Session authentication cookies</li>
        <li>CSRF protection tokens</li>
        <li>Load-balancing cookies</li>
      </LegalUl>

      <LegalP>
        <strong className="text-neutral-800">Analytics Cookies</strong>
      </LegalP>
      <LegalP>
        These cookies help us understand how visitors use our Service so we can improve the
        experience. All data collected is aggregated and anonymous.
      </LegalP>
      <LegalUl>
        <li>Page view and session duration tracking</li>
        <li>Feature usage analytics</li>
        <li>Error reporting and performance monitoring</li>
      </LegalUl>

      <LegalP>
        <strong className="text-neutral-800">Functional Cookies</strong>
      </LegalP>
      <LegalP>
        These cookies enable enhanced functionality and personalisation, such as remembering your
        preferences and providing a more tailored experience.
      </LegalP>
      <LegalUl>
        <li>Language and region preferences</li>
        <li>Display and accessibility settings</li>
        <li>Recently viewed roles and saved searches</li>
      </LegalUl>

      <LegalP>
        <strong className="text-neutral-800">Marketing Cookies</strong>
      </LegalP>
      <LegalP>
        These cookies may be set through our site by our advertising partners to build a profile of
        your interests and show you relevant content on other sites.
      </LegalP>
      <LegalUl>
        <li>Retargeting and remarketing pixels</li>
        <li>Social media sharing buttons</li>
        <li>Conversion tracking for paid campaigns</li>
      </LegalUl>

      <LegalH2>3. Managing Your Cookie Preferences</LegalH2>
      <LegalP>
        You can control and manage cookies in several ways:
      </LegalP>
      <LegalUl>
        <li>
          <strong>Browser settings:</strong> Most browsers allow you to block or delete cookies
          through their settings. Refer to your browser&apos;s help documentation for instructions.
        </li>
        <li>
          <strong>Opt-out tools:</strong> You can opt out of analytics cookies via the Google
          Analytics opt-out browser add-on.
        </li>
        <li>
          <strong>Our cookie banner:</strong> When you first visit, you can choose which categories
          of cookies to accept via our consent banner.
        </li>
      </LegalUl>
      <LegalP>
        Please note that disabling certain cookies may affect the functionality of our Service.
        Essential cookies cannot be disabled as they are required for the platform to operate.
      </LegalP>

      <LegalH2>4. Third-Party Cookies</LegalH2>
      <LegalP>
        Some cookies on our platform are set by third-party services we use to deliver our Service.
        These include:
      </LegalP>
      <LegalUl>
        <li>Stripe (payment processing)</li>
        <li>Vercel Analytics (performance monitoring)</li>
        <li>Cloudinary (media delivery)</li>
        <li>Intercom or similar (customer support chat)</li>
      </LegalUl>
      <LegalP>
        These third parties have their own privacy and cookie policies. We encourage you to review
        them for more information about how they use cookies.
      </LegalP>

      <LegalH2>5. Updates to This Policy</LegalH2>
      <LegalP>
        We may update this Cookie Policy from time to time to reflect changes in technology,
        legislation, or our data practices. We will notify you of significant changes through our
        website or by email. The &quot;Last updated&quot; date at the top of this page indicates
        when this policy was last revised.
      </LegalP>

      <LegalH2>6. Contact Us</LegalH2>
      <LegalP>
        If you have questions about our use of cookies, please contact us at{" "}
        <a href="mailto:privacy@virtualpersonal.ai" className="text-primary hover:underline">
          privacy@virtualpersonal.ai
        </a>
        .
      </LegalP>
    </LegalLayout>
  );
}
