import React from 'react';
import { Link } from 'react-router-dom';
import {
  WifiIcon,
  HomeModernIcon,
  BookOpenIcon,
  FireIcon,
  ReceiptRefundIcon,
  LockClosedIcon,
  ChatBubbleLeftRightIcon,
  TicketIcon,
  SparklesIcon, // General 'modern' or 'quality' icon
  BuildingLibraryIcon, // For 'Communal Spaces' or 'Study Areas'
  SunIcon, // For 'Outdoor Spaces' if applicable
  BoltIcon, // For 'Backup Power' if applicable
} from '@heroicons/react/24/outline';

// Define amenities data within this component for now.
// Consider moving to a shared data file if used in multiple places extensively.
const amenitiesList = [
  { 
    name: 'High-Speed Wi-Fi', 
    Icon: WifiIcon, 
    description: 'Stay connected with reliable, high-speed internet access throughout the premises, perfect for studies and streaming.',
    category: 'Connectivity & Study'
  },
  { 
    name: 'Fully Furnished Rooms', 
    Icon: HomeModernIcon, 
    description: 'Comfortable and modern rooms equipped with essential furniture including a bed, desk, chair, and storage.',
    category: 'Room Comforts'
  },
  { 
    name: 'Dedicated Study Lounges', 
    Icon: BookOpenIcon, 
    description: 'Quiet and well-lit spaces designed for focused study sessions, group work, or individual learning.',
    category: 'Connectivity & Study'
  },
  { 
    name: 'Modern Communal Kitchens', 
    Icon: FireIcon, 
    description: 'Fully equipped kitchens with modern appliances where you can prepare your meals and socialize.',
    category: 'Communal Living'
  },
  { 
    name: 'On-Site Laundry Facilities', 
    Icon: ReceiptRefundIcon, 
    description: 'Convenient and accessible laundry machines available for all residents, making chores easy.',
    category: 'Convenience'
  },
  { 
    name: '24/7 Security & CCTV', 
    Icon: LockClosedIcon, 
    description: 'Your safety is our priority, with round-the-clock security personnel and CCTV surveillance in common areas.',
    category: 'Safety & Security'
  },
  { 
    name: 'Vibrant Social Spaces', 
    Icon: ChatBubbleLeftRightIcon, 
    description: 'Relax, unwind, and connect with fellow students in our comfortable and inviting communal lounges.',
    category: 'Communal Living'
  },
  { 
    name: 'Secure Parking Available', 
    Icon: TicketIcon, 
    description: 'Hassle-free and secure parking options available for residents with vehicles (subject to availability).',
    category: 'Convenience'
  },
  // Add more amenities as needed
  // { 
  //   name: 'Backup Power Supply', 
  //   Icon: BoltIcon, 
  //   description: 'Ensuring minimal disruption to your studies and daily life during power outages.',
  //   category: 'Convenience'
  // },
  // { 
  //   name: 'Outdoor Relaxation Areas', 
  //   Icon: SunIcon, 
  //   description: 'Enjoy fresh air and green spaces to relax or socialize outdoors.',
  //   category: 'Communal Living'
  // },
];

// Helper to group amenities by category
const groupAmenitiesByCategory = (amenities) => {
  return amenities.reduce((acc, amenity) => {
    const category = amenity.category || 'General';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(amenity);
    return acc;
  }, {});
};


function AmenitiesPage() {
  const groupedAmenities = groupAmenitiesByCategory(amenitiesList);

  return (
    <div className="bg-white text-gray-800 font-sans">
      {/* Page Banner */}
      <section className="bg-mountain-tan text-white py-20 md:py-28">
        <div className="container mx-auto px-6 text-center">
          <SparklesIcon className="h-16 w-16 md:h-20 md:w-20 text-white mx-auto mb-6 stroke-[1.5]" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Our Amenities</h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            Experience a comfortable and convenient lifestyle with our wide range of student-focused amenities at Sea of Mountains.
          </p>
        </div>
      </section>

      {/* Amenities Listing Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          {Object.entries(groupedAmenities).map(([category, items]) => (
            <div key={category} className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-ocean-blue mb-10 text-center md:text-left border-b-2 border-mountain-tan pb-4">
                {category}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((amenity) => (
                  <div 
                    key={amenity.name} 
                    className="bg-gray-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out flex items-start space-x-4 transform hover:scale-[1.03]"
                  >
                    <div className="flex-shrink-0 mt-1">
                      <amenity.Icon className="h-10 w-10 text-mountain-tan stroke-[1.5]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-ocean-blue mb-1">{amenity.name}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{amenity.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 md:py-24 bg-gray-100 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-ocean-blue mb-6">
            Experience Unmatched Student Living
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-xl mx-auto">
            Our comprehensive amenities are designed to support your academic journey and enhance your university life.
          </p>
          <Link
            to="/apply"
            className="inline-block bg-mountain-tan hover:bg-opacity-80 text-white text-lg font-semibold py-3.5 px-10 rounded-lg shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Apply for Accommodation
          </Link>
        </div>
      </section>
    </div>
  );
}

export default AmenitiesPage;