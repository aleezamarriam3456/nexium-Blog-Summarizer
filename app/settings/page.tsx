"use client";

export default function HelpPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-[#2c2a29]">Help & Support</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Frequently Asked Questions (FAQs)</h2>
        <ul className="list-disc pl-6 text-[#2c2a29]">
          <li><strong>How do I summarize a blog?</strong> Enter the blog URL on the home page and click "Generate Summary".</li>
          <li><strong>Is my data private?</strong> Yes, we ensure your data is stored securely and never shared.</li>
          <li><strong>Can I save summaries?</strong> Yes, all summaries are saved and accessible in your History page.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Troubleshooting</h2>
        <p className="text-[#2c2a29] leading-relaxed">
          If you experience loading issues, please check your internet connection or try refreshing the page.
          For other errors, contact support.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">How-To Guides</h2>
        <p className="text-[#2c2a29] leading-relaxed">
          Step 1: Enter a valid blog URL.<br />
          Step 2: Click "Generate Summary".<br />
          Step 3: View and save your summary and Urdu translation.<br />
          Step 4: Access all summaries anytime in the History page.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Contact Support</h2>
        <p className="text-[#2c2a29] leading-relaxed">
          For further assistance, please email <a href="mailto:support@nexium.com" className="text-blue-600 hover:underline">support@nexium.com</a>.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Legal</h2>
        <ul className="list-disc pl-6 text-[#2c2a29]">
          <li><a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a></li>
          <li><a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a></li>
        </ul>
      </section>
    </div>
  );
}
