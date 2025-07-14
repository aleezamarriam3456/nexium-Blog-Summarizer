"use client";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-[#2c2a29]">About Nexium Blog Summarizer</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Company Overview</h2>
        <p className="text-[#2c2a29] leading-relaxed">
          Nexium is a cutting-edge platform designed to help users quickly summarize blog content.
          Our mission is to simplify information consumption and promote knowledge accessibility.
          We value innovation, user experience, and data privacy.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Team & Founders</h2>
        <p className="text-[#2c2a29] leading-relaxed">
          Our team consists of passionate developers and data scientists committed to building smart AI tools.
          Founded by a group of tech enthusiasts, Nexium continues to innovate in the field of content summarization.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Technologies Used</h2>
        <p className="text-[#2c2a29] leading-relaxed">
          Built with Next.js, Supabase, MongoDB, and ShadCN UI components.
          We leverage AI-driven summarization logic and real-time database syncing.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Connect With Us</h2>
        <p className="text-[#2c2a29] leading-relaxed">
          Follow us on social media or visit our blog for updates and tips.
        </p>
        <ul className="list-disc pl-6 text-[#2c2a29]">
          <li><a href="https://facebook.com/nexium" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Facebook</a></li>
          <li><a href="https://twitter.com/nexium" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Twitter</a></li>
          <li><a href="https://instagram.com/nexium" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Instagram</a></li>
          <li><a href="mailto:contact@nexium.com" className="text-blue-600 hover:underline">Email Us</a></li>
        </ul>
      </section>
    </div>
  );
}
