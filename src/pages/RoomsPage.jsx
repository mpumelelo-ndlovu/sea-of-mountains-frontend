import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import {
  ChevronRightIcon,
  UsersIcon, // For Sharing Room
  UserIcon, // For Single Room
  SparklesIcon, // For features like 'Modern Furnishing'
  WifiIcon, // For 'High-Speed Wi-Fi'
  AcademicCapIcon, // For 'Dedicated Study Desk'
  ArchiveBoxIcon, // For 'Ample Storage'
  ShieldCheckIcon, // For 'Secure Environment'
  CurrencyDollarIcon, // For pricing aspect
  HomeModernIcon, // For the banner
} from '@heroicons/react/24/outline';

const roomDetails = [
  {
    id: 'deluxe-single', // Used for linking via hash on the page
    name: 'The Deluxe Single Room',
    heroImage: 'https://placehold.co/1200x600/005792/FFFFFF?text=Deluxe+Single+Room+View',
    shortDescription: 'Your private sanctuary designed for focus and comfort, offering a premium student living experience.',
    longDescription: [
      'Experience ultimate privacy and productivity in our Deluxe Single Room. This room is meticulously designed for the discerning student who values a personal haven for study and relaxation.',
      'Fully furnished with high-quality furniture, it provides everything you need to settle in and focus on your academic journey at Sol Plaatje University.',
    ],
    features: [
      { Icon: UserIcon, text: 'Private & Spacious Layout' },
      { Icon: SparklesIcon, text: 'Modern, Quality Furnishings' },
      { Icon: AcademicCapIcon, text: 'Dedicated Study Desk' },
      { Icon: ArchiveBoxIcon, text: 'Ample Storage & Wardrobe Space' },
      { Icon: WifiIcon, text: 'High-Speed Internet Access' },
      { Icon: ShieldCheckIcon, text: 'Secure Room Access' },
    ],
    pricingInfo: 'Competitively priced for the discerning student. Enquire for detailed rates.',
    galleryImages: [ 
      'https://placehold.co/600x400/005792/FFFFFF?text=Single+View+1',
      'https://placehold.co/600x400/004B77/FFFFFF?text=Single+View+2',
      'https://placehold.co/600x400/00385A/FFFFFF?text=Single+View+3',
    ],
    ctaLink: '/apply?room=deluxe-single', // Example link for application form
  },
  {
    id: 'sharing-room', // Used for linking via hash on the page
    name: 'The Sharing Room',
    heroImage: 'https://placehold.co/1200x600/9d6a51/FFFFFF?text=Spacious+Sharing+Room',
    shortDescription: 'A vibrant and collaborative living space, perfect for making connections while enjoying personal study areas.',
    longDescription: [
      'Our Sharing Rooms offer a fantastic balance of shared living and personal space. Share with a fellow student in a comfortable, well-equipped room designed to support both your studies and social life.',
      'Each resident enjoys their own single bed, study desk, and storage, fostering a productive yet friendly atmosphere.',
    ],
    features: [
      { Icon: UsersIcon, text: 'Comfortable Twin Sharing Setup' },
      { Icon: SparklesIcon, text: 'Fully Furnished for Two' },
      { Icon: AcademicCapIcon, text: 'Individual Study Desks & Chairs' },
      { Icon: ArchiveBoxIcon, text: 'Personal Storage for Each Resident' },
      { Icon: WifiIcon, text: 'High-Speed Internet Access Included' },
      { Icon: ShieldCheckIcon, text: 'Secure & Conducive Environment' },
    ],
    pricingInfo: 'An affordable and social option. Enquire for detailed sharing rates.',
    galleryImages: [ 
      'https://placehold.co/600x400/9D6A51/FFFFFF?text=Sharing+View+1',
      'https://placehold.co/600x400/825844/FFFFFF?text=Sharing+View+2',
      'https://placehold.co/600x400/674634/FFFFFF?text=Sharing+View+3',
    ],
    ctaLink: '/apply?room=sharing-room', // Example link for application form
  },
];

function RoomsPage() {
  return (
    <div className="bg-gray-50 text-gray-800 font-sans"> {/* Ensure font-sans is applied if not inherited */}
      {/* Page Banner */}
      <section className="bg-ocean-blue text-white py-20 md:py-28">
        <div className="container mx-auto px-6 text-center">
          <HomeModernIcon className="h-16 w-16 md:h-20 md:w-20 text-white mx-auto mb-6 stroke-[1.5]" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Our Accommodation</h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            Find your ideal living space at Sea of Mountains. We offer rooms designed for comfort, study, and a great student experience.
          </p>
        </div>
      </section>

      {/* Room Details Sections */}
      {roomDetails.map((room, index) => (
        <section 
          key={room.id} 
          id={room.id} // This id is for hash linking (e.g., /rooms#deluxe-single)
          className={`py-16 md:py-24 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}
        >
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Image Column - alternate image position */}
              <div className={`relative rounded-xl shadow-2xl overflow-hidden h-80 md:h-96 lg:h-[500px] group ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                <img 
                  src={room.heroImage} 
                  alt={room.name} 
                  className="w-full h-full object-cover transform transition-transform duration-700 ease-in-out group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Text Content Column */}
              <div className={`${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                <h2 className="text-3xl md:text-4xl font-bold text-ocean-blue mb-6">{room.name}</h2>
                {room.longDescription.map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-lg text-gray-700 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
                
                <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Key Features:</h3>
                <ul className="space-y-3 mb-8">
                  {room.features.map((feature) => (
                    <li key={feature.text} className="flex items-center text-gray-700">
                      <feature.Icon className="h-6 w-6 text-mountain-tan mr-3 shrink-0 stroke-[1.5]" />
                      <span>{feature.text}</span>
                    </li>
                  ))}
                </ul>

                <div className="bg-mountain-tan/10 p-6 rounded-lg mb-8">
                    <div className="flex items-center text-mountain-tan">
                        <CurrencyDollarIcon className="h-8 w-8 mr-3 stroke-[1.5]"/>
                        <p className="text-lg font-semibold">{room.pricingInfo}</p>
                    </div>
                </div>
                
                <Link
                  to={room.ctaLink}
                  className="inline-flex items-center bg-mountain-tan hover:bg-opacity-80 text-white text-lg font-semibold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Enquire or Apply Now <ChevronRightIcon className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* Mini Gallery for the room */}
            <div className="mt-12 lg:mt-16">
              <h4 className="text-xl font-semibold text-gray-700 mb-4 text-center lg:text-left">Room Glimpses:</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {room.galleryImages.map((imgSrc, imgIdx) => (
                  <div key={imgIdx} className="rounded-lg overflow-hidden shadow-md aspect-w-16 aspect-h-9 group"> {/* aspect ratio for consistency */}
                    <img src={imgSrc} alt={`${room.name} view ${imgIdx + 1}`} className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"/>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* General Call to Action / Next Steps */}
      <section className="py-16 md:py-24 bg-ocean-blue text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Choose Your Room?</h2>
          <p className="text-lg md:text-xl mb-8 max-w-xl mx-auto">
            Our team is here to help you find the perfect fit. Explore our application process or get in touch with any questions.
          </p>
          <div className="space-y-4 sm:space-y-0 sm:space-x-4"> {/* Added responsive spacing for buttons */}
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
}

export default RoomsPage;