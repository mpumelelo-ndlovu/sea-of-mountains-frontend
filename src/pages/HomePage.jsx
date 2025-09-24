import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import feather from 'feather-icons';
import * as THREE from 'three';
import GLOBE from 'vanta/dist/vanta.globe.min.js';

// Icon component for easier use
const Icon = ({ name, className }) => (
  <i data-feather={name} className={className}></i>
);

const HomePage = () => {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });

    // Initialize Vanta
    if (!vantaEffect) {
      setVantaEffect(
        GLOBE({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x00d4ff,      // --neon-cyan
          backgroundColor: 0x0a0e27, // --deep-space
          size: 1.5,
        })
      );
    }
    
    // Initialize Feather Icons
    feather.replace();

    // Cleanup Vanta effect on component unmount
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const handleMobileLinkClick = () => {
      setMobileMenuOpen(false);
  };

  return (
    <div className="neural-bg">
      {/* --- Navigation --- */}
      <nav className="fixed top-0 w-full z-50 glass-morphism">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <a href="#home" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-neon-cyan to-neon-purple rounded-lg flex items-center justify-center">
                <Icon name="home" className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gradient">Sea of Mountains</span>
            </a>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-300 hover:text-neon-cyan transition-colors duration-300">Home</a>
              <a href="#features" className="text-gray-300 hover:text-neon-cyan transition-colors duration-300">Features</a>
              <a href="#rooms" className="text-gray-300 hover:text-neon-cyan transition-colors duration-300">Rooms</a>
              <a href="#amenities" className="text-gray-300 hover:text-neon-cyan transition-colors duration-300">Amenities</a>
              <Link to="/apply" className="bg-gradient-to-r from-neon-cyan to-neon-purple px-6 py-2 rounded-full font-semibold hover:glow-effect transition-all duration-300">Apply Now</Link>
            </div>
            <button className="md:hidden text-white" onClick={toggleMobileMenu}>
              <Icon name="menu" className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* --- Mobile Menu --- */}
      <div className={`fixed inset-0 z-40 bg-gray-900 bg-opacity-95 backdrop-blur-sm md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="flex flex-col items-center justify-center h-full space-y-8">
            <button onClick={toggleMobileMenu} className="absolute top-6 right-6 text-white">
                <Icon name="x" className="w-8 h-8" />
            </button>
            <a href="#home" onClick={handleMobileLinkClick} className="text-2xl text-gray-300 hover:text-neon-cyan transition-colors">Home</a>
            <a href="#features" onClick={handleMobileLinkClick} className="text-2xl text-gray-300 hover:text-neon-cyan transition-colors">Features</a>
            <a href="#rooms" onClick={handleMobileLinkClick} className="text-2xl text-gray-300 hover:text-neon-cyan transition-colors">Rooms</a>
            <a href="#amenities" onClick={handleMobileLinkClick} className="text-2xl text-gray-300 hover:text-neon-cyan transition-colors">Amenities</a>
            <Link to="/apply" onClick={handleMobileLinkClick} className="bg-gradient-to-r from-neon-cyan to-neon-purple px-8 py-3 rounded-full font-semibold text-lg">Apply Now</Link>
        </div>
      </div>

      {/* --- Hero Section --- */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div ref={vantaRef} className="absolute inset-0"></div>
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 text-gradient" data-aos="fade-up">
            Future of Student Living
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
            Experience premium, accredited student accommodation at Sol Plaatje University.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center" data-aos="fade-up" data-aos-delay="400">
            <a href="#rooms" className="bg-gradient-to-r from-neon-cyan to-neon-purple px-8 py-4 rounded-full font-bold text-lg hover:glow-effect transition-all duration-300 transform hover:scale-105">
              Explore Rooms
            </a>
            <Link to="/contact" className="glass-morphism px-8 py-4 rounded-full font-bold text-lg hover:glow-effect transition-all duration-300">
              Contact Us
            </Link>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 floating">
          <Icon name="chevron-down" className="w-8 h-8 text-neon-cyan" />
        </div>
      </section>

      {/* --- Features Section --- */}
      <section id="features" className="py-20 md:py-32 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-20 text-gradient" data-aos="fade-up">
            Key Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="holographic-card p-8 rounded-2xl text-center transform hover:scale-105 transition-all duration-300" data-aos="fade-up" data-aos-delay="100">
                <div className="w-20 h-20 bg-gradient-to-br from-neon-cyan to-neon-purple rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon name="map-pin" className="w-10 h-10 text-white"/>
                </div>
                <h3 className="text-xl font-bold mb-3">Prime Location</h3>
                <p className="text-gray-400">On-campus accommodation, ensuring you are always at the heart of university life.</p>
            </div>
            {/* Feature 2 */}
            <div className="holographic-card p-8 rounded-2xl text-center transform hover:scale-105 transition-all duration-300" data-aos="fade-up" data-aos-delay="200">
                <div className="w-20 h-20 bg-gradient-to-br from-neon-purple to-mountain-tan rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon name="shield" className="w-10 h-10 text-white"/>
                </div>
                <h3 className="text-xl font-bold mb-3">Safe & Secure</h3>
                <p className="text-gray-400">24/7 security, CCTV, and secure biometric access control for complete peace of mind.</p>
            </div>
            {/* Feature 3 */}
            <div className="holographic-card p-8 rounded-2xl text-center transform hover:scale-105 transition-all duration-300" data-aos="fade-up" data-aos-delay="300">
                <div className="w-20 h-20 bg-gradient-to-br from-mountain-tan to-neon-cyan rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon name="wifi" className="w-10 h-10 text-white"/>
                </div>
                <h3 className="text-xl font-bold mb-3">Modern Amenities</h3>
                <p className="text-gray-400">High-speed Wi-Fi, furnished rooms, dedicated study areas, and communal lounges.</p>
            </div>
            {/* Feature 4 */}
            <div className="holographic-card p-8 rounded-2xl text-center transform hover:scale-105 transition-all duration-300" data-aos="fade-up" data-aos-delay="400">
                <div className="w-20 h-20 bg-gradient-to-br from-neon-cyan to-mountain-tan rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon name="users" className="w-10 h-10 text-white"/>
                </div>
                <h3 className="text-xl font-bold mb-3">Vibrant Community</h3>
                <p className="text-gray-400">Join a supportive and engaging community of like-minded students.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Rooms Section --- */}
      <section id="rooms" className="py-20 md:py-32 relative grid-pattern">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-20 text-gradient" data-aos="fade-up">
            Our Rooms
          </h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Room 1 */}
            <div className="glass-morphism rounded-3xl overflow-hidden group" data-aos="fade-right">
                <div className="relative h-80 overflow-hidden">
                    <img src="/hero-background.jpg" alt="Deluxe Single Room" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                </div>
                <div className="p-8">
                    <h3 className="text-3xl font-bold mb-4 text-neon-cyan">The Deluxe Single</h3>
                    <p className="text-gray-300 mb-6">Your private sanctuary, fully furnished with a bed, dedicated study desk, and ample storage.</p>
                    <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-gradient">From R3,500/pm</span>
                        <Link to="/rooms" className="bg-gradient-to-r from-neon-cyan to-neon-purple px-6 py-3 rounded-full font-semibold hover:glow-effect transition-all duration-300">
                          View Details
                        </Link>
                    </div>
                </div>
            </div>
            {/* Room 2 */}
            <div className="glass-morphism rounded-3xl overflow-hidden group" data-aos="fade-left">
                <div className="relative h-80 overflow-hidden">
                    <img src="/src/assets/IMG_0712.jpg" alt="Sharing Room" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                </div>
                <div className="p-8">
                    <h3 className="text-3xl font-bold mb-4 text-neon-purple">The Sharing Room</h3>
                    <p className="text-gray-300 mb-6">A comfortable and spacious twin sharing room, perfect for collaboration and making new friends.</p>
                    <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-gradient">From R2,200/pm</span>
                        <Link to="/rooms" className="bg-gradient-to-r from-neon-purple to-mountain-tan px-6 py-3 rounded-full font-semibold hover:glow-effect transition-all duration-300">
                           View Details
                        </Link>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Amenities Section --- */}
      <section id="amenities" className="py-20 md:py-32 relative">
          <div className="container mx-auto px-6">
              <h2 className="text-4xl md:text-6xl font-bold text-center mb-20 text-gradient" data-aos="fade-up">
                  Student Amenities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                {[
                  { icon: 'wifi', name: 'High-Speed Wi-Fi', desc: 'Uncapped & Unshaped' },
                  { icon: 'book-open', name: 'Study Lounges', desc: 'Quiet & Collaborative' },
                  { icon: 'coffee', name: 'Communal Kitchens', desc: 'Modern & Equipped' },
                  { icon: 'zap', name: 'Laundry Facilities', desc: 'On-site & Convenient' },
                ].map((amenity, index) => (
                  <div key={amenity.name} className="text-center group" data-aos="zoom-in" data-aos-delay={100 * (index + 1)}>
                      <div className="glass-morphism w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                          <Icon name={amenity.icon} className="w-12 h-12 text-neon-cyan" />
                      </div>
                      <h4 className="font-semibold mb-2">{amenity.name}</h4>
                      <p className="text-sm text-gray-400">{amenity.desc}</p>
                  </div>
                ))}
              </div>
          </div>
      </section>

      {/* --- Apply CTA Section --- */}
      <section id="apply" className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-ocean-blue via-deep-space to-neon-purple opacity-20"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-7xl font-black mb-8 text-gradient" data-aos="fade-up">
            Ready to Find Your Space?
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
            Applications for 2026 are now open. Secure your spot today and experience the best in student living.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center" data-aos="fade-up" data-aos-delay="400">
            <Link to="/apply" className="bg-gradient-to-r from-neon-cyan to-neon-purple px-10 py-5 rounded-full font-bold text-xl hover:glow-effect transition-all duration-300 transform hover:scale-105 pulse-glow">
              Apply Online Now
            </Link>
          </div>
          <p className="text-gray-400 mt-8" data-aos="fade-up" data-aos-delay="600">
            Limited spaces available • Applications are processed on a first-come, first-served basis.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;