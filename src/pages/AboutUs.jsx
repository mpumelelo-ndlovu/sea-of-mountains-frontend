import React from 'react';
import { BuildingOffice2Icon, UserGroupIcon, ShieldCheckIcon, SparklesIcon, AcademicCapIcon } from '@heroicons/react/24/outline';
const coreValues = [
  {
    Icon: UserGroupIcon,
    name: 'Community First',
    description: 'Fostering a supportive and inclusive environment where every student feels at home and can build lasting connections.',
  },
  {
    Icon: ShieldCheckIcon,
    name: 'Safety & Security',
    description: 'Prioritizing the well-being of our residents with comprehensive security measures and a safe living space.',
  },
  {
    Icon: AcademicCapIcon, // Using AcademicCapIcon for student success
    name: 'Focus on Success',
    description: 'Providing facilities and an atmosphere conducive to academic achievement and personal growth for SPU students.',
  },
  {
    Icon: SparklesIcon,
    name: 'Quality Living',
    description: 'Offering modern, well-maintained facilities and amenities to ensure a comfortable and enjoyable student life.',
  },
];

function AboutUs() {
  return (
    <div className="bg-white text-gray-800">
      {/* Page Banner/Header */}
      <section className="bg-mountain-tan text-white py-20 md:py-28">
        <div className="container mx-auto px-6 text-center">
          <BuildingOffice2Icon className="h-16 w-16 md:h-20 md:w-20 text-white mx-auto mb-6 stroke-[1.5]" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">About Sea of Mountains</h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            Discover the story, values, and vision behind Kimberley's premier student accommodation for Sol Plaatje University.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-ocean-blue mb-6">Our Journey & Mission</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Sea of Mountains was founded with a singular vision: to provide Sol Plaatje University students with an unparalleled living experience. We understand the unique needs of students in Kimberley and are dedicated to creating a home away from home that supports both academic pursuits and personal well-being.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Our mission is to offer safe, comfortable, and inspiring student accommodation that fosters a vibrant community, encourages learning, and makes university life memorable. We believe in quality, integrity, and a student-first approach in everything we do.
              </p>
              {/* You can add more paragraphs or details here */}
            </div>
            <div className="flex justify-center">
              {/* Replace with an actual image of your team, building, or a concept image */}
              <img 
                src="https://placehold.co/600x450/005792/FFFFFF?text=Our+Vision" 
                alt="Sea of Mountains Vision" 
                className="rounded-xl shadow-2xl max-w-md w-full object-cover transform transition-all duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 md:py-24 bg-gray-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-ocean-blue mb-16">Our Core Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {coreValues.map((value) => (
              <div key={value.name} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 flex flex-col items-center">
                <value.Icon className="h-12 w-12 md:h-16 md:w-16 text-mountain-tan mb-6 stroke-[1.5]" />
                <h3 className="text-2xl font-semibold text-ocean-blue mb-3">{value.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Commitment to SPU Students Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-ocean-blue mb-6">Dedicated to Sol Plaatje University Students</h2>
          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto mb-8">
            Sea of Mountains is more than just a building; it's a community specifically designed with SPU students in mind. We are committed to providing an environment that is not only close to campus but also enriches your university experience through tailored amenities, a supportive network, and a focus on your academic and personal success. Your journey at SPU is important to us, and we're here to ensure your accommodation supports every step.
          </p>
          {/* You could add specific examples or initiatives here */}
           <a
              href="/apply"
              className="inline-block bg-ocean-blue hover:bg-blue-700 text-white text-lg font-semibold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Become a Resident
            </a>
        </div>
      </section>

      {/* Meet the Team (Optional Placeholder) */}
      {/* <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-ocean-blue mb-16">Meet Our Team</h2>
          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto mb-12">
            Our dedicated team is here to ensure you have the best possible experience at Sea of Mountains.
          </p>
          { // Placeholder for team member cards }
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            { // Example Team Member Card }
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <img src="https://placehold.co/300x300/CCCCCC/757575?text=Team+Photo" alt="Team Member" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"/>
              <h3 className="text-xl font-semibold text-ocean-blue">Full Name</h3>
              <p className="text-mountain-tan">Role/Title</p>
            </div>
            { // Add more team members }
          </div>
        </div>
      </section>
      */}
    </div>
  );
}

export default AboutUs;