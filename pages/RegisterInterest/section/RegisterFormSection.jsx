"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ContactSection() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    country: '',
    enquiryType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const payload = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        email: formData.email,
        country: formData.country,
        enquiryType: formData.enquiryType,
        message: formData.message,
        subject: `${formData.enquiryType} - ${formData.firstName} ${formData.lastName}`
      };
      
      console.log('Submitting payload:', payload);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log('API Response:', data);
      console.log('Validation errors:', data.errors);

      if (response.ok) {
        // Redirect to thank you page
        router.push('/thank-you');
      } else {
        if (data.errors && data.errors.length > 0) {
          const errorMessages = data.errors.map(err => `${err.field}: ${err.message}`).join(', ');
          setSubmitMessage(`Validation error: ${errorMessages}`);
        } else {
          setSubmitMessage(data.message || 'Something went wrong. Please try again.');
        }
      }
    } catch (error) {
      console.error('Submit error:', error);
      setSubmitMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
   <section 
      id="contact" 
      className="w-full bg-[var(--bg-section)] py-10 lg:py-24 px-6 md:px-12 lg:px-20 min-h-screen flex flex-col justify-center"
    >
      <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-[156px] mx-auto">
        {/* Left: intro + sales info */}
        <div className="px-2 lg:px-1 py-24 sm:py-8"> 
          
          <h2 className="font-serif text-3xl md:text-4xl text-white leading-normal mb-5">
            Project and Corporate Enquiries
          </h2>
          <p className="text-sm leading-[28px] text-white/50 max-w-lg mb-10 paragraph">
           Whether you would like to learn more about PLT Properties, discover PLT Tower or explore a potential partnership, our team would be pleased to hear from you.
          </p>

          <div className="space-y-6">
            <div>
              <p className="text-[10px] tracking-widest uppercase text-white/40 mb-1">
                Sales Gallery
              </p>
              <p className="text-sm text-white/80">
                Business Bay, Dubai · Open daily 10am–8pm
              </p>
            </div>
            <div>
              <p className="text-[10px] tracking-widest uppercase text-white/40 mb-1">
                Phone
              </p>
              <p className="text-sm text-white/80">+971 4 XXX XXXX</p>
            </div>
            <div>
              <p className="text-[10px] tracking-widest uppercase text-white/40 mb-1">
                WhatsApp
              </p>
              <p className="text-sm text-white/80">+971 50 XXX XXXX</p>
            </div>
            <div>
              <p className="text-[10px] tracking-widest uppercase text-white/40 mb-1">
                Email
              </p>
              <p className="text-sm text-white/80">enquiries@pltproperties.com</p>
            </div>
          </div>
        </div>
        <div className="mt-8 lg:mt-0 bg-[var(--bg-card)] border-[1px] border-[rgba(255,255,255,0.1)] px-10 py-8">
           <h2 className="font-serif text-3xl md:text-4xl text-white leading-normal mb-8">
         Register Interest
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 content-start">
        
          <Field 
            label="First name" 
            placeholder="Your first name" 
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <Field 
            label="Last name" 
            placeholder="Your last name" 
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          <Field
            label="Email address"
            placeholder="you@email.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <Field 
            label="Telephone number" 
            placeholder="+971 XX XXX XXXX" 
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <Select
            label="Country of residence"
            placeholder="Select country"
          
            name="country"
            value={formData.country}
            onChange={handleChange}
            options={[
              { value: 'uae', label: 'United Arab Emirates' },
              { value: 'uk', label: 'United Kingdom' },
              { value: 'usa', label: 'United States' },
              { value: 'india', label: 'India' },
              { value: 'pakistan', label: 'Pakistan' },
              { value: 'saudi', label: 'Saudi Arabia' },
              { value: 'qatar', label: 'Qatar' },
              { value: 'kuwait', label: 'Kuwait' },
              { value: 'other', label: 'Other' }
            ]}
          />
          <Select
            label="Enquiry type"
            placeholder="Select enquiry type"
            
            name="enquiryType"
            value={formData.enquiryType}
            onChange={handleChange}
            options={[
              { value: 'sales', label: 'Sales Enquiry' },
              { value: 'partnership', label: 'Partnership Inquiry' },
              { value: 'media', label: 'Media & Press' },
              { value: 'investor', label: 'Investor Relations' },
              { value: 'general', label: 'General Enquiry' }
            ]}
          />
          <Field
            label="Message"
            placeholder="Your message"
            className="sm:col-span-2"
            name="message"
            value={formData.message}
            onChange={handleChange}
            type="textarea"
          />

          {submitMessage && (
            <div className={`sm:col-span-2 text-sm ${submitMessage.includes('success') ? 'text-green-400' : 'text-red-400'}`}>
              {submitMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="sm:col-span-2 w-full mt-4 justify-self-start border border-white/70 text-white text-xs tracking-widest uppercase px-6 py-3 hover:bg-white hover:text-[var(--bg-card)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
          </button>
        </form>
       </div>
      </div>
    </section>
  );
}

function Field({ label, placeholder, className = "", name, value, onChange, type = "text" }) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-[14px] tracking-widest uppercase text-white/40 mb-2">
        {label}
      </span>
      {type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={2}
          className="w-full bg-transparent border-b border-white/20 pb-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[var(--bronze)] transition-colors resize-none"
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-transparent border-b border-white/20 pb-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[var(--bronze)] transition-colors"
        />
      )}
    </label>
  );
}

function Select({ label, placeholder, className = "", name, value, onChange, options = [] }) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-[10px] tracking-widest uppercase text-white/40 mb-2">
        {label}
      </span>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full bg-transparent border-b border-white/20 pb-2 text-sm text-white/50 focus:outline-none focus:border-[#B08D57] transition-colors appearance-none"
      >
        <option value="" disabled className="text-gray-400">
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value} className="text-black">
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}