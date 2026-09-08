"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { leadApi } from '@/lib/api';

export default function ContactSection() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullname: '',
    mobile: '',
    email: '',
    message: '',
    privacy: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await leadApi.createLead({
        name: formData.fullname,
        phone: formData.mobile,
        email: formData.email,
        developmentOfInterest: 'PLT Tower',
        interest: 'General Enquiry',
        subject: 'Contact Form Submission',
        message: formData.message || 'New enquiry from website'
      });

      if (response.success) {
        const params = new URLSearchParams({
          name: formData.fullname,
          email: formData.email,
          phone: formData.mobile || '',
          development: 'PLT Tower',
          interest: 'General Enquiry'
        });
        router.push(`/thank-you?${params.toString()}`);
      } else {
        setSubmitMessage(response.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setSubmitMessage(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      className="relative w-full py-20 h-screen flex items-center justify-center px-6 md:px-12 lg:px-20"
      style={{
        backgroundImage: 'url(https://www.plttower.com/img/h6.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-black/40" />
      
      <div className="relative z-10 max-w-4xl mx-auto w-full text-center">
        <p className="font-sans text-xs tracking-[0.25em] text-(--tan) mb-2">
          — CONTACT US
        </p>
        <h2 className="text-4xl md:text-4xl lg:text-5xl text-white font-display tracking-wider mb-8">
          GET IN TOUCH
        </h2>
        <div className="bg-[#1a1a1a]/20 backdrop-blur-md p-6 md:p-8 border border-(--tan)/30 mt-5">
          {submitMessage && (
            <div className="mb-4 p-3 bg-white/20 text-white text-sm">
              {submitMessage}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              placeholder="Full name"
              required
              className="w-full bg-white/20 border border-white/30 text-white placeholder-white/60 px-4 py-3 focus:outline-none focus:border-white/60"
            />
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="+1 | Mobile number"
              required
              className="w-full bg-white/20 border border-white/30 text-white placeholder-white/60 px-4 py-3 focus:outline-none focus:border-white/60"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              required
              className="w-full bg-white/20 border border-white/30 text-white placeholder-white/60 px-4 py-3 focus:outline-none focus:border-white/60"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              rows={1}
              className="w-full bg-white/20 border border-white/30 text-white placeholder-white/60 px-4 py-3 focus:outline-none focus:border-white/60 resize-none"
            />
            <label className="flex items-start gap-2 text-white text-sm">
              <input
                type="checkbox"
                name="privacy"
                checked={formData.privacy}
                onChange={handleChange}
                required
                className="mt-1"
              />
              <span>
                I confirm that I have read and accept the{' '}
                <a href="/privacy-policy" className="underline hover:text-gray-200">
                  privacy policy
                </a>
              </span>
            </label>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[var(--tan)] text-black font-semibold py-3 px-6 hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'SENDING...' : 'SEND'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
