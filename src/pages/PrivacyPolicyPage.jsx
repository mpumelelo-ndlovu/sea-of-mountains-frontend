// src/pages/PrivacyPolicyPage.jsx
import React from 'react';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';

const PolicySection = ({ title, children }) => (
    <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-3">{title}</h2>
        <div className="space-y-4 text-white/90 text-sm leading-relaxed">
            {children}
        </div>
    </div>
);

function PrivacyPolicyPage() {
    return (
        <div className="bg-ocean-blue font-sans">
            <section className="bg-mountain-tan text-white py-20 md:py-28">
                <div className="container mx-auto px-6 text-center">
                    <ShieldCheckIcon className="h-16 w-16 md:h-20 md:w-20 text-white mx-auto mb-6 stroke-[1.5]" />
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Privacy Policy</h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
                        Last Updated: 21 September 2025
                    </p>
                </div>
            </section>

            <section className="py-16 md:py-24">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-2xl p-8 md:p-12">
                        <PolicySection title="Introduction">
                            <p>Sea of Mountains Student Accommodation ("we", "our", "us") is committed to protecting your privacy and ensuring that your personal information is collected and used properly, lawfully, and transparently. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services, in accordance with the Protection of Personal Information Act (POPIA) of South Africa.</p>
                        </PolicySection>

                        <PolicySection title="Information We Collect">
                            <p>We may collect the following personal information from you to process your application and manage your tenancy:</p>
                            <ul className="list-disc list-inside space-y-2 pl-4">
                                <li><strong>Personal Identification Data:</strong> Full name, email address, phone number, date of birth, gender, ethnicity, nationality, and ID/Passport number.</li>
                                <li><strong>Academic Information:</strong> Student number, course of study, and year of study.</li>
                                <li><strong>Contact Information:</strong> Physical and postal addresses.</li>
                                <li><strong>Guardian & Emergency Contact Information:</strong> Names, relationships, and contact details.</li>
                                <li><strong>Financial Information:</strong> Details related to your funding source, such as NSFAS reference numbers, bursary details, or responsible payer information.</li>
                                <li><strong>Special Personal Information:</strong> Information about your health (medical conditions) is collected only to ensure your well-being and safety at our accommodation.</li>
                                <li><strong>Technical Data:</strong> We use essential cookies for website security and authentication purposes. These do not track your activity.</li>
                            </ul>
                        </PolicySection>

                        <PolicySection title="How We Use Your Information">
                            <p>Your information is used for the following purposes:</p>
                            <ul className="list-disc list-inside space-y-2 pl-4">
                                <li>To create and manage your user account.</li>
                                <li>To process and manage your accommodation application.</li>
                                <li>To manage your tenancy, including payments and maintenance requests.</li>
                                <li>To communicate with you regarding your application, tenancy, or important announcements.</li>
                                <li>To ensure the safety and security of all our residents.</li>
                                <li>To comply with legal and regulatory obligations.</li>
                            </ul>
                        </PolicySection>
                        
                        <PolicySection title="Data Sharing and Disclosure">
                            <p>We do not sell your personal information. We may share your information with trusted third parties only when necessary, such as with Sol Plaatje University(when requested), funding providers (e.g., NSFAS, bursaries) to confirm your financial arrangements. We ensure that any third party we share data with is also compliant with POPIA standards.</p>
                        </PolicySection>

                        <PolicySection title="Your Rights as a Data Subject">
                            <p>Under POPIA, you have the right to:</p>
                             <ul className="list-disc list-inside space-y-2 pl-4">
                                <li>Request access to your personal information.</li>
                                <li>Request the correction or deletion of your personal information.</li>
                                <li>Object to the processing of your personal information.</li>
                                <li>Lodge a complaint with the Information Regulator of South Africa.</li>
                            </ul>
                            <p>To exercise these rights, please contact us using the details on our Contact page.</p>
                        </PolicySection>

                         <PolicySection title="Data Security">
                            <p>We are committed to protecting your data. Please see our dedicated <strong>Security Policy</strong> for detailed information on the measures we take to secure your personal information.</p>
                        </PolicySection>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default PrivacyPolicyPage;