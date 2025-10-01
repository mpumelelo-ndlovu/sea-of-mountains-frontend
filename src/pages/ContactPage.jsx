// FILE: src/pages/ContactPage.jsx
// FINAL REVISED VERSION: Connects the contact form to the backend API.

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import InputField from '../components/InputField.jsx';
import { EnvelopeIcon, PhoneIcon, MapPinIcon, PaperAirplaneIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { api } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await api.post('/api/contact/', formData);
      toast.success('Thank you for your message! We will get back to you shortly.');
      setFormData({ fullName: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Contact Form Submission Error:', error);
      toast.error('Sorry, there was an issue sending your message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white text-gray-800 font-sans">
      {/* Page Banner */}
      <section className="bg-ocean-blue text-white py-20 md:py-28">
        <div className="container mx-auto px-6 text-center">
          <EnvelopeIcon className="h-16 w-16 md:h-20 md-w-20 text-white mx-auto mb-6 stroke-[1.5]" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Get In Touch</h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            Have questions? We're here to help. Reach out to us via phone, email, or the contact form below.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Column 1: Contact Info & Map */}
            <div className="space-y-10">
              <div>
                <h2 className="text-3xl font-bold text-ocean-blue mb-6">Contact Information</h2>
                <div className="space-y-4 text-lg text-gray-700">
                  <div className="flex items-start">
                    <MapPinIcon className="h-7 w-7 text-mountain-tan mr-4 mt-1 shrink-0" />
                    <address className="not-italic">
                      <span className="font-semibold">Sea of Mountains Student Accommodation</span><br />
                      43A Lawson Street, Labram<br />
                      Kimberley, Northern Cape, 8301
                    </address>
                  </div>
                  <div className="flex items-center">
                    <PhoneIcon className="h-6 w-6 text-mountain-tan mr-4 shrink-0" />
                    <a href="tel:+27607891427" className="hover:text-mountain-tan transition-colors">+27 60 789 1427</a>
                  </div>
                  <div className="flex items-center">
                    <EnvelopeIcon className="h-6 w-6 text-mountain-tan mr-4 shrink-0" />
                    <a href="mailto:info@somaccommodation.com" className="hover:text-mountain-tan transition-colors">info@somaccommodation.com</a>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-ocean-blue mb-4">Our Location</h3>
                {/* Google Maps Embed */}
                <div className="aspect-w-16 aspect-h-9 rounded-xl shadow-2xl overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.689626356773!2d24.7573673150807!3d-28.72879998245173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e9b1a26d7c6b123%3A0x868a855a827557e2!2s43a%20Lawson%20St%2C%20Labram%2C%20Kimberley%2C%208301%2C%20South%20Africa!5e0!3m2!1sen!2sus!4v1678886400001!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Location of Sea of Mountains"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Column 2: Enquiry Form */}
            <div className="bg-white p-8 md:p-10 rounded-xl shadow-2xl">
              <h2 className="text-3xl font-bold text-ocean-blue mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <InputField label="Full Name" name="fullName" id="fullName" placeholder="Your full name" required value={formData.fullName} onChange={handleChange} />
                <InputField label="Email Address" type="email" name="email" id="email" placeholder="you@example.com" required value={formData.email} onChange={handleChange} />
                <InputField label="Subject" name="subject" id="subject" placeholder="e.g., Question about rates" required value={formData.subject} onChange={handleChange} />
                <InputField label="Message" name="message" id="message" placeholder="Type your message here..." required as="textarea" value={formData.message} onChange={handleChange} />
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center bg-ocean-blue hover:bg-blue-700 text-white text-lg font-semibold py-3.5 px-10 rounded-lg shadow-xl transition-all duration-300 transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                        <ArrowPathIcon className="h-6 w-6 animate-spin" />
                    ) : (
                        <>
                            Send Message <PaperAirplaneIcon className="ml-3 h-5 w-5" />
                        </>
                    )}
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;