// FILE: src/App.jsx
// REVISED: Implemented React.lazy and Suspense for code splitting on heavy pages.

import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './utils/ProtectedRoute';
import ApplicationRouteGuard from './utils/ApplicationRouteGuard.jsx';
import ConsentBanner from './components/ConsentBanner.jsx';
import logo from './assets/logo.svg';
import {
  HomeModernIcon,
  Bars3Icon, XMarkIcon, ArrowPathIcon,
  HomeIcon, InformationCircleIcon, BuildingLibraryIcon, PhoneIcon, ArrowRightOnRectangleIcon, UserCircleIcon, DocumentTextIcon, ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';

// Lazy load heavy pages for code splitting
const ApplicationPage = lazy(() => import('./pages/ApplicationPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const RoomsPage = lazy(() => import('./pages/RoomsPage'));

// Direct imports for non-lazy pages
import HomePage from './pages/HomePage';
import AboutUs from './pages/AboutUs';
import AmenitiesPage from './pages/AmenitiesPage';
import ContactPage from './pages/ContactPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import RequestPasswordResetPage from './pages/RequestPasswordResetPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import NotFoundPage from './pages/NotFoundPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import SecurityPolicyPage from './pages/SecurityPolicyPage';

// Loading component for Suspense
const PageLoader = () => (
    <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-center">
            <img src={logo} alt="Sea of Mountains Logo" className="h-20 w-auto mx-auto mb-4 animate-pulse" />
            <ArrowPathIcon className="h-8 w-8 text-gray-500 animate-spin mx-auto" />
        </div>
    </div>
);


function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {
  // Wrapping with ErrorBoundary is usually done here, assuming ErrorBoundary is defined elsewhere
  // Since the original code didn't define ErrorBoundary, I'm maintaining the original structure but including the provided App wrapper logic.
  return (
    // Assuming ErrorBoundary wraps the BrowserRouter externally or is added here based on your prompt's intent:
    // <ErrorBoundary> 
      <BrowserRouter>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </BrowserRouter>
    // </ErrorBoundary>
  );
}

function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logoutUser, hasApplication, loading } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


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
    return <PageLoader />;
  }
  
  return (
    <>
      <ScrollToTop />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-col min-h-screen font-sans antialiased bg-gray-50">
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-ocean-blue shadow-lg h-16" : "bg-ocean-blue h-20"}`}>
          <div className="w-full px-4 md:px-6 h-full flex justify-between items-center">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex-shrink-0">
              <img src={logo} alt="Sea of Mountains Logo" className={`transition-all duration-300 w-40 ${scrolled ? "h-20" : "h-40"}`} />
            </Link>
            <div className="hidden md:flex items-center space-x-6 text-sm">
              {navLinks.map(link => (
                <Link key={link.text} to={link.to} className="text-white hover:text-mountain-tan transition-colors duration-300 font-medium">{link.text}</Link>
              ))}
              <div className="w-px h-6 bg-white/20"></div>
              {user ? (
                <>
                  <Link to="/dashboard" className="text-white hover:text-mountain-tan transition-colors duration-300 font-medium">Dashboard</Link>
                  <button onClick={handleLogout} className="text-white hover:text-mountain-tan transition-colors duration-300 font-medium">Logout</button>
                </>
              ) : (<Link to="/login" className="text-white hover:text-mountain-tan transition-colors duration-300 font-medium">Login</Link>)}
              {user && !loading && !hasApplication && (<Link to="/apply" className="bg-mountain-tan hover:bg-opacity-80 text-white py-2.5 px-6 rounded-md shadow-md transition-all duration-300 transform hover:scale-105 text-sm font-semibold">Apply Now</Link>)}
            </div>
            <div className="md:hidden"><button onClick={() => setIsMenuOpen(true)} className="text-white focus:outline-none"><Bars3Icon className="w-8 h-8" /></button></div>
          </div>
        </nav>
        <div className={`fixed inset-0 bg-ocean-blue z-50 flex flex-col transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="w-full flex items-center border-b border-white/20 py-2 px-4 justify-between">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              <img src={logo} alt="Sea of Mountains Logo" className="h-12 w-auto" />
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
        <main className="flex-grow pt-20">
          <Suspense fallback={<PageLoader />}>
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
              <Route path="/apply" element={
                <ApplicationRouteGuard>
                  <ApplicationPage />
                </ApplicationRouteGuard>
              } />
              <Route path="/dashboard" element={<ProtectedRoute />}>
                <Route index element={
                  <DashboardPage />
                } />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
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
                        <p><strong>Email:</strong> <a href="mailto:info@somaccommodation.com" className="hover:text-mountain-tan transition-colors">info@somaccommodation.com</a></p>
                        <p><strong>Phone:</strong> <a href="tel:+27607891427" className="hover:text-mountain-tan transition-colors">+27 60 789 1427</a></p>
                    </address>
                </div>
            </div>
            <div className="border-t border-gray-700 pt-10 text-center text-sm">
                <div className="flex justify-center space-x-6 mb-4">
                    <Link to="/privacy-policy" className="hover:text-mountain-tan transition-colors">Privacy Policy</Link>
                    <Link to="/security-policy" className="hover:text-mountain-tan transition-colors">Security Policy</Link>
                </div>
                <p>&copy; {new Date().getFullYear()} Sea of Mountains Student Accommodation. All Rights Reserved.</p>
                <p className="mt-1">Designed by MINTECH DIGITAL</p>
            </div>
          </div>
        </footer>
        <ConsentBanner />
      </div>
    </>
  );
}

export default App;