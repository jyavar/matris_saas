import { Code } from 'lucide-react'

import Header from '@/components/Header'

export default function TermsPage() {
  const lastUpdated = 'July 8, 2025'

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Code className="w-16 h-16 text-blue-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Last updated: {lastUpdated}
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            These terms govern your use of STRATO Core OS™ and our AI-powered
            development platform.
          </p>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
            {/* Acceptance */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-600 mb-4">
                By accessing and using STRATO Core OS™ (&quot;the
                Service&quot;), you accept and agree to be bound by the terms
                and provision of this agreement. If you do not agree to abide by
                the above, please do not use this service.
              </p>
            </div>

            {/* Description of Service */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                2. Description of Service
              </h2>
              <p className="text-gray-600 mb-4">
                STRATO Core OS™ provides an AI-powered development platform
                including:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>
                  AI Agents Marketplace for buying and selling intelligent
                  automation tools
                </li>
                <li>SaaS Platform infrastructure and management tools</li>
                <li>
                  Intelligent agents for code quality and development automation
                </li>
                <li>Documentation, templates, and community resources</li>
                <li>Enterprise-grade security and compliance features</li>
              </ul>
            </div>

            {/* User Accounts */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                3. User Accounts
              </h2>
              <p className="text-gray-600 mb-4">
                To access certain features of the Service, you must create an
                account. You are responsible for:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>
                  Maintaining the confidentiality of your account credentials
                </li>
                <li>All activities that occur under your account</li>
                <li>Providing accurate and complete information</li>
                <li>Notifying us immediately of any unauthorized use</li>
              </ul>
            </div>

            {/* Acceptable Use */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                4. Acceptable Use Policy
              </h2>
              <p className="text-gray-600 mb-4">
                You agree not to use the Service to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe upon intellectual property rights</li>
                <li>Transmit harmful, offensive, or inappropriate content</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with the proper functioning of the Service</li>
                <li>Use the Service for any illegal or unauthorized purpose</li>
              </ul>
            </div>

            {/* Intellectual Property */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                5. Intellectual Property
              </h2>
              <p className="text-gray-600 mb-4">
                The Service and its original content, features, and
                functionality are owned by STRATO and are protected by
                international copyright, trademark, patent, trade secret, and
                other intellectual property laws.
              </p>
              <p className="text-gray-600 mb-4">
                You retain ownership of any content you create using our
                Service, but grant us a license to use, modify, and display such
                content as necessary to provide the Service.
              </p>
            </div>

            {/* Privacy */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                6. Privacy
              </h2>
              <p className="text-gray-600 mb-4">
                Your privacy is important to us. Please review our Privacy
                Policy, which also governs your use of the Service, to
                understand our practices.
              </p>
            </div>

            {/* Payment Terms */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                7. Payment Terms
              </h2>
              <p className="text-gray-600 mb-4">For paid services:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Fees are billed in advance on a monthly or annual basis</li>
                <li>All fees are non-refundable except as required by law</li>
                <li>We may change our fees upon 30 days notice</li>
                <li>
                  You are responsible for all taxes associated with your use
                </li>
              </ul>
            </div>

            {/* Termination */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                8. Termination
              </h2>
              <p className="text-gray-600 mb-4">
                We may terminate or suspend your account and access to the
                Service immediately, without prior notice, for any reason,
                including breach of these Terms.
              </p>
              <p className="text-gray-600 mb-4">
                Upon termination, your right to use the Service will cease
                immediately. If you wish to terminate your account, you may
                simply discontinue using the Service.
              </p>
            </div>

            {/* Disclaimers */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                9. Disclaimers
              </h2>
              <p className="text-gray-600 mb-4">
                The Service is provided on an &quot;AS IS&quot; and &quot;AS
                AVAILABLE&quot; basis. STRATO makes no warranties, expressed or
                implied, and hereby disclaims all warranties, including without
                limitation:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>
                  Warranties of merchantability and fitness for a particular
                  purpose
                </li>
                <li>
                  Warranties that the Service will be uninterrupted or
                  error-free
                </li>
                <li>
                  Warranties regarding the accuracy or reliability of any
                  information
                </li>
              </ul>
            </div>

            {/* Limitation of Liability */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                10. Limitation of Liability
              </h2>
              <p className="text-gray-600 mb-4">
                In no event shall STRATO, nor its directors, employees,
                partners, agents, suppliers, or affiliates, be liable for any
                indirect, incidental, special, consequential, or punitive
                damages, including without limitation, loss of profits, data,
                use, goodwill, or other intangible losses, resulting from your
                use of the Service.
              </p>
            </div>

            {/* Governing Law */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                11. Governing Law
              </h2>
              <p className="text-gray-600 mb-4">
                These Terms shall be interpreted and governed by the laws of the
                United States, without regard to its conflict of law provisions.
              </p>
            </div>

            {/* Changes to Terms */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                12. Changes to Terms
              </h2>
              <p className="text-gray-600 mb-4">
                We reserve the right to modify or replace these Terms at any
                time. If a revision is material, we will provide at least 30
                days notice prior to any new terms taking effect.
              </p>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                13. Contact Information
              </h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about these Terms of Service, please
                contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> legal@strato.dev
                  <br />
                  <strong>Address:</strong> STRATO Legal Department
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
