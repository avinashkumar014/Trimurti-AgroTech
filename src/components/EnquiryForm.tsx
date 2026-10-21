import { useState } from 'react';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { Enquiry } from '@/types';

interface EnquiryFormProps {
  type?: Enquiry['type'];
  product?: string;
  compact?: boolean;
}

export function EnquiryForm({ type = 'General', product = '' }: EnquiryFormProps) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    requirement: '',
    product,
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      if (!isSupabaseConfigured) {
        // Fallback for preview/local demo when Supabase credentials are not configured
        await new Promise((res) => setTimeout(res, 500));
        setStatus('success');
        setForm({ name: '', phone: '', email: '', requirement: '', product: '', message: '' });
        return;
      }

      const { error } = await supabase.from('enquiries').insert({
        name: form.name,
        phone: form.phone,
        email: form.email || null,
        type,
        product: form.product || form.requirement || null,
        message: form.message || form.requirement,
        status: 'New',
      });
      if (error) throw error;
      setStatus('success');
      setForm({ name: '', phone: '', email: '', requirement: '', product: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-ink-card border border-agri/30 rounded-lg p-8 text-center">
        <CheckCircle2 className="w-12 h-12 text-agri-light mx-auto mb-4" />
        <h3 className="font-display font-semibold text-xl text-cream mb-2">Thank You</h3>
        <p className="text-muted text-sm">
          Your enquiry has been received. Our team will contact you shortly.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-4 text-sm text-gold hover:underline"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-muted mb-1.5" htmlFor="enq-name">Name *</label>
          <input
            id="enq-name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-ink border border-ink-border text-cream text-sm rounded focus:border-gold/50 focus:outline-none transition-colors"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-muted mb-1.5" htmlFor="enq-phone">Phone *</label>
          <input
            id="enq-phone"
            name="phone"
            type="tel"
            required
            value={form.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-ink border border-ink-border text-cream text-sm rounded focus:border-gold/50 focus:outline-none transition-colors"
            placeholder="Your mobile number"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-muted mb-1.5" htmlFor="enq-email">Email</label>
        <input
          id="enq-email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-ink border border-ink-border text-cream text-sm rounded focus:border-gold/50 focus:outline-none transition-colors"
          placeholder="Your email (optional)"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-muted mb-1.5" htmlFor="enq-requirement">Requirement</label>
        <select
          id="enq-requirement"
          name="requirement"
          value={form.requirement}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-ink border border-ink-border text-cream text-sm rounded focus:border-gold/50 focus:outline-none transition-colors"
        >
          <option value="">Select requirement</option>
          <option value="Tractor Parts">Tractor Parts</option>
          <option value="Used Vehicle">Used Vehicle</option>
          <option value="Sell Vehicle">Sell Vehicle</option>
          <option value="General Enquiry">General Enquiry</option>
        </select>
      </div>
      <div>
        <label className="block text-xs font-medium text-muted mb-1.5" htmlFor="enq-product">Vehicle / Part</label>
        <input
          id="enq-product"
          name="product"
          type="text"
          value={form.product}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-ink border border-ink-border text-cream text-sm rounded focus:border-gold/50 focus:outline-none transition-colors"
          placeholder="e.g. Mahindra 575 DI or Engine Piston Kit"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-muted mb-1.5" htmlFor="enq-message">Message</label>
        <textarea
          id="enq-message"
          name="message"
          rows={3}
          value={form.message}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-ink border border-ink-border text-cream text-sm rounded focus:border-gold/50 focus:outline-none transition-colors resize-none"
          placeholder="Tell us what you need..."
        />
      </div>
      {status === 'error' && (
        <p className="text-sm text-red-400">
          Something went wrong. Please try again or call us directly.
        </p>
      )}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-gold text-ink text-sm font-bold rounded hover:bg-gold-light transition-colors disabled:opacity-50"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Send Enquiry
          </>
        )}
      </button>
    </form>
  );
}
