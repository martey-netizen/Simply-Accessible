import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import AuditForm from '../components/AuditForm';

export default function Home() {
  return (
    <div className="bg-[#121212]">
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              We make the web work for{' '}
              <span className="text-[#D4AF37]">everyone</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
              Expert WCAG and ADA compliance consulting to ensure your digital presence is accessible, inclusive, and legally compliant.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-[#D4AF37] text-[#121212] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#C19B2D] transition-all duration-200 shadow-2xl hover:shadow-[#D4AF37]/20 transform hover:-translate-y-1 flex items-center gap-2">
                Get Your Free Audit
                <ArrowRight className="w-5 h-5" />
              </button>
              <Link
                to="/services"
                className="border-2 border-[#D4AF37] text-[#D4AF37] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#D4AF37] hover:text-[#121212] transition-all duration-200 flex items-center gap-2"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Accessibility Matters
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Accessibility isn't just compliance—it's about creating better experiences for all users.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#1A1A1A] p-8 rounded-lg border border-gray-800 hover:border-[#D4AF37] transition-all duration-200">
              <div className="bg-[#D4AF37]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Legal Protection</h3>
              <p className="text-gray-400">
                Avoid costly lawsuits and ensure compliance with ADA, WCAG 2.1, and Section 508 standards.
              </p>
            </div>

            <div className="bg-[#1A1A1A] p-8 rounded-lg border border-gray-800 hover:border-[#D4AF37] transition-all duration-200">
              <div className="bg-[#D4AF37]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Wider Reach</h3>
              <p className="text-gray-400">
                Reach 15% more potential customers by making your website accessible to people with disabilities.
              </p>
            </div>

            <div className="bg-[#1A1A1A] p-8 rounded-lg border border-gray-800 hover:border-[#D4AF37] transition-all duration-200">
              <div className="bg-[#D4AF37]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Better SEO</h3>
              <p className="text-gray-400">
                Accessible websites rank higher in search results and provide better user experiences for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to make your website accessible?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Start with a comprehensive audit to identify accessibility issues and get a roadmap for compliance.
            </p>
          </div>
          <div className="flex justify-center">
            <AuditForm />
          </div>
        </div>
      </section>
    </div>
  );
}
