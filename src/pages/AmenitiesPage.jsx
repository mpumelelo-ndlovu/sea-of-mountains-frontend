// FILE: src/pages/AmenitiesPage.jsx
// FINAL REVISED VERSION: Adds more detailed amenity descriptions and new categories.

import React from 'react';
import { Link } from 'react-router-dom';
import {
  WifiIcon,
  HomeModernIcon,
  FireIcon,
  ReceiptRefundIcon,
  LockClosedIcon,
  ChatBubbleLeftRightIcon,
  TicketIcon,
  SparklesIcon,
  SunIcon,
  BoltIcon,
  TvIcon,
  CubeTransparentIcon, 
} from '@heroicons/react/24/outline';


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
    description: 'Each room comes standard with essential, high-quality furniture to make your move-in seamless.',
    category: 'Room Comforts'
  },
  { 
    name: 'Room Inclusions', 
    Icon: CubeTransparentIcon, 
    description: {
        points: [
            'Single bed and mattress',
            'Fixed desktop and study chair',
            'Lamp and heater for comfort',
            'Large clothing cupboard with shelves and hanging space',
            'Additional shelving for books and personal items',
            'Mounted wall mirror'
        ]
    },
    category: 'Room Comforts'
  },
  { 
    name: 'TV Rooms', 
    Icon: TvIcon, 
    description: 'Comfortable lounges equipped with TVs for relaxation and entertainment, providing a great space to unwind.',
    category: 'Connectivity & Study'
  },
  { 
    name: 'Communal Kitchens', 
    Icon: FireIcon, 
    description: 'Each fully equipped kitchen features a stove, microwave, fridge, airfryer, toaster, and kettle for all your cooking needs.',
    category: 'Communal Spaces'
  },
    { 
    name: 'Modern Bathrooms', 
    Icon: SparklesIcon, 
    description: [
        'Single & Sharing Communes: Feature two separate shower rooms (with curtain, mirror, basin) and two separate toilet rooms (with mirror, basin).',
        '2-Unit Single Communes: Feature one private, modern bathroom with a glass shower, toilet, basin, and mirror.'
    ],
    category: 'Communal Spaces'
  },
  { 
    name: 'Laundry Facilities', 
    Icon: ReceiptRefundIcon, 
    description: 'On-site washing and drying machines are available 24/7 for your convenience.',
    category: 'Utilities & Services'
  },
  { 
    name: '24/7 Security', 
    Icon: LockClosedIcon, 
    description: 'Your safety is our priority with around-the-clock security personnel, CCTV surveillance, and secure biometric access.',
    category: 'Safety & Security'
  },
  { 
    name: 'Outdoor Social Areas', 
    Icon: SunIcon, 
    description: 'Vibrant outdoor areas designed for students to sit, chill, and interact with friends in a relaxed setting.',
    category: 'Communal Spaces'
  },
  { 
    name: 'Secure Parking', 
    Icon: TicketIcon, 
    description: 'Secure on-site parking is available for students with vehicles, subject to availability.',
    category: 'Utilities & Services'
  },
  {
    name: 'Backup Power',
    Icon: BoltIcon,
    description: 'We have backup generators to ensure that essential services like Wi-Fi, lighting, security, and fridges remain operational during power outages.',
    category: 'Utilities & Services'
  }
];

const groupAmenitiesByCategory = (amenities) => {
  return amenities.reduce((acc, amenity) => {
    (acc[amenity.category] = acc[amenity.category] || []).push(amenity);
    return acc;
  }, {});
};

function AmenitiesPage() {
  const amenitiesByCategory = groupAmenitiesByCategory(amenitiesList);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-ocean-blue text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Everything You Need to Succeed
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Our amenities are thoughtfully curated to support both your academic and personal life, ensuring a comfortable and enriching university experience.
          </p>
        </div>
      </section>

      {/* Amenities Grid Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          {Object.entries(amenitiesByCategory).map(([category, amenities]) => (
            <div key={category} className="mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b-2 border-mountain-tan pb-2 inline-block">
                {category}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {amenities.map((amenity) => (
                  <div 
                    key={amenity.name} 
                    className="flex items-start space-x-6 p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow"
                  >
                    <div className="flex-shrink-0 mt-1">
                      <amenity.Icon className="h-10 w-10 text-mountain-tan stroke-[1.5]" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-ocean-blue mb-2">{amenity.name}</h3>
                        {typeof amenity.description === 'string' && <p className="text-gray-600 text-sm leading-relaxed">{amenity.description}</p>}
                        {Array.isArray(amenity.description) && amenity.description.map((p, i) => <p key={i} className="text-gray-600 text-sm leading-relaxed mt-2">{p}</p>)}
                        {typeof amenity.description === 'object' && amenity.description.points && (
                            <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed mt-2 space-y-1">
                            {amenity.description.points.map((point, i) => <li key={i}>{point}</li>)}
                            </ul>
                        )}
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
            Apply for 2026
          </Link>
        </div>
      </section>
    </div>
  );
}

export default AmenitiesPage;