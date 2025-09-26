// FILE: src/pages/RoomsPage.jsx
// FINAL REVISED VERSION: Uses the correct room names to fetch and display dynamic prices.

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth to get the api instance
import roomsHeroImage from '../assets/RNI-Films-IMG-47FBDCF7-FF4C-4598-A9E2-CE291410A47F.jpg';
import {
  UsersIcon,
  UserIcon,
  SparklesIcon,
  WifiIcon,
  AcademicCapIcon,
  ArchiveBoxIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
  ArrowPathIcon, // For loading spinner
} from '@heroicons/react/24/outline';

// Static details for the rooms. Pricing will be populated from the API.
const roomDetailsStructure = [
  {
    id: 'deluxe-single',
    name: 'The Deluxe Single Room',
    // --- THIS IS THE FIX ---
    apiKey: 'single room', 
    heroImage: 'https://placehold.co/1200x600/005792/FFFFFF?text=Deluxe+Single+Room+View',
    shortDescription: 'Your private sanctuary designed for focus and comfort, offering a premium student living experience.',
    longDescription: [
      'Experience ultimate privacy and productivity in our Deluxe Single Room. This room is meticulously designed for the discerning student who values a personal haven for study and relaxation.',
      'Fully furnished with high-quality furniture, it provides everything you need to settle in and focus on your academic journey at Sol Plaatje University.',
    ],
    features: [
      { Icon: UserIcon, text: 'Private & Spacious Layout' },
      { Icon: SparklesIcon, text: 'Modern Furnishing & Finishes' },
      { Icon: AcademicCapIcon, text: 'Dedicated Study Desk & Chair' },
      { Icon: WifiIcon, text: 'High-Speed Wi-Fi Included' },
      { Icon: ArchiveBoxIcon, text: 'Ample Storage & Wardrobe Space' },
      { Icon: ShieldCheckIcon, text: 'Secure & Private Environment' },
    ],
    pricing: 'Loading price...', // Default placeholder
    gallery: [
      'https://placehold.co/600x400/005792/FFFFFF?text=Single+Room+1',
      'https://placehold.co/600x400/005792/FFFFFF?text=Single+Room+2',
      'https://placehold.co/600x400/005792/FFFFFF?text=Single+Room+3',
    ],
  },
  {
    id: 'premium-sharing',
    name: 'The Premium Sharing Room',
    // --- THIS IS THE FIX ---
    apiKey: 'sharing room', 
    heroImage: 'https://placehold.co/1200x600/9D6A51/FFFFFF?text=Premium+Sharing+Room+View',
    shortDescription: 'A collaborative living space that combines comfort with affordability, perfect for the social student.',
    longDescription: [
      'Our Premium Sharing Room is the ideal choice for students who thrive in a communal environment. It offers a perfect balance of personal space and shared living, fostering a sense of community.',
      'Each resident has their own dedicated study area and storage, while sharing the room with a fellow SPU student, making it a cost-effective and social option.',
    ],
    features: [
      { Icon: UsersIcon, text: 'Shared Living with Personal Space' },
      { Icon: SparklesIcon, text: 'Modern Twin Furnishings' },
      { Icon: AcademicCapIcon, text: 'Individual Study Desks' },
      { Icon: WifiIcon, text: 'High-Speed Wi-Fi Included' },
      { Icon: ArchiveBoxIcon, text: 'Personal Wardrobe for Each Student' },
      { Icon: CurrencyDollarIcon, text: 'Cost-Effective Accommodation' },
    ],
    pricing: 'Loading price...', // Default placeholder
    gallery: [
      'https://placehold.co/600x400/9D6A51/FFFFFF?text=Sharing+Room+1',
      'https://placehold.co/600x400/9D6A51/FFFFFF?text=Sharing+Room+2',
      'https://placehold.co/600x400/9D6A51/FFFFFF?text=Sharing+Room+3',
    ],
  },
];

const RoomsPage = () => {
  const { api } = useAuth();
  const [roomData, setRoomData] = useState(roomDetailsStructure);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoomPrices = async () => {
      try {
        const response = await api.get('/api/room-types/');
        const apiRoomTypes = response.data;

        // Create a new array with updated prices
        const updatedRoomDetails = roomDetailsStructure.map(room => {
          const apiRoom = apiRoomTypes.find(apiRoom => apiRoom.name.toLowerCase().includes(room.apiKey));
          if (apiRoom) {
            return {
              ...room,
              pricing: `R${parseFloat(apiRoom.monthly_rate).toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} per month`
            };
          }
          return { ...room, pricing: 'Price not available' }; // Fallback if not found
        });

        setRoomData(updatedRoomDetails);
      } catch (err) {
        console.error("Failed to fetch room prices:", err);
        setError("We couldn't load the room prices at the moment. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoomPrices();
  }, [api]);

  return (
    <div className="bg-gray-100">

      <section className="relative h-96 flex items-center justify-center text-white">
        <div className="absolute inset-0">
          <img src={roomsHeroImage} alt="Comfortable and modern student rooms" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-ocean-blue/50"></div>
        </div>
        <div className="relative z-10 text-center p-8 bg-black/20 backdrop-blur-sm rounded-xl border border-white/10">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">Find Your Space</h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-gray-200">
            Comfort, community, and a place to call home.
          </p>
        </div>
      </section>

      {/* Room Details Sections */}
      {isLoading ? (
        <div className="text-center py-24">
          <ArrowPathIcon className="h-12 w-12 text-gray-500 animate-spin mx-auto" />
          <p className="mt-4 text-gray-600">Loading room details...</p>
        </div>
      ) : error ? (
        <div className="text-center py-24 px-6">
          <p className="text-red-600 bg-red-50 p-4 rounded-lg">{error}</p>
        </div>
      ) : (
        roomData.map((room, index) => (
          <section key={room.id} id={room.id} className={`py-16 md:py-24 ${index % 2 === 1 ? 'bg-white' : ''}`}>
            <div className="container mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <h2 className="text-3xl md:text-4xl font-bold text-ocean-blue mb-4">{room.name}</h2>
                  <p className="text-lg text-gray-700 mb-6">{room.shortDescription}</p>
                  {room.longDescription.map((p, i) => (
                    <p key={i} className="text-gray-600 mb-4">{p}</p>
                  ))}
                  
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Features:</h3>
                    <ul className="space-y-3">
                      {room.features.map((feature) => (
                        <li key={feature.text} className="flex items-center">
                          <feature.Icon className="h-6 w-6 text-mountain-tan mr-3" />
                          <span className="text-gray-700">{feature.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-8 p-4 bg-ocean-blue/10 rounded-lg text-center">
                    <p className="text-lg font-semibold text-ocean-blue">{room.pricing}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {room.gallery.map((imgSrc, i) => (
                    <div key={i} className={i === 0 ? 'col-span-2' : ''}>
                      <img src={imgSrc} alt={`${room.name} gallery image ${i + 1}`} className="w-full h-full object-cover rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"/>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))
      )}

      {/* General Call to Action / Next Steps */}
      <section className="py-16 md:py-24 bg-ocean-blue text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Choose Your Room?</h2>
          <p className="text-lg md:text-xl mb-8 max-w-xl mx-auto">
            Our team is here to help you find the perfect fit. Explore our application process or get in touch with any questions.
          </p>
          <div className="space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/apply"
              className="inline-block bg-mountain-tan hover:bg-opacity-80 text-white text-lg font-semibold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
            >
              Apply Online
            </Link>
            <Link
              to="/contact"
              className="inline-block bg-white hover:bg-gray-200 text-ocean-blue text-lg font-semibold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RoomsPage;