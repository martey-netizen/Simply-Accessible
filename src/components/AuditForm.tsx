import { useState } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

export default function AuditForm() {
  const [formData, setFormData] = useState({ url: '', email: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        'form-name': 'accessibility-audit',
        url: formData.url,
        email: formData.email,
      }).toString(),
    })
      .then(() => {
        setStatus('success');
        setFormData({ url: '', email: '' });
      })
      .catch(() => setStatus('error'));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (status === 'success') {
    return (
      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6 flex items-start gap-4">
        <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">Request submitted!</h3>
          <p className="text-gray-300">
            We'll review your website and send a detailed accessibility audit report to your email within 2 business days.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      name="accessibility-audit"
      method="POST"
      data-netlify="true"
      onSubmit={handleSubmit}
      className="bg-[#1A1A1A] border border-gray-800 rounded-lg p-8 max-w-md w-full"
    >
      <input type="hidden" name="form-name" value="accessibility-audit" />

      <div className="mb-6">
        <label className="block text-white font-semibold mb-2">Website URL</label>
        <input
          type="url"
          name="url"
          value={formData.url}
          onChange={handleChange}
          placeholder="https://yourwebsite.com"
          required
          className="w-full px-4 py-3 bg-[#0A0A0A] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
        />
      </div>

      <div className="mb-8">
        <label className="block text-white font-semibold mb-2">Email Address</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          required
          className="w-full px-4 py-3 bg-[#0A0A0A] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
        />
      </div>

      {status === 'error' && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-red-200 text-sm">
            Something went wrong. Please try again or contact us directly.
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-[#D4AF37] text-[#121212] py-3 rounded-lg font-semibold hover:bg-[#C19B2D] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Submitting...' : 'Request Free Audit'}
      </button>
    </form>
  );
}
