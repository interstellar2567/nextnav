"use client";
import React from "react";
import { motion } from "framer-motion";
import { StarIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Adventure Traveler",
      avatar: "/avatar1.jpg",
      rating: 5,
      content: "TOURISTA completely transformed my trip to Odisha! The AR previews helped me plan my temple visits perfectly, and the safety features gave me peace of mind. The route optimization saved me hours of travel time.",
      destination: "Puri & Konark"
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      role: "Local Guide",
      avatar: "/avatar2.jpg",
      rating: 5,
      content: "As a local guide, I'm impressed by how TOURISTA helps tourists discover hidden gems in our region. The community features connect travelers with authentic local experiences.",
      destination: "Bhubaneswar"
    },
    {
      id: 3,
      name: "Emily Chen",
      role: "Solo Traveler",
      avatar: "/avatar3.jpg",
      rating: 5,
      content: "Traveling solo was never easier! The safety features and community connections made me feel secure. The AI route planning found the most scenic routes to Chilika Lake.",
      destination: "Chilika Lake"
    },
    {
      id: 4,
      name: "Priya Sharma",
      role: "Family Traveler",
      avatar: "/avatar4.jpg",
      rating: 5,
      content: "Perfect for family trips! The multi-stop planning helped us visit multiple temples efficiently. The AR previews got the kids excited about each destination before we arrived.",
      destination: "Temple Circuit"
    },
    {
      id: 5,
      name: "Michael Rodriguez",
      role: "Photography Enthusiast",
      avatar: "/avatar5.jpg",
      rating: 5,
      content: "The local insights feature led me to amazing photography spots I would have missed. The community helped me find the best times to visit for perfect lighting.",
      destination: "Raghurajpur"
    },
    {
      id: 6,
      name: "Anita Patel",
      role: "Cultural Explorer",
      avatar: "/avatar6.jpg",
      rating: 5,
      content: "TOURISTA's cultural insights and local recommendations made my heritage tour incredibly enriching. The app connected me with local artisans and traditional experiences.",
      destination: "Heritage Villages"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
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
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What Our
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
              {" "}Travelers Say
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of satisfied travelers who have discovered amazing destinations 
            and created unforgettable memories with TOURISTA.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="bg-gray-50 rounded-2xl p-6 h-full relative">
                {/* Quote Icon */}
                                 <div className="absolute top-4 right-4">
                   <ChatBubbleLeftRightIcon className="w-8 h-8 text-blue-200" />
                 </div>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  {renderStars(testimonial.rating)}
                  <span className="text-sm text-gray-600 ml-2">
                    {testimonial.rating}.0
                  </span>
                </div>

                {/* Content */}
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Destination */}
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                    {testimonial.destination}
                  </span>
                </div>

                {/* Author */}
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-teal-400 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-semibold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">50K+</div>
                <div className="text-blue-100">Happy Travelers</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">200+</div>
                <div className="text-blue-100">Destinations</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">4.9★</div>
                <div className="text-blue-100">Average Rating</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">24/7</div>
                <div className="text-blue-100">Safety Support</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Share Your Story?
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join our community of travelers and share your experiences. Your reviews help others 
              discover amazing destinations and plan their perfect trips.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                Write a Review
              </button>
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold">
                Join Community
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
