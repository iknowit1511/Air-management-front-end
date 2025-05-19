// src/components/FeatureCard.jsx
import React from 'react';

const FeatureCard = ({ icon, title, description, bg }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
      <div className={`${bg} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800 text-center">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
};

export default FeatureCard;