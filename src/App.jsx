// FILE: src/App.jsx
// FINAL REVISED VERSION: Fixes the invalid comment syntax causing the compiler error.

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './utils/ProtectedRoute';
import ApplicationRouteGuard from './utils/ApplicationRouteGuard.jsx';
import ConsentBanner from './components/ConsentBanner.jsx';
import logo from './assets/logo.svg';
import {
  MapPinIcon, ShieldCheckIcon, CubeTransparentIcon, UserGroupIcon, WifiIcon, HomeModernIcon,
  BookOpenIcon, FireIcon, ReceiptRefundIcon, LockClosedIcon, ChatBubbleLeftRightIcon,
  TicketIcon, ChevronRightIcon, Bars3Icon, XMarkIcon, ArrowPathIcon,
  HomeIcon, InformationCircleIcon, BuildingLibraryIcon, PhoneIcon, ArrowRightOnRectangleIcon, UserCircleIcon, DocumentTextIcon, ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';
import AboutUs from './pages/AboutUs';
import RoomsPage from './pages/RoomsPage';
import AmenitiesPage from './pages/AmenitiesPage';
import ApplicationPage from './pages/ApplicationPage';
import ContactPage from './pages/ContactPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import RequestPasswordResetPage from './pages/RequestPasswordResetPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import NotFoundPage from './pages/NotFoundPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import SecurityPolicyPage from './pages/SecurityPolicyPage';

const RotatingText = ({ words, period = 2000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    let ticker;
    if (isDeleting) {
      ticker = setTimeout(() => { setText(currentWord.substring(0, text.length - 1)); }, 100);
    } else {
      ticker = setTimeout(() => { setText(currentWord.substring(0, text.length + 1)); }, 150);
    }
    if (!isDeleting && text === currentWord) {
      setTimeout(() => setIsDeleting(true), period);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }
    return () => clearTimeout(ticker);
  }, [text, isDeleting, currentWord, words, period]);

  useEffect(() => { setCurrentWord(words[currentIndex]); }, [currentIndex, words]);

  return (
    <span className="bg-mountain-tan text-white px-3 py-1 rounded-lg">
      {text}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const AnimatedSection = ({ children, className, style }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  return (
    <section ref={ref} className={`${className} transition-all duration-1000 ease-in-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={style}>
      {children}
    </section>
  );
};

const keyBenefits = [
  { id: 1, Icon: MapPinIcon, title: 'Prime Location', description: 'Perfectly situated for Sol Plaatje University students, with accommodation situated directly on-campus.' },
  { id: 2, Icon: ShieldCheckIcon, title: 'Safe & Secure', description: '24/7 security, CCTV, and secure access control for your peace of mind.' },
  { id: 3, Icon: CubeTransparentIcon, title: 'Modern Amenities', description: 'Fully furnished rooms, high-speed Wi-Fi, study areas, and communal spaces.' },
  { id: 4, Icon: UserGroupIcon, title: 'Vibrant Community', description: 'Join a vibrant, supportive and friendly student life experience.' },
];

const amenitiesForHomepage = [
  { name: 'High-Speed Wi-Fi', Icon: WifiIcon }, { name: 'Furnished Rooms', Icon: HomeModernIcon },
  { name: 'Study Lounges', Icon: BookOpenIcon }, { name: 'Communal Kitchens', Icon: FireIcon },
  { name: 'Laundry Facilities', Icon: ReceiptRefundIcon }, { name: '24/7 Security', Icon: LockClosedIcon },
  { name: 'Social Spaces', Icon: ChatBubbleLeftRightIcon }, { name: 'Parking Available', Icon: TicketIcon },
];

const roomTypesDataForHomepage = [
  { name: 'The Deluxe Single Room', description: 'Your own private sanctuary, fully furnished with a single bed, dedicated study desk, and generous storage solutions.', imageUrl: 'https://placehold.co/600x400/005792/FFFFFF?text=Deluxe+Single', link: '/rooms#deluxe-single' },
  { name: 'The Sharing Room', description: 'A comfortable and spacious twin sharing room, perfect for making connections, complete with seperateindividual study areas.', imageUrl: 'https://placehold.co/600x400/9d6a51/FFFFFF?text=Sharing+Room', link: '/rooms#sharing-room' },
];

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function HomePage() {
  const heroImageUrl = '/hero-background.jpg';
  const { user, hasApplication, loading } = useAuth();
  const applicationWords = ["Apply Now", "for 2026", "Secure Your Spot"];
  const subtleBgPattern = { backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239ca3af' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` };

  return (
    <>
      <section id="hero" style={{ backgroundImage: `url(${heroImageUrl})` }} className="bg-cover bg-center h-[calc(100vh-72px)] text-white flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-0"></div>
        <div className="relative z-10 text-center p-6 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-shadow-lg animate-zoom-in">Experience Premium Student Accommodation in Kimberley.</h1>
          <div className="mt-6 text-3xl md:text-5xl font-bold text-shadow-lg animate-zoom-in animation-delay-200"><RotatingText words={applicationWords} /></div>
          <p className="text-xl md:text-2xl mt-8 mb-10 text-gray-100 text-shadow-md animate-zoom-in animation-delay-400">Sol Plaatje University Accredited Off-Campus accommodation, located at the heart of Campus.</p>
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 animate-zoom-in animation-delay-600">
            <Link to="/rooms" className="inline-block bg-ocean-blue hover:bg-blue-700 text-white text-lg font-semibold py-3.5 px-10 rounded-lg shadow-xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">Explore Rooms</Link>
            {user && !loading && hasApplication && (<Link to="/dashboard" className="inline-block bg-mountain-tan hover:bg-yellow-700 text-white text-lg font-semibold py-3.5 px-10 rounded-lg shadow-xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">View Dashboard</Link>)}
            {(!user || (user && !loading && !hasApplication)) && (<Link to="/apply" className="inline-block bg-mountain-tan hover:bg-yellow-700 text-white text-lg font-semibold py-3.5 px-10 rounded-lg shadow-xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">Apply Today</Link>)}
          </div>
        </div>
      </section>
      <AnimatedSection className="py-20 md:py-28 bg-white" style={subtleBgPattern}>
          <div className="container mx-auto px-6 text-center">
              <h2 className="text-3xl md:text-5xl font-bold text-ocean-blue mb-6">Why Sea of Mountains?</h2>
              <p className="text-lg text-gray-600 mb-16 max-w-3xl mx-auto">We offer students a convenient, secure and supportive, environment where you can thrive.</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">{keyBenefits.map((benefit, index) => (<div key={benefit.id} className={`bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 flex flex-col items-center animation-delay-${index * 100}`}><benefit.Icon className="h-16 w-16 text-mountain-tan mb-6 stroke-[1.5]" /><h3 className="text-2xl font-semibold text-ocean-blue mb-3">{benefit.title}</h3><p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p></div>))}</div>
          </div>
      </AnimatedSection>
      <AnimatedSection className="py-20 md:py-28 bg-ocean-blue text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16"><h2 className="text-4xl md:text-5xl font-bold mb-6">Find Your Perfect Space</h2><p className="text-lg text-gray-200 max-w-3xl mx-auto">Choose between our private Deluxe Single Rooms or vibrant Sharing Rooms, all fully furnished and designed for student success.</p></div>
          <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">{roomTypesDataForHomepage.map((room) => ( <div key={room.name} className="bg-white text-gray-800 rounded-xl shadow-2xl overflow-hidden group flex flex-col"><div className="relative h-64"><img src={room.imageUrl} alt={room.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"/><div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div></div><div className="p-8 flex flex-col flex-grow"><h3 className="text-3xl font-bold text-ocean-blue mb-3">{room.name}</h3><p className="text-gray-600 mb-6 leading-relaxed flex-grow">{room.description}</p><Link to={room.link} className="inline-flex items-center self-start text-mountain-tan font-semibold text-lg hover:underline transition-colors duration-300">Learn More <ChevronRightIcon className="ml-1 h-5 w-5"/></Link></div></div>))}</div>
           <div className="text-center mt-12"><Link to="/rooms" className="bg-mountain-tan hover:bg-opacity-80 text-white text-lg font-semibold py-3.5 px-8 rounded-lg shadow-xl transition-all duration-300 transform hover:scale-105">View All Room Options</Link></div>
        </div>
      </AnimatedSection>
      <AnimatedSection className="py-20 md:py-28 bg-white" style={subtleBgPattern}>
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-ocean-blue mb-16">Everything You Need, All In One Place</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-10">{amenitiesForHomepage.map((amenity) => (<div key={amenity.name} className="flex flex-col items-center group cursor-pointer"><div className="p-5 bg-gray-100 rounded-full shadow-md group-hover:bg-mountain-tan group-hover:shadow-lg transition-all duration-300 ease-in-out mb-4 transform group-hover:scale-110 group-hover:-translate-y-1"><amenity.Icon className="h-10 w-10 text-ocean-blue group-hover:text-white transition-colors duration-300 stroke-[1.5]" /></div><p className="text-gray-700 font-semibold text-lg group-hover:text-ocean-blue transition-colors duration-300">{amenity.name}</p></div>))}</div>
          <div className="text-center mt-16"><Link to="/amenities" className="bg-ocean-blue hover:bg-opacity-90 text-white text-lg py-3 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105">Explore All Amenities</Link></div>
        </div>
      </AnimatedSection>
      <AnimatedSection className="py-20 md:py-28 bg-gray-100" style={subtleBgPattern}>
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-ocean-blue mb-6">More Than Just Accommodation</h2>
          <p className="text-lg text-gray-600 mb-16 max-w-3xl mx-auto">Become part of the vibrant Sea of Mountains community. Make friends, create memories, and feel at home.</p>
          <div className="grid md:grid-cols-3 gap-10">{[1,2,3].map(i => (<div key={i} className="bg-white rounded-xl shadow-xl overflow-hidden group"><img src={`https://placehold.co/600x400/${i % 2 === 0 ? '005792' : '9d6a51'}/FFFFFF?text=Community+Vibe+${i}`} alt={`Student Life ${i}`} className="w-full h-56 object-cover group-hover:opacity-80 transition-opacity duration-300"/><div className="p-6"><h3 className="text-xl font-semibold text-ocean-blue mb-2">Student Gatherings</h3><p className="text-gray-600 text-sm">Regular events and activities to help you connect and unwind.</p></div></div>))}</div>
        </div>
      </AnimatedSection>
      <section id="apply-cta" className="py-24 md:py-36 bg-ocean-blue text-white"><div className="container mx-auto px-6 text-center"><h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Ready to Find Your Perfect Student Home?</h2><p className="text-xl text-gray-200 mb-12 max-w-2xl mx-auto">Applications for Sea of Mountains are now open. Secure your spot today and experience the best student living in Kimberley.</p>{(!user || (user && !loading && !hasApplication)) && (<Link to="/apply" className="bg-mountain-tan hover:bg-opacity-80 text-white text-xl font-semibold py-4 px-12 rounded-lg shadow-xl transition-all duration-300 transform hover:scale-105">Apply Online Now</Link>)}</div></section>
    </>
  );
}


// --- Main App Component with Routing ---
function App() {
  return (<BrowserRouter><AuthProvider><AppContent /></AuthProvider></BrowserRouter>);
}

// --- AppContent Component ---
function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logoutUser, hasApplication, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    setIsMenuOpen(false);
    navigate('/');
  };
  
  const navLinks = [
    { to: "/", text: "Home", Icon: HomeIcon },
    { to: "/about", text: "About Us", Icon: InformationCircleIcon },
    { to: "/rooms", text: "Rooms", Icon: HomeModernIcon },
    { to: "/amenities", text: "Amenities", Icon: BuildingLibraryIcon },
    { to: "/contact", text: "Contact", Icon: PhoneIcon },
  ];

  if (loading) {
    return (
         <div className="flex justify-center items-center h-screen bg-gray-100">
             <div className="text-center">
                 <img src={logo} alt="Sea of Mountains Logo" className="h-20 w-auto mx-auto mb-4 animate-pulse" />
                 <ArrowPathIcon className="h-8 w-8 text-gray-500 animate-spin mx-auto" />
             </div>
         </div>
    );
  }
  
  return (
    <>
      <ScrollToTop />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-col min-h-screen font-sans antialiased bg-gray-50">
        <nav className="bg-ocean-blue text-white shadow-lg sticky top-0 z-50 transition-all duration-300">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              <img src={logo} alt="Sea of Mountains Logo" className="h-12 w-auto" />
            </Link>
            <div className="hidden md:flex items-center space-x-6 text-sm">
              {navLinks.map(link => (
                <Link key={link.text} to={link.to} className="hover:text-mountain-tan transition-colors duration-300 font-medium">{link.text}</Link>
              ))}
              <div className="w-px h-6 bg-white/20"></div>
              {user ? (
                <>
                  <Link to="/dashboard" className="hover:text-mountain-tan transition-colors duration-300 font-medium">Dashboard</Link>
                  <button onClick={handleLogout} className="hover:text-mountain-tan transition-colors duration-300 font-medium">Logout</button>
                </>
              ) : (<Link to="/login" className="hover:text-mountain-tan transition-colors duration-300 font-medium">Login</Link>)}
              {user && !loading && !hasApplication && (<Link to="/apply" className="bg-mountain-tan hover:bg-opacity-80 text-white py-2.5 px-6 rounded-md shadow-md transition-all duration-300 transform hover:scale-105 text-sm font-semibold">Apply Now</Link>)}
            </div>
            <div className="md:hidden"><button onClick={() => setIsMenuOpen(true)} className="text-white focus:outline-none"><Bars3Icon className="w-8 h-8" /></button></div>
          </div>
        </nav>
        <div className={`fixed inset-0 bg-ocean-blue z-50 flex flex-col transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex justify-between items-center p-6 border-b border-white/20">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              <img src={logo} alt="Sea of Mountains Logo" className="h-10 w-auto" />
            </Link>
            <button onClick={() => setIsMenuOpen(false)} className="text-white"><XMarkIcon className="w-8 h-8" /></button>
          </div>
          <div className="flex flex-col flex-grow justify-center items-center -mt-16 space-y-2 px-6">
            {user && (<div className={`w-full text-center p-4 mb-4 transition-transform duration-500 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-10'}`} style={{ transitionDelay: '100ms' }}><UserCircleIcon className="h-16 w-16 mx-auto text-white/50 mb-2"/><p className="text-xl font-semibold text-white">Welcome, {user.first_name}!</p></div>)}
            {navLinks.map((link, index) => (<Link key={link.to} to={link.to} className={`w-full text-left text-2xl text-white font-bold py-4 px-4 rounded-lg flex items-center hover:bg-white/10 transition-all duration-500 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-10'}`} style={{ transitionDelay: `${150 + index * 50}ms` }} onClick={() => setIsMenuOpen(false)}><link.Icon className="w-7 h-7 mr-4 text-white/80"/>{link.text}</Link>))}
          </div>
          <div className={`p-6 border-t border-white/20 transition-transform duration-500 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-10'}`} style={{ transitionDelay: '400ms' }}>
            {user ? (
               <div className="space-y-3">
                 {!loading && !hasApplication && (<Link to="/apply" className="w-full flex items-center justify-center text-center bg-mountain-tan text-white py-3 px-6 rounded-lg text-lg font-bold" onClick={() => setIsMenuOpen(false)}><DocumentTextIcon className="w-6 h-6 mr-2"/> Apply Now</Link>)}
                  <Link to="/dashboard" className="w-full flex items-center justify-center text-center bg-white/10 text-white py-3 px-6 rounded-lg text-lg font-bold" onClick={() => setIsMenuOpen(false)}><UserCircleIcon className="w-6 h-6 mr-2"/> My Dashboard</Link>
                  <button onClick={handleLogout} className="w-full flex items-center justify-center text-center bg-transparent text-white py-3 px-6 rounded-lg text-lg font-bold"><ArrowLeftOnRectangleIcon className="w-6 h-6 mr-2"/> Logout</button>
               </div>
            ) : (
              <div className="space-y-3">
                <Link to="/apply" className="w-full flex items-center justify-center text-center bg-mountain-tan text-white py-3 px-6 rounded-lg text-lg font-bold" onClick={() => setIsMenuOpen(false)}><DocumentTextIcon className="w-6 h-6 mr-2"/> Apply Now</Link>
                <Link to="/login" className="w-full flex items-center justify-center text-center bg-white/10 text-white py-3 px-6 rounded-lg text-lg font-bold" onClick={() => setIsMenuOpen(false)}><ArrowRightOnRectangleIcon className="w-6 h-6 mr-2"/> Login</Link>
              </div>
            )}
          </div>
        </div>
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/rooms" element={<RoomsPage />} />
            <Route path="/amenities" element={<AmenitiesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/request-password-reset" element={<RequestPasswordResetPage />} />
            <Route path="/reset-password/:uidb64/:token/" element={<ResetPasswordPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/security-policy" element={<SecurityPolicyPage />} />
            <Route path="/apply" element={<ApplicationRouteGuard><ApplicationPage /></ApplicationRouteGuard>} />
            <Route path="/dashboard" element={<ProtectedRoute />}>
              <Route index element={<DashboardPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <footer className="bg-gray-900 text-gray-400 py-16">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-10 mb-10 text-center md:text-left">
                <div>
                    <h3 className="text-2xl font-bold text-white mb-4">Sea of Mountains</h3>
                    <p className="mb-3 text-sm">Your premier student accommodation for Sol Plaatje University.</p>
                    <p className="text-sm">Kimberley, South Africa</p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-white mb-5">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/about" className="hover:text-mountain-tan transition-colors">About Us</Link></li>
                        <li><Link to="/rooms" className="hover:text-mountain-tan transition-colors">Room Types</Link></li>
                        <li><Link to="/amenities" className="hover:text-mountain-tan transition-colors">Amenities</Link></li>
                        <li><Link to="/apply" className="hover:text-mountain-tan transition-colors">Apply Now</Link></li>
                        <li><Link to="/contact" className="hover:text-mountain-tan transition-colors">Contact Us</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-white mb-5">Get In Touch</h3>
                    <address className="not-italic text-sm space-y-2">
                        <p>Have questions? We're here to help!</p>
                        <p><strong>Email:</strong> <a href="mailto:info@seaofmountains.co.za" className="hover:text-mountain-tan transition-colors">info@seaofmountains.co.za</a> (placeholder)</p>
                        <p><strong>Phone:</strong> <a href="tel:+27530000000" className="hover:text-mountain-tan transition-colors">+27 53 000 0000</a> (placeholder)</p>
                    </address>
                </div>
            </div>
            <div className="border-t border-gray-700 pt-10 text-center text-sm">
                <div className="flex justify-center space-x-6 mb-4">
                    <Link to="/privacy-policy" className="hover:text-mountain-tan transition-colors">Privacy Policy</Link>
                    <Link to="/security-policy" className="hover:text-mountain-tan transition-colors">Security Policy</Link>
                </div>
                <p>&copy; {new Date().getFullYear()} Sea of Mountains Student Accommodation. All Rights Reserved.</p>
                <p className="mt-1">Designed with care in Kimberley.</p>
            </div>
          </div>
        </footer>
        <ConsentBanner />
      </div>
    </>
  );
}

export default App;