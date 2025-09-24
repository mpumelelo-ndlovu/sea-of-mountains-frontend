// src/pages/SecurityPolicyPage.jsx
import React from 'react';
import { LockClosedIcon } from '@heroicons/react/24/outline';

const PolicySection = ({ title, children }) => (
    <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-3">{title}</h2>
        <div className="space-y-4 text-white/90 text-sm leading-relaxed">
            {children}
        </div>
    </div>
);

function SecurityPolicyPage() {
    return (
        <div className="bg-ocean-blue font-sans">
            <section className="bg-mountain-tan text-white py-20 md:py-28">
                <div className="container mx-auto px-6 text-center">
                    <LockClosedIcon className="h-16 w-16 md:h-20 md:w-20 text-white mx-auto mb-6 stroke-[1.5]" />
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Security Policy</h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
                        Our Commitment to Protecting Your Information
                    </p>
                </div>
            </section>

            <section className="py-16 md:py-24">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-2xl p-8 md:p-12">
                        <PolicySection title="Our Commitment to Security">
                            <p>At Sea of Mountains Student Accommodation, the security of your personal information is a top priority. We have implemented a comprehensive security program with administrative, technical, and physical safeguards designed to protect your data from unauthorized access, alteration, disclosure, or destruction.</p>
                        </PolicySection>

                        <PolicySection title="How We Protect Your Information">
                            <ul className="list-disc list-inside space-y-3 pl-4">
                                <li><strong>Data Encryption:</strong> All information transmitted between your browser and our website is encrypted using industry-standard protocols. This ensures that your data remains private and secure during transmission.</li>
                                <li><strong>Access Control:</strong> We enforce strict access controls within our organization. Only authorized personnel with a legitimate need are permitted to access your personal information, and they are bound by confidentiality obligations.</li>
                                <li><strong>Secure Account Management:</strong> Your account is protected by a password that you create. We use modern, secure methods to store your password, ensuring that even we cannot see it. Our system also includes secure session management to protect your account after you log in.</li>
                                <li><strong>System Integrity:</strong> We employ measures to protect against common web vulnerabilities and ensure that all actions taken within your account are legitimate and authorized by you.</li>
                                <li><strong>Secure Infrastructure:</strong> Our services are hosted on a secure infrastructure that provides robust protection against physical and network-level threats.</li>
                            </ul>
                        </PolicySection>

                        <PolicySection title="Your Role in Security">
                            <p>While we work hard to protect your data, your cooperation is also vital for security. We encourage you to:</p>
                             <ul className="list-disc list-inside space-y-2 pl-4">
                                <li>Create a strong, unique password for your Sea of Mountains account.</li>
                                <li>Never share your password or login details with anyone.</li>
                                <li>Log out of your account when using a shared or public computer.</li>
                            </ul>
                        </PolicySection>
                         <PolicySection title="Policy Updates">
                            <p>We may update this Security Policy from time to time to reflect new technologies or security practices. We are committed to maintaining a secure environment for all our users.</p>
                        </PolicySection>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default SecurityPolicyPage;