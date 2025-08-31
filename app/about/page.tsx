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
  SparklesIcon,
  HeartIcon
} from "@heroicons/react/24/outline";

const AboutPage = () => {
  const features = [
    {
      icon: <MapPinIcon className="w-8 h-8" />,
      title: "AI-Powered Route Planning",
      description: "Advanced algorithms optimize your multi-stop journeys with real-time traffic updates and intelligent suggestions."
    },
    {
      icon: <CameraIcon className="w-8 h-8" />,
      title: "AR/VR Destination Previews",
      description: "Experience destinations in augmented and virtual reality before visiting with immersive 360° views."
    },
    {
      icon: <ShieldCheckIcon className="w-8 h-8" />,
      title: "Comprehensive Safety Features",
      description: "24/7 safety monitoring with SOS alerts, location sharing, and instant emergency response system."
    },
    {
      icon: <UserGroupIcon className="w-8 h-8" />,
      title: "Travel Community",
      description: "Connect with fellow travelers, share experiences, and discover new destinations together."
    },
    {
      icon: <GlobeAltIcon className="w-8 h-8" />,
      title: "Local Insights & Recommendations",
      description: "Discover hidden gems and authentic experiences with insider tips from locals and experienced travelers."
    },
    {
      icon: <StarIcon className="w-8 h-8" />,
      title: "Rewards & Exclusive Offers",
      description: "Earn points for your travels and get exclusive deals on bookings, accommodations, and activities."
    }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      description: "Former travel industry executive with 15+ years of experience in tourism and technology.",
      avatar: "/team1.jpg"
    },
    {
      name: "Rajesh Kumar",
      role: "CTO",
      description: "AI/ML expert with deep expertise in route optimization and AR/VR technologies.",
      avatar: "/team2.jpg"
    },
    {
      name: "Emily Chen",
      role: "Head of Product",
      description: "UX/UI specialist focused on creating intuitive and engaging travel experiences.",
      avatar: "/team3.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-teal-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              About
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
                {" "}TOURISTA
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              We're revolutionizing the way people discover, plan, and experience travel. 
              Our mission is to make every journey safer, smarter, and more memorable.
            </p>
            <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center">
                <HeartIcon className="w-4 h-4 mr-2 text-red-500" />
                <span>50K+ Happy Travelers</span>
              </div>
              <div className="flex items-center">
                <MapPinIcon className="w-4 h-4 mr-2 text-blue-500" />
                <span>200+ Destinations</span>
              </div>
              <div className="flex items-center">
                <StarIcon className="w-4 h-4 mr-2 text-yellow-500" />
                <span>4.9★ Rating</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                TOURISTA was born from a simple belief: travel should be accessible, safe, and enriching for everyone. 
                We combine cutting-edge technology with human-centered design to create travel experiences that go beyond the ordinary.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                From solo adventurers to family travelers, we're committed to making every journey memorable, 
                safe, and filled with authentic local experiences.
              </p>
              <div className="flex items-center">
                <SparklesIcon className="w-6 h-6 text-blue-600 mr-2" />
                <span className="text-blue-600 font-semibold">Making travel magical, one journey at a time</span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-blue-100 to-teal-100 rounded-2xl p-8 h-64 flex items-center justify-center"
            >
              <div className="text-center">
                <GlobeAltIcon className="w-24 h-24 text-blue-600 mx-auto mb-4" />
                <p className="text-gray-700 font-medium">Global Travel Community</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              What Makes TOURISTA Special
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've built TOURISTA with travelers in mind, combining the latest technology 
              with deep insights into what makes travel truly special.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Passionate travelers and technology experts working together to revolutionize the travel experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-teal-400 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-white text-3xl font-bold">{member.name.charAt(0)}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-teal-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of travelers who trust TOURISTA for their adventures. 
              Start planning your next unforgettable trip today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/getstart"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
              >
                Get Started
              </a>
              <a
                href="/dashboard"
                className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-semibold"
              >
                View Dashboard
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
