"use client";

import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const policySections = [
  {
    label: "Introduction",
    content: (
      <>
        <p>Effective Date: July 1, 2025</p>
        <p>Last Updated: July 1, 2025 </p>
        <p className="mb-4">
          Introduction Niptado ("we," "us," or "our") is committed to protecting
          your privacy and personal information. This Privacy Policy explains
          how we collect, use, share, and protect your information when you use
          our AI-powered consumer complaint management platform and related
          services (collectively, the "Services").
        </p>
        <p className="mb-4">
          By using our Services, you agree to the collection and use of
          information in accordance with this Privacy Policy. If you do not
          agree with our policies and practices, do not use our Services.
        </p>
      </>
    ),
  },
  {
    label: "Information We Collect",
    content: (
      <>
        <h3 className="font-semibold text-lg mb-2">
          Personal Information You Provide
        </h3>
        <ul className="list-disc ml-6 mb-4">
          <li>
            <strong>Account Information:</strong> Name, email address, phone
            number, location information (city, state/province, country),
            communication preferences, password and authentication credentials
          </li>
          <li>
            <strong>Complaint Information:</strong> Company details and contact
            information, complaint category and subcategory, detailed
            description, disputed amount, desired resolution, timeline and
            incident details, previous resolution attempts
          </li>
          <li>
            <strong>Supporting Evidence:</strong> Documents (receipts,
            contracts, correspondence), photos, screenshots, visual evidence,
            audio recordings (where legally permitted), video files and
            multimedia content
          </li>
          <li>
            <strong>Communication Data:</strong> Messages and correspondence
            within our platform, email communications with companies and third
            parties, social media interactions facilitated through our services,
            settlement negotiation details
          </li>
        </ul>

        <h3 className="font-semibold text-lg mb-2">
          Information Collected Automatically
        </h3>
        <ul className="list-disc ml-6 mb-4">
          <li>
            <strong>Usage Data:</strong> Pages visited, features used, time
            spent on platform, device information (IP address, browser type,
            operating system), location data (general geographic location based
            on IP address), log files and analytics data
          </li>
          <li>
            <strong>Technical Data:</strong> Cookies and similar tracking
            technologies, session information and authentication tokens, API
            usage and system performance metrics, error logs and diagnostic
            information
          </li>
        </ul>

        <h3 className="font-semibold text-lg mb-2">
          Information from Third Parties
        </h3>
        <ul className="list-disc ml-6">
          <li>
            <strong>Authentication Providers:</strong> Information from Auth0
            and social login providers (Google, Facebook), profile information
            you choose to share during social login
          </li>
          <li>
            <strong>Public Sources:</strong> Company information and executive
            contact details, publicly available corporate data for scorecard
            metrics, industry benchmarking data for compensation calculations
          </li>
          <li>
            <strong>Business Partners:</strong> Information from legal partners
            for class action cases, data from consumer advocacy organizations,
            government agency databases (where publicly accessible)
          </li>
        </ul>
      </>
    ),
  },
  {
    label: "How We Use Your Information",
    content: (
      <>
        <h3 className="font-semibold text-lg mb-2">Core Service Delivery</h3>
        <ul className="list-disc ml-6 mb-4">
          <li>
            <strong>Complaint Management:</strong>
            Process and categorize your complaints using AI/NLP analysis (you
            can review and modify all AI suggestions); generate formal complaint
            letters and documentation (you maintain full control over final
            content); route complaints to appropriate company contacts and
            departments; track complaint status and progress through our
            dashboard.
          </li>
          <li>
            <strong>AI-Powered Features:</strong>
            Sentiment analysis to optimize complaint tone and effectiveness
            (with transparency into scoring factors); compensation calculation
            based on publicly available industry standards, regulatory
            guidelines, and anonymized historical settlements; pattern
            recognition for potential class action identification (requires
            explicit opt-in consent); automated escalation recommendations (you
            control all escalation decisions).
          </li>
          <li>
            <strong>Communication Services:</strong>
            Deliver complaints via email, social media, and direct corporate
            channels; facilitate negotiations and settlement discussions; send
            status updates and notifications; enable secure messaging between
            parties.
          </li>
        </ul>

        <h3 className="font-semibold text-lg mb-2">Core Service Delivery</h3>
        <ul className="list-disc ml-6 mb-4">
          <li>
            <strong>Complaint Management:</strong> Process and categorize your
            complaints using AI/NLP analysis (you can review and modify all AI
            suggestions); generate formal complaint letters and documentation
            (you maintain full control over final content); route complaints to
            appropriate company contacts and departments; track complaint status
            and progress through our dashboard
          </li>
          <li>
            <strong>AI-Powered Features:</strong> Sentiment analysis to optimize
            complaint tone and effectiveness (with transparency into scoring
            factors); compensation calculation based on industry standards,
            regulatory guidelines, and anonymized settlements; pattern
            recognition for class action identification (requires opt-in);
            automated escalation recommendations (you control escalation
            decisions)
          </li>
          <li>
            <strong>Communication Services:</strong> Deliver complaints via
            email, social media, and corporate channels; facilitate negotiations
            and settlements; send status updates and notifications; enable
            secure messaging between parties
          </li>
        </ul>

        <h3 className="font-semibold text-lg mb-2">Platform Enhancement</h3>
        <ul className="list-disc ml-6 mb-4">
          <li>
            <strong>Analytics and Improvement:</strong> Analyze usage patterns
            to improve services; develop new features and enhance existing
            functionality; conduct research on consumer protection and complaint
            resolution; generate anonymized industry insights and reports
          </li>
          <li>
            <strong>Corporate Accountability:</strong> Compile corporate
            scorecard metrics and ratings; track response times, resolution
            rates, and customer satisfaction; publish transparency reports on
            corporate behavior; benchmark industry performance standards
          </li>
        </ul>

        <h3 className="font-semibold text-lg mb-2">Legal and Compliance</h3>
        <ul className="list-disc ml-6">
          <li>
            <strong>Class Action Support:</strong> Aggregate similar complaints
            for potential group legal actions; connect users with qualified
            legal professionals; maintain records for legal and regulatory
            purposes; support government investigations and consumer protection
            efforts
          </li>
        </ul>
      </>
    ),
  },
  {
    label: "How We Share Your Information",
    content: (
      <>
        <h3 className="font-semibold text-lg mb-2">
          Complaint Resolution Process
        </h3>
        <ul className="list-disc ml-6 mb-4">
          <li>
            <strong>Direct Company Contact:</strong>
            Share complaint details with the subject company for resolution
            (your direct contact info is protected using unique identifiers if
            requested); provide necessary contact details while offering privacy
            protection options; include supporting evidence as you choose;
            enable transparent settlement negotiations and resolution
            discussions.
          </li>
          <li>
            <strong>Company Dashboard Access:</strong>
            Companies receive a restricted dashboard showing only complaints
            against them, response tools, resolution metrics, and communication
            channels; they cannot view data from other users or organizations.
          </li>
          <li>
            <strong>Escalation Procedures:</strong>
            Forward unresolved complaints to government agencies; share with
            media for public accountability; provide data to industry groups;
            escalate to company leadership when standard channels fail.
          </li>
        </ul>

        <h3 className="font-semibold text-lg mb-2">
          Legal and Class Action Purposes
        </h3>
        <ul className="list-disc ml-6 mb-4">
          <li>
            <strong>
              Class Action Aggregation (Requires Explicit Opt-In):
            </strong>
            Identify complaint patterns for potential group legal actions (only
            with user consent); share anonymized data with qualified attorneys
            post-consent; participants can opt out anytime without affecting
            individual complaints; provide aggregated case data for legal
            research and proceedings (with consent).
          </li>
          <li>
            <strong>Legal Compliance:</strong>
            Support regulatory investigations and enforcement efforts; comply
            with subpoenas, court orders, and legal requests; assist expert
            witness preparation and case documentation; report fraud and illegal
            activity to authorities (anonymously when possible).
          </li>
        </ul>

        <h3 className="font-semibold text-lg mb-2">
          Service Providers and Partners
        </h3>
        <ul className="list-disc ml-6 mb-4">
          <li>
            <strong>Technology Partners:</strong>
            Auth0 for secure authentication; cloud providers for encrypted
            storage; AI/ML services for NLP and automation; communication
            services (email/SMS) for delivery and notifications.
          </li>
          <li>
            <strong>Business Partners:</strong>
            Consumer advocacy groups for support; legal service firms for
            referrals and class actions; industry associations for standards and
            benchmarking; research institutions for consumer rights studies.
          </li>
        </ul>

        <h3 className="font-semibold text-lg mb-2">Public Information</h3>
        <ul className="list-disc ml-6">
          <li>
            <strong>Corporate Scorecards:</strong>
            Publish anonymized performance metrics and company ratings; share
            benchmarking and transparency data; provide public access to company
            responsiveness scores; support consumer research and informed
            decisions.
          </li>
        </ul>
      </>
    ),
  },
  {
    label: "Data Security and Protection",
    content: (
      <>
        <h3 className="font-semibold text-lg mb-2">Security Measures</h3>
        <ul className="list-disc ml-6 mb-4">
          <li>
            <strong>Technical Safeguards:</strong>
            End-to-end encryption for sensitive data transmission; secure cloud
            storage with encryption at rest; multi-factor authentication and
            access controls; regular security audits and penetration testing.
          </li>
          <li>
            <strong>Operational Security:</strong>
            Staff training on data protection and privacy practices; limited
            access to personal information on a need-to-know basis; incident
            response procedures for security breaches; regular backup and
            disaster recovery protocols.
          </li>
        </ul>

        <h3 className="font-semibold text-lg mb-2">Document Security</h3>
        <ul className="list-disc ml-6">
          <li>
            <strong>Evidence Protection:</strong>
            Blockchain-verified timestamps for uploaded documents; secure cloud
            storage with redundant backups; access logging and audit trails for
            all document interactions; automated retention and deletion
            policies.
          </li>
        </ul>
      </>
    ),
  },
  {
    label: "International Data Transfers",
    content: (
      <>
        <h3 className="font-semibold text-lg mb-2">
          International Data Transfers
        </h3>
        <p className="mb-4">
          Our Services are provided globally, and your information may be
          transferred to and processed in countries other than your country of
          residence, including the United States and other jurisdictions where
          our service providers operate.
        </p>

        <h4 className="font-semibold mb-2">Transfer Safeguards:</h4>
        <ul className="list-disc ml-6 mb-4">
          <li>
            Standard Contractual Clauses (SCCs) approved by relevant authorities
          </li>
          <li>Adequacy decisions where applicable (EU-UK, EU-Canada, etc.)</li>
          <li>Additional security measures and contractual protections</li>
          <li>Regular compliance assessments and audits</li>
        </ul>

        <h4 className="font-semibold mb-2">Specific Transfer Scenarios:</h4>
        <ul className="list-disc ml-6">
          <li>
            <strong>US Processing:</strong> Data processed under EU-US Data
            Privacy Framework where applicable
          </li>
          <li>
            <strong>Cross-Border Complaints:</strong> Enhanced protections when
            complaints involve multiple jurisdictions
          </li>
          <li>
            <strong>Government Cooperation:</strong> Transfers limited to legal
            requirements and public interest
          </li>
          <li>
            <strong>Service Providers:</strong> All international service
            providers bound by equivalent privacy protections
          </li>
        </ul>
      </>
    ),
  },
  {
    label: "Data Retention and Deletion",
    content: (
      <>
        <h3 className="font-semibold text-lg mb-2">
          Retention Periods and Criteria
        </h3>

        <h4 className="font-semibold mb-1">Active Complaints:</h4>
        <ul className="list-disc ml-6 mb-4">
          <li>Full retention until complaint resolution and closure</li>
          <li>Extended retention for ongoing legal proceedings and appeals</li>
          <li>
            Minimum 3-year retention for resolved complaints to support
            potential follow-up actions
          </li>
          <li>
            Indefinite retention for complaints involving ongoing class action
            proceedings
          </li>
        </ul>

        <h4 className="font-semibold mb-1">User Accounts:</h4>
        <ul className="list-disc ml-6 mb-4">
          <li>Active retention while account remains open and in use</li>
          <li>
            90-day grace period after account deletion request (for recovery)
          </li>
          <li>
            Account reactivation data retained for 1 year after voluntary
            closure
          </li>
          <li>
            Anonymized usage patterns retained indefinitely for service
            improvement
          </li>
        </ul>

        <h4 className="font-semibold mb-1">
          Communications and Documentation:
        </h4>
        <ul className="list-disc ml-6 mb-4">
          <li>
            Email and message history retained for 7 years after complaint
            closure
          </li>
          <li>
            Legal correspondence retained indefinitely while proceedings are
            active
          </li>
          <li>
            Settlement documentation retained for 10 years after final
            resolution
          </li>
          <li>
            Evidence and supporting documents retained according to legal
            requirements
          </li>
        </ul>

        <h4 className="font-semibold mb-1">Analytics and Research Data:</h4>
        <ul className="list-disc ml-6 mb-4">
          <li>
            Anonymized analytics data retained indefinitely for research and
            trend analysis
          </li>
          <li>
            Personal identifiers removed after 18 months of account inactivity
          </li>
          <li>
            Aggregated metrics maintained for historical benchmarking and
            industry reports
          </li>
        </ul>

        <h3 className="font-semibold text-lg mb-2 mt-6">
          Automated and Manual Deletion
        </h3>

        <h4 className="font-semibold mb-1">Automatic Deletion:</h4>
        <ul className="list-disc ml-6 mb-4">
          <li>Expired session data and temporary files (24–48 hours)</li>
          <li>Outdated system logs and performance metrics (6 months)</li>
          <li>Superseded document versions and drafts (1 year)</li>
          <li>Failed login attempts and security logs (2 years)</li>
        </ul>

        <h4 className="font-semibold mb-1">User-Requested Deletion:</h4>
        <ul className="list-disc ml-6 mb-4">
          <li>Account closure and data removal upon verified request</li>
          <li>
            Granular deletion of specific complaints while maintaining others
          </li>
          <li>
            Right to be forgotten implementation (with legal proceeding
            exceptions)
          </li>
          <li>
            Anonymization of data for ongoing research purposes where deletion
            would impair public interest
          </li>
        </ul>

        <h4 className="font-semibold mb-1">Legal Hold Exceptions:</h4>
        <ul className="list-disc ml-6 mb-4">
          <li>
            Data subject to active legal proceedings cannot be deleted until
            resolution
          </li>
          <li>
            Regulatory investigations may require retention beyond normal
            periods
          </li>
          <li>
            Public interest research may justify anonymized retention of certain
            datasets
          </li>
          <li>
            Fraud prevention databases may maintain certain identifiers for
            security purposes
          </li>
        </ul>
      </>
    ),
  },
  {
    label: "Your Privacy Rights and Consent Management",
    content: (
      <>
        <h4 className="font-semibold mb-2">Granular Consent Controls</h4>
        <ul className="list-disc ml-6 mb-4">
          <li>
            <strong>Basic Complaint Services:</strong> Required for core
            platform functionality
          </li>
          <li>
            <strong>AI Enhancement Features:</strong> Optional consent for
            AI-powered suggestions and optimization
          </li>
          <li>
            <strong>Class Action Participation:</strong> Separate explicit
            opt-in required
          </li>
          <li>
            <strong>Marketing Communications:</strong> Independent consent for
            promotional emails and updates
          </li>
          <li>
            <strong>Public Scorecard Contribution:</strong> Optional
            contribution to anonymized public metrics
          </li>
        </ul>

        <h5 className="font-medium mb-2">Communication Preferences:</h5>
        <ul className="list-disc ml-6 mb-6">
          <li>
            Email notifications (complaint updates, resolution status, system
            alerts)
          </li>
          <li>SMS notifications (urgent updates, security alerts)</li>
          <li>Push notifications (real-time updates, response alerts)</li>
          <li>
            Third-party communications (legal partners, government agencies)
          </li>
        </ul>

        <h4 className="font-semibold mb-2">Access and Control</h4>
        <ul className="list-disc ml-6 mb-4">
          <li>
            Access, update, and correct your personal information through your
            dashboard
          </li>
          <li>
            Download your complete complaint history and communications in
            standard formats
          </li>
          <li>Manage communication preferences with granular controls</li>
          <li>
            Control public visibility of your activities and contributions
          </li>
        </ul>

        <h5 className="font-medium mb-2">Real-Time Privacy Controls:</h5>
        <ul className="list-disc ml-6 mb-6">
          <li>
            Modify consent preferences at any time through your account settings
          </li>
          <li>
            View detailed logs of how your information has been used and shared
          </li>
          <li>
            Receive notifications before any new data sharing or processing
            activities
          </li>
          <li>Export or delete specific complaints while maintaining others</li>
        </ul>

        <h4 className="font-semibold mb-2">Data Portability</h4>
        <ul className="list-disc ml-6 mb-4">
          <li>
            Export your complaint data in standard formats (JSON, CSV, PDF)
          </li>
          <li>
            Transfer information to other service providers or legal
            representatives
          </li>
          <li>Receive copies of all communications and documentation</li>
          <li>Download complete audit logs of your account activity</li>
        </ul>

        <h4 className="font-semibold mb-2">Regional Privacy Rights</h4>

        <h5 className="font-medium mb-1">For Users in the European Union:</h5>
        <ul className="list-disc ml-6 mb-4">
          <li>
            Right of access to your personal data with detailed processing
            information
          </li>
          <li>
            Right to rectification of inaccurate information with audit trails
          </li>
          <li>
            Right to erasure ("right to be forgotten") with exceptions for legal
            proceedings
          </li>
          <li>
            Right to restrict or object to processing with granular controls
          </li>
          <li>Right to data portability in machine-readable formats</li>
          <li>Right to withdraw consent without affecting other services</li>
          <li>Right to lodge complaints with supervisory authorities</li>
        </ul>

        <h5 className="font-medium mb-1">
          For Users in California (CCPA/CPRA):
        </h5>
        <ul className="list-disc ml-6 mb-4">
          <li>
            Right to know what personal information is collected, used, shared,
            or sold
          </li>
          <li>
            Right to delete personal information with specific exceptions for
            legal compliance
          </li>
          <li>Right to opt-out of sale or sharing of personal information</li>
          <li>Right to correct inaccurate personal information</li>
          <li>Right to limit use of sensitive personal information</li>
          <li>Right to non-discrimination for exercising privacy rights</li>
        </ul>

        <h5 className="font-medium mb-1">For Users in Other Jurisdictions:</h5>
        <ul className="list-disc ml-6 mb-6">
          <li>
            Rights as provided under applicable local privacy laws (Canada
            PIPEDA, UK GDPR, etc.)
          </li>
          <li>Compliance with emerging privacy regulations</li>
          <li>Proactive implementation of privacy-by-design principles</li>
        </ul>
      </>
    ),
  },
  {
    label: "Cookies and Tracking Technologies",
    content: (
      <>
        <h4 className="font-semibold mb-2">Types of Cookies We Use</h4>

        <ul className="list-disc ml-6 mb-4">
          <li>
            <strong>Essential Cookies:</strong>
            <ul className="list-disc ml-6 mt-1">
              <li>Authentication and session management</li>
              <li>Security and fraud prevention</li>
              <li>Basic platform functionality and user preferences</li>
            </ul>
          </li>
          <li>
            <strong>Analytics Cookies:</strong>
            <ul className="list-disc ml-6 mt-1">
              <li>Usage statistics and performance monitoring (anonymized)</li>
              <li>Feature effectiveness and user experience analysis</li>
              <li>Platform optimization and improvement</li>
              <li>A/B testing for service enhancements</li>
            </ul>
          </li>
          <li>
            <strong>Preference Cookies:</strong>
            <ul className="list-disc ml-6 mt-1">
              <li>User settings and customization</li>
              <li>Language and region preferences</li>
              <li>Dashboard configuration and layout</li>
              <li>Accessibility settings and accommodations</li>
            </ul>
          </li>
          <li>
            <strong>Functional Cookies:</strong>
            <ul className="list-disc ml-6 mt-1">
              <li>AI model personalization (with consent)</li>
              <li>Complaint drafting assistance preferences</li>
              <li>Communication delivery preferences</li>
              <li>Integration with third-party services</li>
            </ul>
          </li>
        </ul>

        <h4 className="font-semibold mb-2">
          Cookie Management and Consent
        </h4>

        <ul className="list-disc ml-6 mb-4">
          <li>
            <strong>Granular Cookie Controls:</strong>
            <ul className="list-disc ml-6 mt-1">
              <li>
                Accept or reject different categories of cookies independently
              </li>
              <li>
                Modify cookie preferences at any time through our cookie center
              </li>
              <li>
                Receive clear information about each cookie's purpose and
                duration
              </li>
              <li>
                Understand the impact of disabling specific cookie categories
              </li>
            </ul>
          </li>
          <li>
            <strong>Browser Controls:</strong>
            <ul className="list-disc ml-6 mt-1">
              <li>Set browser-level cookie preferences and restrictions</li>
              <li>Use private/incognito browsing modes</li>
              <li>Install cookie management extensions and tools</li>
              <li>Clear existing cookies and reset preferences</li>
            </ul>
          </li>
        </ul>

        <p className="text-sm text-gray-500 italic">
          Note: Disabling essential cookies may limit core platform
          functionality, while disabling other cookies may reduce
          personalization and analytics capabilities.
        </p>
      </>
    ),
  },
  {
    label: "Third-Party Services and Integration",
    content: (
      <>
        <h4 className="font-semibold mb-2">Core Service Providers:</h4>
        <ul className="list-disc ml-6 mb-4">
          <li>
            <strong>Authentication:</strong> Auth0 (identity verification and
            secure login)
          </li>
          <li>
            <strong>Cloud Infrastructure:</strong> [Cloud Provider] (secure data
            storage and processing)
          </li>
          <li>
            <strong>Email Services:</strong> AWS SES (complaint delivery and
            notifications)
          </li>
          <li>
            <strong>SMS Gateway:</strong> [SMS Provider] (urgent notifications
            and two-factor authentication)
          </li>
        </ul>

        <h4 className="font-semibold mb-2">AI and Analytics:</h4>
        <ul className="list-disc ml-6 mb-4">
          <li>
            <strong>Natural Language Processing:</strong> [AI Provider]
            (complaint analysis and sentiment scoring)
          </li>
          <li>
            <strong>Analytics Platform:</strong> [Analytics Provider] (usage
            statistics and performance monitoring)
          </li>
          <li>
            <strong>Compensation Data:</strong> [Legal Database Provider]
            (industry benchmarking and settlement data)
          </li>
        </ul>

        <h4 className="font-semibold mb-2">Communication and Integration:</h4>
        <ul className="list-disc ml-6 mb-4">
          <li>
            <strong>Social Media APIs:</strong> Facebook, Twitter (for complaint
            delivery and escalation)
          </li>
          <li>
            <strong>Government Databases:</strong> [Agency APIs] (for regulatory
            compliance and reporting)
          </li>
          <li>
            <strong>Legal Networks:</strong> [Legal Platform] (for class action
            coordination and referrals)
          </li>
        </ul>

        <h4 className="font-semibold mb-2">Data Processing Agreements:</h4>
        <ul className="list-disc ml-6 mb-4">
          <li>
            All third-party providers sign comprehensive Data Processing
            Agreements (DPAs)
          </li>
          <li>
            Contractual requirements for GDPR, CCPA, and other privacy law
            compliance
          </li>
          <li>
            Regular audits and security assessments of third-party providers
          </li>
          <li>
            Incident response coordination and breach notification procedures
          </li>
        </ul>

        <p className="mb-4">
          We recommend reviewing these third-party privacy policies to
          understand how your information is handled by these services. We
          maintain an updated list of all third-party processors in our{" "}
          <span className="underline">[Data Processing Registry]</span>.
        </p>
      </>
    ),
  },

  {
    label: "Children's Privacy and Age Restrictions",
    content: (
      <>
        <h4 className="font-semibold mb-2">
          Age Eligibility and Restrictions:
        </h4>
        <ul className="list-disc ml-6 mb-4">
          <li>Our services are intended for adult users aged 18 and above</li>
          <li>
            We do not knowingly collect personal information from individuals
            under 18
          </li>
          <li>
            Account creation requires users to confirm they are at least 18
            years old
          </li>
          <li>
            We reserve the right to delete accounts if we identify underage
            users
          </li>
        </ul>

        <h4 className="font-semibold mb-2">Parental Rights and Remediation:</h4>
        <ul className="list-disc ml-6 mb-4">
          <li>
            Parents or legal guardians may request deletion of a child's data
          </li>
          <li>
            All such requests should be sent to{" "}
            <a
              href="mailto:privacy@niptado.com"
              className="text-blue-500 underline"
            >
              privacy@niptado.com
            </a>
          </li>
        </ul>

        <h4 className="font-semibold mb-2">Special Protections for Minors:</h4>
        <ul className="list-disc ml-6">
          <li>
            Enhanced safeguards applied to any data inadvertently collected from
            minors
          </li>
          <li>
            Immediate deletion procedures upon discovery of underage users
          </li>
          <li>
            No targeted marketing or promotional messages are sent to users
            under 18
          </li>
        </ul>
      </>
    ),
  },

  {
    label: "Changes to This Privacy Policy",
    content: (
      <>
        <h4 className="font-semibold mb-2">Update Process</h4>
        <ul className="list-disc ml-6 mb-4">
          <li>
            <strong>Notification Methods:</strong>
          </li>
          <ul className="list-disc ml-6">
            <li>
              Email notification to all registered users for material changes
            </li>
            <li>Prominent banner notice on our platform for 30 days</li>
            <li>
              Updated effective date and change summary at the top of this
              policy
            </li>
            <li>
              Optional SMS notifications for significant privacy-related changes
            </li>
          </ul>
          <li>
            <strong>Types of Changes:</strong>
          </li>
          <ul className="list-disc ml-6">
            <li>
              <strong>Material Changes:</strong> Require 30-day advance notice
              and may require renewed consent
            </li>
            <li>
              <strong>Minor Updates:</strong> Technical corrections, contact
              information, clarifications
            </li>
            <li>
              <strong>Legal Changes:</strong> Updates required by new laws or
              regulations
            </li>
            <li>
              <strong>Service Changes:</strong> New features or services that
              affect data processing
            </li>
          </ul>
        </ul>

        <h4 className="font-semibold mb-2">
          Continued Use and Acceptance
        </h4>
        <ul className="list-disc ml-6 mb-4">
          <li>
            Your continued use of our Services after changes become effective
            constitutes acceptance of the updated Privacy Policy
          </li>
          <li>
            For material changes that significantly impact your privacy rights,
            we may require explicit re-consent before processing your
            information under the new terms
          </li>
        </ul>

        <h4 className="font-semibold mb-2">Opt-Out Rights:</h4>
        <ul className="list-disc ml-6">
          <li>
            You may close your account if you disagree with material policy
            changes
          </li>
          <li>
            We will honor any withdrawal of consent for specific processing
            activities
          </li>
          <li>
            You retain all rights to your data even if you choose to discontinue
            service
          </li>
        </ul>
      </>
    ),
  },

  {
    label: "Contact Information and Data Protection Officer",
    content: (
      <>
        <h3 className="text-lg font-semibold mt-6 mb-2">
          Contact and Enforcement
        </h3>

        <h4 className="font-semibold mb-2">
          Privacy Inquiries and General Questions
        </h4>
        <ul className="list-disc ml-6 mb-4">
          <li>
            <strong>Primary Contact:</strong>
          </li>
          <ul className="list-disc ml-6">
            <li>
              Email:{" "}
              <a
                href="mailto:privacy@niptado.com"
                className="text-blue-500 underline"
              >
                privacy@niptado.com
              </a>
            </li>
            <li>Response Time: Within 5 business days for general inquiries</li>
            <li>Mailing Address: [Company Address]</li>
            <li>Phone: [Privacy Hotline] (for urgent privacy matters)</li>
          </ul>
          <li>
            <strong>Data Protection Officer:</strong>
          </li>
          <ul className="list-disc ml-6">
            <li>
              Email:{" "}
              <a
                href="mailto:dpo@niptado.com"
                className="text-blue-500 underline"
              >
                dpo@niptado.com
              </a>
            </li>
            <li>Direct Line: [DPO Phone Number]</li>
            <li>
              Specialized in: GDPR compliance, international privacy laws,
              complex data requests
            </li>
          </ul>
        </ul>

        <h4 className="font-semibold mb-2">
          Data Subject Rights and Requests
        </h4>
        <ul className="list-disc ml-6 mb-4">
          <li>
            <strong>Online Self-Service Portal:</strong>
          </li>
          <ul className="list-disc ml-6">
            <li>URL: [Privacy Request Portal]</li>
            <li>
              Available 24/7 for: Account access, data downloads, preference
              changes
            </li>
            <li>
              Automated Processing: Most requests processed within 24 hours
            </li>
          </ul>
          <li>
            <strong>Complex Requests:</strong>
          </li>
          <ul className="list-disc ml-6">
            <li>
              Email:{" "}
              <a
                href="mailto:privacy-requests@niptado.com"
                className="text-blue-500 underline"
              >
                privacy-requests@niptado.com
              </a>
            </li>
            <li>
              Required Information: Account verification, specific request
              details, preferred response method
            </li>
            <li>
              Response Time: Within 30 days (may extend to 60 days for complex
              requests)
            </li>
            <li>
              Follow-up: Regular status updates for requests taking longer than
              15 days
            </li>
          </ul>
        </ul>

        <h4 className="font-semibold mb-2">
          Privacy Complaints and Dispute Resolution
        </h4>
        <ul className="list-disc ml-6 mb-4">
          <li>
            <strong>Internal Review Process:</strong>
          </li>
          <ul className="list-disc ml-6">
            <li>
              Initial Contact: Submit complaint to{" "}
              <a
                href="mailto:privacy@niptado.com"
                className="text-blue-500 underline"
              >
                privacy@niptado.com
              </a>
            </li>
            <li>Investigation: 15-day internal review period</li>
            <li>
              Resolution: Written response with corrective actions if needed
            </li>
            <li>Appeal: Option to escalate to senior privacy team</li>
          </ul>
          <li>
            <strong>External Dispute Resolution:</strong>
          </li>
          <ul className="list-disc ml-6">
            <li>
              <strong>EU Users:</strong> Contact your local Data Protection
              Authority
            </li>
            <li>
              <strong>UK Users:</strong> Information Commissioner's Office (ICO)
            </li>
            <li>
              <strong>California Users:</strong> California Privacy Protection
              Agency
            </li>
            <li>
              <strong>Other Jurisdictions:</strong> [List relevant authorities
              by region]
            </li>
          </ul>
          <li>
            <strong>Independent Mediation:</strong>
          </li>
          <ul className="list-disc ml-6">
            <li>Service: [Third-party privacy dispute resolution service]</li>
            <li>Cost: Free for consumers</li>
            <li>Timeline: 60-day resolution target</li>
          </ul>
        </ul>
      </>
    ),
  },

  {
    label: "Legal Basis for Processing and Compliance",
    content: (
      <>
        <h4 className="font-semibold mb-2">
          Legal Bases for Processing (GDPR)
        </h4>{" "}
        <ul className="list-disc ml-6 mb-4">
          {" "}
          <li>
            <strong>Consent (Article 6(1)(a)):</strong>
          </li>{" "}
          <ul className="list-disc ml-6">
            {" "}
            <li>Class action participation and aggregation</li>{" "}
            <li>Marketing communications and promotional content</li>{" "}
            <li>Optional AI enhancement features</li>{" "}
            <li>Specific third-party data sharing activities</li>{" "}
          </ul>{" "}
          <li>
            <strong>Contract Performance (Article 6(1)(b)):</strong>
          </li>{" "}
          <ul className="list-disc ml-6">
            {" "}
            <li>Core complaint management services</li>{" "}
            <li>User account creation and management</li>{" "}
            <li>Basic communication and notification services</li>{" "}
            <li>Standard complaint delivery and tracking</li>{" "}
          </ul>{" "}
          <li>
            <strong>Legitimate Interests (Article 6(1)(f)):</strong>
          </li>{" "}
          <ul className="list-disc ml-6">
            {" "}
            <li>Platform security and fraud prevention</li>{" "}
            <li>Service improvement and analytics (anonymized)</li>{" "}
            <li>Corporate accountability and public scorecard publication</li>{" "}
            <li>Research and development for consumer protection</li>{" "}
          </ul>{" "}
          <li>
            <strong>Legal Obligation (Article 6(1)(c)):</strong>
          </li>{" "}
          <ul className="list-disc ml-6">
            {" "}
            <li>Compliance with court orders and subpoenas</li>{" "}
            <li>Regulatory reporting requirements</li>{" "}
            <li>Anti-money laundering and fraud prevention</li>{" "}
            <li>Record retention for legal proceedings</li>{" "}
          </ul>{" "}
          <li>
            <strong>Public Interest (Article 6(1)(e)):</strong>
          </li>{" "}
          <ul className="list-disc ml-6">
            {" "}
            <li>Consumer protection advocacy and transparency</li>{" "}
            <li>Corporate accountability and public oversight</li>{" "}
            <li>Government agency cooperation for regulatory enforcement</li>{" "}
          </ul>{" "}
        </ul>{" "}
        <h4 className="font-semibold mb-2"> Special Category Data</h4>{" "}
        <ul className="list-disc ml-6 mb-4">
          {" "}
          <li>
            <strong>Explicit Consent (Article 9(2)(a)):</strong>
          </li>{" "}
          <ul className="list-disc ml-6">
            {" "}
            <li>
              Financial hardship information in compensation calculations
            </li>{" "}
            <li>Health-related impacts in complaint descriptions</li>{" "}
          </ul>{" "}
          <li>
            <strong>Legal Claims (Article 9(2)(f)):</strong>
          </li>{" "}
          <ul className="list-disc ml-6">
            {" "}
            <li>
              Information necessary for legal proceedings and dispute resolution
            </li>{" "}
          </ul>{" "}
          <li>
            <strong>Public Interest (Article 9(2)(g)):</strong>
          </li>{" "}
          <ul className="list-disc ml-6">
            {" "}
            <li>
              Consumer protection activities and regulatory compliance
            </li>{" "}
          </ul>{" "}
        </ul>
      </>
    ),
  },

  {
    label: "Specific Privacy Considerations for Niptado Services",
    content: (
      <>
        <h4 className="font-semibold mb-2">
          AI Decision-Making and Transparency
        </h4>
        <ul className="list-disc ml-6 mb-4">
          <li>
            <strong>Automated Processing:</strong>
          </li>
          <ul className="list-disc ml-6 mb-2">
            <li>
              AI suggestions for complaint improvement are recommendations only
            </li>
            <li>
              Users maintain full control over final complaint content and
              decisions
            </li>
            <li>
              No purely automated decision-making that significantly affects
              users
            </li>
            <li>Right to human review of any AI-generated recommendations</li>
          </ul>
          <li>
            <strong>Algorithm Transparency:</strong>
          </li>
          <ul className="list-disc ml-6">
            <li>
              General explanation of AI models and decision factors available in
              our{" "}
              <a href="#" className="underline">
                AI Transparency Report
              </a>
            </li>
            <li>
              Users can request specific information about how their data was
              processed
            </li>
            <li>Regular audits for bias and fairness in AI systems</li>
            <li>Opt-out available for all AI-enhanced features</li>
          </ul>
        </ul>

        <h4 className="font-semibold mb-2">
          Cross-Border Complaints and Jurisdiction
        </h4>
        <ul className="list-disc ml-6 mb-4">
          <li>
            <strong>International Complaints:</strong>
          </li>
          <ul className="list-disc ml-6 mb-2">
            <li>
              Information may be shared with companies and regulatory
              authorities in multiple jurisdictions
            </li>
            <li>
              Different privacy laws may apply depending on company and user
              locations
            </li>
            <li>
              We apply the highest privacy standards across all jurisdictions
            </li>
            <li>
              Users are informed when their complaints involve cross-border data
              transfers
            </li>
          </ul>
          <li>
            <strong>Regulatory Coordination:</strong>
          </li>
          <ul className="list-disc ml-6">
            <li>Cooperation with international consumer protection agencies</li>
            <li>Harmonized privacy practices across different legal systems</li>
            <li>
              Specialized procedures for complaints involving EU companies (GDPR
              compliance)
            </li>
            <li>
              Enhanced protections for users in jurisdictions with strong
              privacy laws
            </li>
          </ul>
        </ul>

        <h4 className="font-semibold mb-2">
           Public Interest and Transparency
        </h4>
        <ul className="list-disc ml-6 mb-4">
          <li>
            <strong>Corporate Accountability:</strong>
          </li>
          <ul className="list-disc ml-6 mb-2">
            <li>
              Public scorecard data uses aggregated, anonymized information only
            </li>
            <li>Individual complaints are never publicly identifiable</li>
            <li>
              Companies cannot identify specific complainants from public
              metrics
            </li>
            <li>Statistical disclosure controls prevent re-identification</li>
          </ul>
          <li>
            <strong>Research and Advocacy:</strong>
          </li>
          <ul className="list-disc ml-6">
            <li>Anonymized data used for consumer protection research</li>
            <li>Academic partnerships for consumer rights advancement</li>
            <li>Policy advocacy based on anonymized trend analysis</li>
            <li>No commercial sale of consumer data for marketing purposes</li>
          </ul>
        </ul>
      </>
    ),
  },

  {
    label: "Effective Date and Document History",
    content: (
      <>
        <h4 className="font-semibold mb-2">
          Versioning and Accessibility
        </h4>
        <ul className="list-disc ml-6 mb-4">
          <li>
            <strong>Current Version:</strong> 1.0
          </li>
          <li>
            <strong>Effective Date:</strong> July 1, 2025
          </li>
          <li>
            <strong>Last Reviewed:</strong> July 1, 2025
          </li>
          <li>
            <strong>Next Scheduled Review:</strong> [July 1, 2025 + 12 months]
          </li>
          <li>
            <strong>Document History:</strong>
          </li>
          <ul className="list-disc ml-6 mb-2">
            <li>
              Version 1.0 – Initial privacy policy for Niptado platform launch
            </li>
            <li>[Future versions will be listed here with change summaries]</li>
          </ul>
          <li>
            <strong>Accessibility:</strong>
          </li>
          <ul className="list-disc ml-6 mb-2">
            <li>
              Standard Web Version – Optimized for screen readers and
              accessibility tools
            </li>
            <li>
              PDF Download – Available for offline review and record-keeping
            </li>
            <li>
              Plain Language Summary – Simplified version highlighting key
              points
            </li>
            <li>
              Translation Services – Available in [list of languages] upon
              request
            </li>
          </ul>
        </ul>

        <h4 className="font-semibold mb-2">Acknowledgment and Contact</h4>
        <ul className="list-disc ml-6 mb-4">
          <li>
            By using Niptado's Services, you acknowledge that you have read,
            understood, and agree to this Privacy Policy.
          </li>
          <li>
            If you do not agree with any part of this policy, please refrain
            from using our Services.
          </li>
          <li>
            For questions, concerns, or requests, contact our Data Protection
            Officer at{" "}
            <a
              href="mailto:dpo@niptado.com"
              className="text-blue-500 underline"
            >
              dpo@niptado.com
            </a>{" "}
            or use our{" "}
            <span className="text-blue-500 underline">
              Privacy Request Portal
            </span>{" "}
            for immediate assistance.
          </li>
        </ul>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center px-4 py-12">
      <div className="max-w-5xl w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-12 shadow-lg">
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-8 flex items-center text-white/70 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
          Niptado Privacy Policy
        </h1>
        {/* Tab nav */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {policySections.map((section, i) => (
            <button
              key={section.label}
              className={`px-4 py-2 rounded-2xl font-semibold text-sm transition-all duration-200 ${
                activeTab === i
                  ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow"
                  : "bg-white/10 text-white/80 hover:bg-white/20"
              }`}
              onClick={() => setActiveTab(i)}
            >
              {section.label}
            </button>
          ))}
        </div>
        {/* Tab content */}
        <div className="text-white/80 text-base space-y-4 pb-4 px-1">
          {policySections[activeTab].content}
        </div>
      </div>
      <footer className="w-full text-center mt-8 text-white/60 text-sm">
        &copy; {new Date().getFullYear()} Niptado. All rights reserved.
      </footer>
    </div>
  );
}
