// components/TestimonialCard.tsx
"use client";

import React from 'react';

interface TestimonialCardProps {
  name: string;
  title: string;
  testimonial: string;
  image: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, title, testimonial, image }) => {
  return (
    <div className="bg-white/30 backdrop-blur-sm p-6 rounded-lg shadow-lg">
      <div className="flex items-center mb-4">
        <img src={image} alt={name} className="w-12 h-12 rounded-full mr-4" />
        <div>
          <h3 className="font-semibold text-[#264653]">{name}</h3>
          <p className="text-gray-600">{title}</p>
        </div>
      </div>
      <p className="text-gray-700">&ldquo;{testimonial}&rdquo;</p>
    </div>
  );
};

export default TestimonialCard;
