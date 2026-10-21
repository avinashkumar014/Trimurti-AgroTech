import { useState } from 'react';
import { Send, CheckCircle2, Loader2, MessageCircle } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { buildWhatsAppLink, getWhatsAppMessageForSell } from '@/utils/contact';

const vehicleTypes = ['Tractor', 'Agricultural Vehicle', 'Commercial Vehicle', 'Other'];
const conditions = ['Excellent', 'Good', 'Fair', 'Needs Repair'];

export function SellVehicleForm() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    vehicleType: '',
    brand: '',
    model: '',
    year: '',
    hours: '',
    expectedPrice: '',
    location: '',
    condition: '',
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
        return;
      }

      const { error } = await supabase.from('sell_requests').insert({
        name: form.name,
        phone: form.phone,
        vehicle_type: form.vehicleType,
        brand: form.brand,
        model: form.model,
        year: form.year || null,
        hours: form.hours || null,
        expected_price: form.expectedPrice || null,
        location: form.location || null,
        condition: form.condition || null,
        message: form.message || null,
        status: 'New',
      });
      if (error) throw error;
      setStatus('success');
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
          Your vehicle details have been received. Our team will contact you shortly to discuss the next steps.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
          <a
            href={buildWhatsAppLink(getWhatsAppMessageForSell())}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#25D366] text-white text-sm font-semibold rounded hover:bg-[#22c35e] transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Send Details on WhatsApp
          </a>
          <button
            onClick={() => setStatus('idle')}
            className="text-sm text-gold hover:underline"
          >
            Submit another vehicle
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-muted mb-1.5" htmlFor="sell-name">Full Name *</label>
          <input id="sell-name" name="name" type="text" required value={form.name} onChange={handleChange}
            className="w-full px-4 py-3 bg-ink border border-ink-border text-cream text-sm rounded focus:border-gold/50 focus:outline-none transition-colors"
            placeholder="Your full name" />
        </div>
        <div>
          <label className="block text-xs font-medium text-muted mb-1.5" htmlFor="sell-phone">Mobile Number *</label>
          <input id="sell-phone" name="phone" type="tel" required value={form.phone} onChange={handleChange}
            className="w-full px-4 py-3 bg-ink border border-ink-border text-cream text-sm rounded focus:border-gold/50 focus:outline-none transition-colors"
            placeholder="Your mobile number" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-muted mb-1.5" htmlFor="sell-vtype">Vehicle Type *</label>
        <select id="sell-vtype" name="vehicleType" required value={form.vehicleType} onChange={handleChange}
          className="w-full px-4 py-3 bg-ink border border-ink-border text-cream text-sm rounded focus:border-gold/50 focus:outline-none transition-colors">
          <option value="">Select vehicle type</option>
          {vehicleTypes.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-muted mb-1.5" htmlFor="sell-brand">Brand *</label>
          <input id="sell-brand" name="brand" type="text" required value={form.brand} onChange={handleChange}
            className="w-full px-4 py-3 bg-ink border border-ink-border text-cream text-sm rounded focus:border-gold/50 focus:outline-none transition-colors"
            placeholder="e.g. Mahindra, Swaraj" />
        </div>
        <div>
          <label className="block text-xs font-medium text-muted mb-1.5" htmlFor="sell-model">Model *</label>
          <input id="sell-model" name="model" type="text" required value={form.model} onChange={handleChange}
            className="w-full px-4 py-3 bg-ink border border-ink-border text-cream text-sm rounded focus:border-gold/50 focus:outline-none transition-colors"
            placeholder="e.g. 575 DI" />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-medium text-muted mb-1.5" htmlFor="sell-year">Year</label>
          <input id="sell-year" name="year" type="text" value={form.year} onChange={handleChange}
            className="w-full px-4 py-3 bg-ink border border-ink-border text-cream text-sm rounded focus:border-gold/50 focus:outline-none transition-colors"
            placeholder="2019" />
        </div>
        <div>
          <label className="block text-xs font-medium text-muted mb-1.5" htmlFor="sell-hours">Running Hours</label>
          <input id="sell-hours" name="hours" type="text" value={form.hours} onChange={handleChange}
            className="w-full px-4 py-3 bg-ink border border-ink-border text-cream text-sm rounded focus:border-gold/50 focus:outline-none transition-colors"
            placeholder="4200" />
        </div>
        <div>
          <label className="block text-xs font-medium text-muted mb-1.5" htmlFor="sell-price">Expected Price</label>
          <input id="sell-price" name="expectedPrice" type="text" value={form.expectedPrice} onChange={handleChange}
            className="w-full px-4 py-3 bg-ink border border-ink-border text-cream text-sm rounded focus:border-gold/50 focus:outline-none transition-colors"
            placeholder="₹4,00,000" />
        </div>
        <div>
          <label className="block text-xs font-medium text-muted mb-1.5" htmlFor="sell-loc">Location</label>
          <input id="sell-loc" name="location" type="text" value={form.location} onChange={handleChange}
            className="w-full px-4 py-3 bg-ink border border-ink-border text-cream text-sm rounded focus:border-gold/50 focus:outline-none transition-colors"
            placeholder="City" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-muted mb-1.5" htmlFor="sell-cond">Vehicle Condition</label>
        <select id="sell-cond" name="condition" value={form.condition} onChange={handleChange}
          className="w-full px-4 py-3 bg-ink border border-ink-border text-cream text-sm rounded focus:border-gold/50 focus:outline-none transition-colors">
          <option value="">Select condition</option>
          {conditions.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium text-muted mb-1.5" htmlFor="sell-msg">Additional Details</label>
        <textarea id="sell-msg" name="message" rows={3} value={form.message} onChange={handleChange}
          className="w-full px-4 py-3 bg-ink border border-ink-border text-cream text-sm rounded focus:border-gold/50 focus:outline-none transition-colors resize-none"
          placeholder="Tell us about engine condition, tyre condition, documents, etc." />
      </div>

      <div>
        <label className="block text-xs font-medium text-muted mb-1.5" htmlFor="sell-photos">Vehicle Photos</label>
        <div className="w-full px-4 py-6 bg-ink border border-dashed border-ink-border text-center rounded text-muted text-sm">
          Photo upload will be available soon. For now, please share photos via WhatsApp after submitting.
        </div>
      </div>

      {status === 'error' && (
        <p className="text-sm text-red-400">
          Something went wrong. Please try again or contact us directly.
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
            Submitting...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            SUBMIT VEHICLE DETAILS
          </>
        )}
      </button>

      <div className="text-center pt-2">
        <a
          href={buildWhatsAppLink(getWhatsAppMessageForSell())}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-[#25D366] hover:underline"
        >
          <MessageCircle className="w-4 h-4" />
          Prefer WhatsApp? Send Details on WhatsApp
        </a>
      </div>
    </form>
  );
}
