import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  MapPinIcon, ShieldCheckIcon, CubeTransparentIcon, UserGroupIcon, WifiIcon, HomeModernIcon,
  FireIcon, ReceiptRefundIcon, LockClosedIcon, ChatBubbleLeftRightIcon,
  TicketIcon, ChevronRightIcon, TvIcon, BanknotesIcon,
} from '@heroicons/react/24/outline';
import AnimatedSection from '../components/AnimatedSection';
import GradientText from '../components/GradientText';
import ElectricBorder from '../components/ElectricBorder';
import RotatingText from '../components/RotatingText';

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
  { name: 'The Single Room', featured: false, description: 'Your own private sanctuary, fully furnished with a single bed, dedicated study desk, and generous storage solutions.', imageUrl: 'https://placehold.co/600x400/005792/FFFFFF?text=Single+Room', link: '/rooms#deluxe-single' },
  { name: 'The 2-Unit Single Room', featured: true, description: 'Enjoy the privacy of a single room with the social benefits of a small, two-person commune, sharing a modern kitchen and a larger bathroom.', imageUrl: 'https://placehold.co/600x400/FFD700/000000?text=2-Unit+Single', link: '/rooms#2-unit-single', borderColor: '#FFD700' },
  { name: 'The Sharing Room', featured: false, description: 'A comfortable and spacious twin sharing room, perfect for making connections, complete with seperateindividual study areas.', imageUrl: 'https://placehold.co/600x400/9d6a51/FFFFFF?text=Sharing+Room', link: '/rooms#sharing-room' },
];

function HomePage() {
  const heroImageUrl = '/hero-background.jpg';
  const { user, hasApplication, loading } = useAuth();
  const subtleBgPattern = { backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239ca3af' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` };
  const rotatingWords = ["Apply Now", "for 2026", "Secure Your Spot"];

  return (
    <>
      <section id="hero" style={{ backgroundImage: `url(${heroImageUrl})` }} className="bg-cover bg-center h-[calc(100vh-72px)] text-white flex flex-col items-center justify-center relative overflow-hidden">
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
                    <img src={room.imageUrl} alt={room.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"/>
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
                  <ElectricBorder key={room.name} color={room.borderColor} style={{ borderRadius: '1.5rem' }} speed={2} chaos={0.8} thickness={2}>
                    {roomCard}
                  </ElectricBorder>
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
      <AnimatedSection className="py-20 md:py-28 bg-gray-100">
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

export default HomePage;