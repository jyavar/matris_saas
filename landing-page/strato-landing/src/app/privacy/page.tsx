import { Shield } from 'lucide-react'

import Header from '@/components/Header'

export default function PrivacyPage() {
  const lastUpdated = 'July 8, 2025'

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Shield className="w-16 h-16 text-blue-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Last updated: {lastUpdated}
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We are committed to protecting your privacy and ensuring the
            security of your personal information.
          </p>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
            {/* Introduction */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                1. Introduction
              </h2>
              <p className="text-gray-600 mb-4">
                STRATO (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;)
                operates the STRATO Core OS™ platform. This Privacy Policy
                explains how we collect, use, disclose, and safeguard your
                information when you use our Service.
              </p>
              <p className="text-gray-600 mb-4">
                By using our Service, you agree to the collection and use of
                information in accordance with this policy.
              </p>
            </div>

            {/* Information We Collect */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                2. Information We Collect
              </h2>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                2.1 Personal Information
              </h3>
              <p className="text-gray-600 mb-4">
                We may collect personal information that you voluntarily provide
                to us, including:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-6">
                <li>Name and email address when you create an account</li>
                <li>Payment information for subscription services</li>
                <li>Profile information and preferences</li>
                <li>Communication preferences and marketing consent</li>
                <li>Feedback, comments, and support requests</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                2.2 Usage Information
              </h3>
              <p className="text-gray-600 mb-4">
                We automatically collect certain information about your use of
                our Service:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-6">
                <li>Log data (IP address, browser type, pages visited)</li>
                <li>Device information (operating system, device type)</li>
                <li>Usage patterns and feature interactions</li>
                <li>Performance data and error reports</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                2.3 AI and Analytics Data
              </h3>
              <p className="text-gray-600 mb-4">
                Our AI-powered features may collect:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Code analysis and quality metrics</li>
                <li>Development workflow patterns</li>
                <li>Agent interaction data (anonymized)</li>
                <li>Performance optimization insights</li>
              </ul>
            </div>

            {/* How We Use Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                3. How We Use Your Information
              </h2>
              <p className="text-gray-600 mb-4">
                We use the collected information for various purposes:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-6">
                <li>Provide, maintain, and improve our Service</li>
                <li>Process transactions and manage subscriptions</li>
                <li>Send you technical notices and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Monitor and analyze usage patterns and trends</li>
                <li>Develop new features and functionality</li>
                <li>Ensure security and prevent fraud</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>

            {/* Information Sharing */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                4. Information Sharing and Disclosure
              </h2>
              <p className="text-gray-600 mb-4">
                We do not sell, trade, or rent your personal information to
                third parties. We may share your information in the following
                circumstances:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-6">
                <li>
                  <strong>Service Providers:</strong> With trusted third-party
                  service providers who assist us in operating our Service
                </li>
                <li>
                  <strong>Legal Requirements:</strong> When required by law or
                  to protect our rights and safety
                </li>
                <li>
                  <strong>Business Transfers:</strong> In connection with a
                  merger, acquisition, or sale of assets
                </li>
                <li>
                  <strong>Consent:</strong> With your explicit consent for
                  specific purposes
                </li>
              </ul>
            </div>

            {/* Data Security */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                5. Data Security
              </h2>
              <p className="text-gray-600 mb-4">
                We implement appropriate technical and organizational security
                measures to protect your personal information:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-6">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and authentication measures</li>
                <li>Secure data centers and infrastructure</li>
                <li>Employee training on data protection</li>
              </ul>
              <p className="text-gray-600 mb-4">
                However, no method of transmission over the internet is 100%
                secure, and we cannot guarantee absolute security.
              </p>
            </div>

            {/* Data Retention */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                6. Data Retention
              </h2>
              <p className="text-gray-600 mb-4">
                We retain your personal information for as long as necessary to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-6">
                <li>Provide our Service to you</li>
                <li>Comply with legal obligations</li>
                <li>Resolve disputes and enforce agreements</li>
                <li>Improve our Service and user experience</li>
              </ul>
              <p className="text-gray-600 mb-4">
                When we no longer need your information, we will securely delete
                or anonymize it.
              </p>
            </div>

            {/* Your Rights */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                7. Your Rights and Choices
              </h2>
              <p className="text-gray-600 mb-4">
                You have certain rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-6">
                <li>
                  <strong>Access:</strong> Request a copy of your personal
                  information
                </li>
                <li>
                  <strong>Correction:</strong> Update or correct inaccurate
                  information
                </li>
                <li>
                  <strong>Deletion:</strong> Request deletion of your personal
                  information
                </li>
                <li>
                  <strong>Portability:</strong> Request transfer of your data to
                  another service
                </li>
                <li>
                  <strong>Objection:</strong> Object to certain processing
                  activities
                </li>
                <li>
                  <strong>Withdrawal:</strong> Withdraw consent where applicable
                </li>
              </ul>
              <p className="text-gray-600 mb-4">
                To exercise these rights, please contact us using the
                information provided below.
              </p>
            </div>

            {/* Cookies and Tracking */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                8. Cookies and Tracking Technologies
              </h2>
              <p className="text-gray-600 mb-4">
                We use cookies and similar tracking technologies to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-6">
                <li>Remember your preferences and settings</li>
                <li>Analyze how you use our Service</li>
                <li>Provide personalized content and features</li>
                <li>Improve our Service performance</li>
              </ul>
              <p className="text-gray-600 mb-4">
                You can control cookie settings through your browser
                preferences, though disabling cookies may affect Service
                functionality.
              </p>
            </div>

            {/* Third-Party Services */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                9. Third-Party Services
              </h2>
              <p className="text-gray-600 mb-4">
                Our Service may contain links to third-party websites or
                integrate with third-party services. We are not responsible for
                the privacy practices of these third parties. We encourage you
                to review their privacy policies.
              </p>
            </div>

            {/* International Transfers */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                10. International Data Transfers
              </h2>
              <p className="text-gray-600 mb-4">
                Your information may be transferred to and processed in
                countries other than your own. We ensure appropriate safeguards
                are in place to protect your information in accordance with this
                Privacy Policy.
              </p>
            </div>

            {/* Children's Privacy */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                11. Children&apos;s Privacy
              </h2>
              <p className="text-gray-600 mb-4">
                Our Service is not intended for children under 13 years of age.
                We do not knowingly collect personal information from children
                under 13. If you are a parent or guardian and believe your child
                has provided us with personal information, please contact us.
              </p>
            </div>

            {/* Changes to Privacy Policy */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                12. Changes to This Privacy Policy
              </h2>
              <p className="text-gray-600 mb-4">
                We may update this Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the &quot;Last updated&quot; date.
              </p>
              <p className="text-gray-600 mb-4">
                We encourage you to review this Privacy Policy periodically for
                any changes.
              </p>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                13. Contact Us
              </h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about this Privacy Policy or our data
                practices, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> privacy@strato.dev
                  <br />
                  <strong>Address:</strong> STRATO Privacy Team
                  <br />
                  San Francisco, CA 94105
                  <br />
                  United States
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
