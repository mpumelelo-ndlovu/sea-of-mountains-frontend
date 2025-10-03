// FILE: src/pages/HomePage.jsx
// REVISED: Imported room images and updated application step descriptions.

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  MapPinIcon, ShieldCheckIcon, CubeTransparentIcon, UserGroupIcon, WifiIcon, HomeModernIcon,
  FireIcon, ReceiptRefundIcon, LockClosedIcon, ChatBubbleLeftRightIcon,
  TicketIcon, ChevronRightIcon, TvIcon, BanknotesIcon, ArrowDownTrayIcon
} from '@heroicons/react/24/outline';
import AnimatedSection from '../components/AnimatedSection';
import GradientText from '../components/GradientText';
import RotatingText from '../components/RotatingText';
import houseRulesPdf from '../assets/sea-of-mountains-rules-2025.pdf';
import sharingRoomImage from '../assets/sroom1.webp'; 
import singleRoomImage from '../assets/single1.webp';
import sunitRoomImage from '../assets/sunit1.webp';
import heroImageUrl from '../assets/hero-background.webp';

const keyBenefits = [
  { id: 1, Icon: MapPinIcon, title: 'Prime Location', description: 'Perfectly situated for Sol Plaatje University students, with accommodation situated directly on-campus.' },
  { id: 2, Icon: ShieldCheckIcon, title: 'Safe & Secure', description: '24/7 security, CCTV, and secure access control for your peace of mind.' },
  { id: 3, Icon: CubeTransparentIcon, title: 'Modern Amenities', description: 'Fully furnished rooms, high-speed Wi-Fi, study areas, and communal spaces.' },
  { id: 4, Icon: UserGroupIcon, title: 'Vibrant Community', description: 'Join a vibrant, supportive and friendly student life experience.' },
  { id: 5, Icon: BanknotesIcon, title: 'All Bursaries', description: 'We accept NSFAS, private bursaries, and self-paying students.' },
];

const amenitiesForHomepage = [
  { name: 'High-Speed Wi-Fi', Icon: WifiIcon },
  { name: 'Furnished Rooms', Icon: HomeModernIcon },
  { name: 'TV Rooms', Icon: TvIcon },
  { name: 'Communal Kitchens', Icon: FireIcon },
  { name: 'Laundry Facilities', Icon: ReceiptRefundIcon },
  { name: '24/7 Security', Icon: LockClosedIcon },
  { name: 'Social Spaces', Icon: ChatBubbleLeftRightIcon },
  { name: 'Parking Available', Icon: TicketIcon },
];

const roomTypesDataForHomepage = [
  { name: 'The Single Room', featured: false, description: 'Your own private sanctuary, fully furnished with a single bed, dedicated study desk, and generous storage solutions.', imageUrl: singleRoomImage, link: '/rooms#single-room' },
  { name: 'The 2-Unit Single Room', featured: true, description: 'Enjoy the privacy of a single room with the social benefits of a small, two-person commune, sharing a modern kitchen and a larger bathroom.', imageUrl: sunitRoomImage, link: '/rooms#2-unit-single', borderColor: '#FFD700' },
  { name: 'The Sharing Room', featured: false, description: 'A comfortable and spacious twin sharing room, perfect for making connections, complete with seperateindividual study areas.', imageUrl: sharingRoomImage, link: '/rooms#sharing-room' },
];

const applicationSteps = [
    {
        step: "01",
        title: "APPLY",
        description: "Complete the online application form and submit all your supporting documents through our easy-to-use portal.",
    },
    {
        step: "02",
        title: "APPROVE & SIGN",
        description: "You will then receive provisional approval after mandatory checks. A R550 admin fee is then payable within 14 days to finalize and complete your application.",
    },
    {
        step: "03",
        title: "YOU ARE READY FOR 2026",
        description: "After the application is finalized, you are now ready to settle in your new home at Sea of Mountains in 2026.",
    }
];


function HomePage() {
  const { user, hasApplication, loading } = useAuth();
  const subtleBgPattern = { backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239ca3af' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` };
  const rotatingWords = ["Apply Now", "for 2026", "Secure Your Spot"];

  return (
    <>
      <section id="hero" style={{ backgroundImage: `url(${heroImageUrl})` }} className="bg-cover bg-center h-[calc(100vh-80px)] text-white flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-0"></div>
        <div className="relative z-10 text-center p-6 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-shadow-lg animate-zoom-in">
            Experience Premium Student Accommodation in Kimberley.
          </h1>
          <div className="mt-6 text-3xl md:text-5xl font-bold text-shadow-lg animate-zoom-in animation-delay-200">
            <RotatingText words={rotatingWords} />
          </div>
          <p className="text-xl md:text-2xl mt-8 mb-10 text-gray-100 text-shadow-md animate-zoom-in animation-delay-400">Sol Plaatje University Accredited Off-Campus accommodation, located at the heart of Campus.</p>
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 animate-zoom-in animation-delay-600">
            <Link 
              to="/rooms" 
              className="inline-block bg-ocean-blue hover:bg-blue-700 text-white text-lg font-semibold py-3.5 px-10 rounded-lg shadow-xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black/50 focus:ring-ocean-blue"
            >
              Explore Rooms
            </Link>
            {user && !loading && hasApplication && (
              <Link 
                to="/dashboard" 
                className="inline-block bg-mountain-tan hover:bg-yellow-700 text-white text-lg font-semibold py-3.5 px-10 rounded-lg shadow-xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black/50 focus:ring-mountain-tan"
              >
                View Dashboard
              </Link>
            )}
            {(!user || (user && !loading && !hasApplication)) && (
               <Link 
                to="/apply" 
                className="inline-block bg-mountain-tan hover:bg-yellow-700 text-white text-lg font-semibold py-3.5 px-10 rounded-lg shadow-xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black/50 focus:ring-mountain-tan"
              >
                Apply Today
              </Link>
            )}
          </div>
        </div>
      </section>

      <AnimatedSection className="py-20 md:py-28 bg-white" style={subtleBgPattern}>
          <div className="container mx-auto px-6 text-center">
              <h2 className="text-5xl md:text-7xl font-black mb-6">
                <GradientText colors={['#005792', '#9D6A51', '#005792']}>
                  Why Sea of Mountains?
                </GradientText>
              </h2>
              <p className="text-lg text-gray-600 mb-16 max-w-3xl mx-auto">We provide the space, you create the home.</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 mt-16 max-w-7xl mx-auto">{keyBenefits.map((benefit, index) => (<div key={benefit.id} className={`bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 flex flex-col items-center animation-delay-${index * 100}`}><benefit.Icon className="h-16 w-16 text-mountain-tan mb-6 stroke-[1.5]" /><h3 className="text-2xl font-semibold text-ocean-blue mb-3">{benefit.title}</h3><p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p></div>))}</div>
          </div>
      </AnimatedSection>
      
      <AnimatedSection className="py-20 md:py-28 bg-ocean-blue text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16"><h2 className="text-4xl md:text-5xl font-bold mb-6">Find Your Perfect Space</h2><p className="text-lg text-gray-200 max-w-3xl mx-auto">Choose between our private Single Rooms, collaborative Sharing Rooms, or our exclusive 2-Unit apartments.</p></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {roomTypesDataForHomepage.map((room) => {
              const roomCard = (
                <div className="bg-white text-gray-800 rounded-xl shadow-2xl overflow-hidden group flex flex-col h-full">
                  <div className="relative h-64">
                    <img src={room.imageUrl} alt={room.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-3xl font-bold text-ocean-blue mb-3">{room.name}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed flex-grow">{room.description}</p>
                    <Link to={room.link} className="inline-flex items-center self-start text-mountain-tan font-semibold text-lg hover:underline transition-colors duration-300">
                      Learn More <ChevronRightIcon className="ml-1 h-5 w-5"/>
                    </Link>
                  </div>
                </div>
              );

              if (room.featured) {
                return (
                  <div key={room.name} className="rounded-2xl shadow-2xl ring-4 ring-yellow-400">
                    {roomCard}
                  </div>
                );
              }
              
              return <div key={room.name}>{roomCard}</div>;
            })}
          </div>
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
      <section id="apply-cta" className="py-24 md:py-36 bg-ocean-blue text-white">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-12">Your Journey Starts Here</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {applicationSteps.map((step) => (
                    <div key={step.step} className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-xl shadow-2xl text-left relative overflow-hidden">
                        <div className="absolute top-0 right-0 text-9xl font-black text-white/5 -mt-4 -mr-4" style={{ zIndex: 1 }}>{step.step}</div>
                        <div className="relative" style={{ zIndex: 2 }}>
                            <h3 className="text-sm font-semibold uppercase text-mountain-tan mb-2">Step {step.step}</h3>
                            <h4 className="text-2xl font-bold text-white mb-4">{step.title}</h4>
                            <p className="text-gray-200">{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
                {(!user || (user && !loading && !hasApplication)) && (
                    <Link to="/apply" className="bg-mountain-tan hover:bg-opacity-80 text-white text-xl font-semibold py-4 px-12 rounded-lg shadow-xl transition-all duration-300 transform hover:scale-105">
                        Apply Online Now
                    </Link>
                )}
                <a href={houseRulesPdf} download="Sea of Mountains - House Rules 2025.pdf" className="bg-white/10 hover:bg-white/20 text-white text-xl font-semibold py-4 px-12 rounded-lg shadow-xl transition-all duration-300 transform hover:scale-105 inline-flex items-center">
                    <ArrowDownTrayIcon className="h-6 w-6 mr-3" />
                    Download House Rules
                </a>
            </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;