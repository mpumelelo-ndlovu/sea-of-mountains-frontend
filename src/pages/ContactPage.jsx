import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InputField from '../components/InputField.jsx'; // Import the new reusable component
import { EnvelopeIcon, PhoneIcon, MapPinIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you'd send this data to your backend API.
    // For now, we'll just log it and show an alert.
    console.log('Contact Form Submitted:', formData);
    alert('Thank you for your message! We will get back to you shortly. (This is a demo - no data was actually submitted).');
    // Reset form after submission
    setFormData({ fullName: '', email: '', subject: '', message: '' });
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
                      <span className="font-semibold">Sea of Mountains Accommodation</span><br />
                      123 University Drive (Placeholder)<br />
                      Kimberley, Northern Cape, 8301
                    </address>
                  </div>
                  <div className="flex items-center">
                    <PhoneIcon className="h-6 w-6 text-mountain-tan mr-4 shrink-0" />
                    <a href="tel:+27530000000" className="hover:text-mountain-tan transition-colors">+27 53 000 0000 (Placeholder)</a>
                  </div>
                  <div className="flex items-center">
                    <EnvelopeIcon className="h-6 w-6 text-mountain-tan mr-4 shrink-0" />
                    <a href="mailto:info@seaofmountains.co.za" className="hover:text-mountain-tan transition-colors">info@seaofmountains.co.za (Placeholder)</a>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-ocean-blue mb-4">Our Location</h3>
                {/* Google Maps Embed */}
                <div className="aspect-w-16 aspect-h-9 rounded-xl shadow-2xl overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.708369588642!2d24.757393315080704!3d-28.72830498245198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e9b1a378c51112d%3A0x9283138b732524a!2sSol%20Plaatje%20University%2C%20Central%20Campus!5e0!3m2!1sen!2sza!4v1678886400000!5m2!1sen!2sza"
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
                    className="w-full flex items-center justify-center bg-ocean-blue hover:bg-blue-700 text-white text-lg font-semibold py-3.5 px-10 rounded-lg shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Send Message <PaperAirplaneIcon className="ml-3 h-5 w-5" />
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