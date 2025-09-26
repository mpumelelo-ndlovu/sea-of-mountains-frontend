// FILE: src/components/ConsentBanner.jsx
// This is the renamed CookieNotice component to avoid ad-blocker issues.

import React, { useState, useEffect } from 'react';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';

function ConsentBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const hasConsented = localStorage.getItem('cookie_consent');
        // Add a small delay to allow other page animations to finish first
        const timer = setTimeout(() => {
            if (!hasConsented) {
                setIsVisible(true);
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie_consent', 'true');
        setIsVisible(false);
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div 
            className={`fixed bottom-4 right-4 z-50 transition-all duration-500 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
            <div className="w-full max-w-sm rounded-xl bg-black/30 backdrop-blur-lg border border-white/20 shadow-2xl p-6">
                <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                        <ShieldCheckIcon className="h-8 w-8 text-white/80" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-white text-md">Cookie Notice</h3>
                        <p className="mt-1 text-sm text-white/80">
                           This website uses cookies to enhance your experience.
                        </p>
                        <button
                            onClick={handleAccept}
                            className="mt-4 px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-ocean-blue bg-white hover:bg-gray-200 transition-colors w-full"
                        >
                            Okay, I understand
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConsentBanner;
