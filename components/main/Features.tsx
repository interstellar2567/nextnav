"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  MapPinIcon, 
  CameraIcon, 
  ShieldCheckIcon,
  UserGroupIcon,
  StarIcon,
  GlobeAltIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";

const Features = () => {
  const features = [
    {
      icon: <MapPinIcon className="w-12 h-12" />,
      title: "Smart Route Planning",
      description: "AI-powered multi-stop route optimization with real-time traffic updates and intelligent suggestions for the best travel experience.",
      color: "blue"
    },
    {
      icon: <CameraIcon className="w-12 h-12" />,
      title: "AR/VR Previews",
      description: "Experience destinations in augmented and virtual reality before visiting. Get a 360° view of attractions and plan your perfect trip.",
      color: "purple"
    },
    {
      icon: <ShieldCheckIcon className="w-12 h-12" />,
      title: "Safety & SOS",
      description: "24/7 safety monitoring with instant emergency response system. Share location with trusted contacts and get help when needed.",
      color: "red"
    },
    {
      icon: <UserGroupIcon className="w-12 h-12" />,
      title: "Travel Community",
      description: "Connect with fellow travelers, share experiences, and discover new destinations together. Find travel buddies for your adventures.",
      color: "green"
    },
    {
      icon: <GlobeAltIcon className="w-12 h-12" />,
      title: "Local Insights",
      description: "Discover hidden gems and local recommendations. Get authentic experiences with insider tips from locals and experienced travelers.",
      color: "teal"
    },
    {
      icon: <StarIcon className="w-12 h-12" />,
      title: "Rewards & Offers",
      description: "Earn points for your travels and get exclusive deals on bookings, accommodations, and activities. Save money while exploring.",
      color: "yellow"
    }
  ];

  const colorClasses = {
    blue: "text-blue-600 bg-blue-100",
    purple: "text-purple-600 bg-purple-100",
    red: "text-red-600 bg-red-100",
    green: "text-green-600 bg-green-100",
    teal: "text-teal-600 bg-teal-100",
    yellow: "text-yellow-600 bg-yellow-100"
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4"
          >
            <SparklesIcon className="w-4 h-4 mr-2" />
            Why Choose TOURISTA?
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Experience Travel Like
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
              {" "}Never Before
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the future of travel with cutting-edge technology, comprehensive safety features, 
            and a vibrant community of explorers.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl mb-6 ${colorClasses[feature.color as keyof typeof colorClasses]}`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl p-8 md:p-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Your Adventure?
            </h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of travelers who trust TOURISTA for their journey planning and safety. 
              Start planning your next unforgettable trip today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
                Get Started Now
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-semibold">
                Learn More
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
