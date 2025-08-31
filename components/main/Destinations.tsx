"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  MapPinIcon, 
  StarIcon,
  EyeIcon,
  HeartIcon
} from "@heroicons/react/24/outline";

const Destinations = () => {
  const destinations = [
    {
      id: 1,
      name: "Puri",
      state: "Odisha",
      description: "Sacred city with the famous Jagannath Temple and pristine beaches",
      rating: 4.8,
      visitors: "2.5M+",
      image: "/puri-temple.jpg",
      highlights: ["Jagannath Temple", "Puri Beach", "Local Cuisine"],
      price: "Budget-friendly"
    },
    {
      id: 2,
      name: "Konark",
      state: "Odisha",
      description: "Ancient Sun Temple, a UNESCO World Heritage site with stunning architecture",
      rating: 4.9,
      visitors: "1.2M+",
      image: "/konark-sun.jpg",
      highlights: ["Sun Temple", "UNESCO Site", "Architecture"],
      price: "Budget-friendly"
    },
    {
      id: 3,
      name: "Bhubaneswar",
      state: "Odisha",
      description: "Temple city of India with ancient temples and modern amenities",
      rating: 4.6,
      visitors: "3.1M+",
      image: "/bhubaneswar.jpg",
      highlights: ["Ancient Temples", "Modern City", "Culture"],
      price: "Mid-range"
    },
    {
      id: 4,
      name: "Chilika Lake",
      state: "Odisha",
      description: "Asia's largest brackish water lake with diverse wildlife and scenic beauty",
      rating: 4.7,
      visitors: "800K+",
      image: "/chilika.jpg",
      highlights: ["Wildlife", "Boat Rides", "Nature"],
      price: "Budget-friendly"
    },
    {
      id: 5,
      name: "Raghurajpur",
      state: "Odisha",
      description: "Heritage village known for traditional art and crafts",
      rating: 4.5,
      visitors: "300K+",
      image: "/raghurajpur.jpg",
      highlights: ["Art Village", "Traditional Crafts", "Culture"],
      price: "Budget-friendly"
    },
    {
      id: 6,
      name: "Gopalpur",
      state: "Odisha",
      description: "Serene beach destination with colonial charm and water sports",
      rating: 4.4,
      visitors: "500K+",
      image: "/gopalpur.jpg",
      highlights: ["Beach", "Water Sports", "Colonial Heritage"],
      price: "Mid-range"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Popular
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
              {" "}Destinations
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover amazing destinations in Odisha and beyond. From ancient temples to pristine beaches, 
            find your perfect travel experience.
          </p>
        </motion.div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                {/* Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-blue-200 to-teal-200 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <MapPinIcon className="w-16 h-16 text-blue-600" />
                  </div>
                  <div className="absolute top-4 right-4">
                    <button className="p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                      <HeartIcon className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                      {destination.price}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {destination.name}
                      </h3>
                      <p className="text-sm text-gray-600">{destination.state}</p>
                    </div>
                    <div className="flex items-center">
                      <StarIcon className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium text-gray-900 ml-1">
                        {destination.rating}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {destination.description}
                  </p>

                  {/* Highlights */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {destination.highlights.map((highlight, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stats and Actions */}
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      {destination.visitors} visitors
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                        Explore
                      </button>
                    </div>
                  </div>
                </div>
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
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Can't Find Your Destination?
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Search for any destination worldwide and let TOURISTA help you plan the perfect trip 
              with AI-powered recommendations and local insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                Search Destinations
              </button>
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold">
                View All Destinations
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Destinations;
