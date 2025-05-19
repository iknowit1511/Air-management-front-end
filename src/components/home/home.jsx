import React, { Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaPlane, FaCalendarAlt } from 'react-icons/fa';
import Footer from '../common/Footer.jsx';
import plane from '../../assets/plane_3.png';
import video from '../../assets/ams_video.mp4';
import FeatureCard from '../common/featureCard';

// Dữ liệu cho "Why Choose Us"
const features = [
  {
    icon: <FaPlane className="text-blue-600 text-3xl" />,
    title: 'Best Flight Deals',
    description: 'Find the most competitive prices for your flights',
    bg: 'bg-blue-100',
  },
  {
    icon: <FaSearch className="text-green-600 text-3xl" />,
    title: 'Easy Search',
    description: 'Quick and simple flight search experience',
    bg: 'bg-green-100',
  },
  {
    icon: <FaCalendarAlt className="text-purple-600 text-3xl" />,
    title: 'Flexible Dates',
    description: 'Find better prices with flexible date options',
    bg: 'bg-purple-100',
  },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="relative h-[450px] bg-gradient-to-r from-blue-500 to-indigo-600">
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
              Find Your Perfect Flight
            </h1>
            <p className="text-lg md:text-xl mb-6">
              Discover amazing deals on flights worldwide
            </p>
            <button
              onClick={() => navigate('/search-flights')} // Điều hướng đến trang tìm kiếm
              className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition duration-300"
            >
              Explore Now
            </button>
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div className="py-16 bg-white flex justify-center items-center">
        <div className="relative max-w-[900px] w-full">
          <video
            src={video}
            width="900"
            height="250"
            controls
            autoPlay
            loop
            muted
            className="w-full h-[250px] object-cover rounded-xl shadow-lg opacity-50"
            onError={(e) => console.error('Video load error:', e)}
          >
            Your browser does not support the video tag.
          </video>
          <img
            src={plane}
            alt="Take Off"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
            style={{ maxWidth: '400px' }}
            loading="lazy"
            onError={(e) => console.error('Image load error:', e)}
          />
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                bg={feature.bg}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;