export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 space-y-20">
      <section className="relative p-10 text-white">
        <h2 className="text-8xl font-bold mb-8">
          Wanna Explore <span className="text-purple-600">SwiftRoute</span> With
          Me?
        </h2>
        <p className="text-lg text-gray-300 text-left max-w-4xl mb-8">
          In an era of{" "}
          <span className="font-semibold text-purple-400">
            unpredictable traffic, weather disruptions, and outdated navigation
          </span>
          ,<span className="text-purple-600 font-semibold"> SwiftRoute</span>{" "}
          emerges as the ultimate AI-powered travel companion. It doesn’t just
          show you the way—it{" "}
          <span className="text-purple-200 font-semibold">predicts</span>,{" "}
          <span className="text-purple-200 font-semibold">adapts</span>, and{" "}
          <span className="text-purple-200 font-semibold">optimizes</span> your
          route in real time for a seamless travel experience.
        </p>
      </section>

      {/* Problem Section */}
      <section className="p-8 rounded-2xl border-[3px] border-purple-500 shadow-[0_0_25px_rgba(128,90,213,0.8)] bg-purple-900 bg-opacity-20 backdrop-blur-lg">
        <h2 className="text-3xl font-bold text-purple-400 mb-6 text-center">
          The Urban Mobility Crisis
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Key Challenges */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-purple-200">
              Key Challenges
            </h3>
            <div className="space-y-3">
              {[
                "30% increase in average commute times since 2015",
                "40% higher emissions from congestion-related idling",
                "$87B annual loss in US productivity due to traffic",
                "65% of drivers experience daily routing frustration",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 transition-transform duration-300 hover:scale-105"
                >
                  <div className="w-3 h-3 bg-purple-400 rounded-full mt-2 shadow-[0_0_12px_rgba(128,90,213,0.8)]" />
                  <p className="text-purple-100">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pain Points */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-purple-200">
              Pain Points
            </h3>
            <div className="space-y-3">
              {[
                "Unpredictable delays from accidents/weather",
                "Inefficient routes wasting 19% more fuel",
                "No real-time congestion management",
                "Limited integration with city infrastructure",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 transition-transform duration-300 hover:scale-105"
                >
                  <div className="w-3 h-3 bg-purple-400 rounded-full mt-2 shadow-[0_0_12px_rgba(128,90,213,0.8)]" />
                  <p className="text-purple-100">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="relative p-10 rounded-3xl border-[3px] border-purple-500 shadow-[0_0_25px_rgba(128,90,213,0.8)] bg-purple-900 bg-opacity-20 backdrop-blur-lg">
        <h2 className="text-3xl font-bold text-purple-400 mb-8 text-center">
          Our AI-Powered Solution
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="relative p-6 rounded-xl border-[2px] border-purple-400 shadow-[0_4px_25px_rgba(128,90,213,0.8)] hover:scale-105 transition-transform duration-300 backdrop-blur-lg bg-opacity-0">
              <h3 className="text-xl font-semibold text-purple-300 mb-3">
                🚦 Real-Time Prediction
              </h3>
              <p className="text-purple-100">
                Machine learning models analyzing:
              </p>
              <div className="space-y-2 mt-2">
                {[
                  "Historical traffic patterns",
                  "Live GPS/vehicle data",
                  "Weather forecasts",
                  "Crowdsourced incident reports",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 hover:scale-105 transition-transform duration-300"
                  >
                    <div className="w-3 h-3 bg-purple-400 rounded-full mt-2 shadow-[0_0_12px_rgba(128,90,213,0.8)]" />
                    <p className="text-purple-100">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative p-6 rounded-xl border-[2px] border-purple-400 shadow-[0_4px_25px_rgba(128,90,213,0.8)] hover:scale-105 transition-transform duration-300 backdrop-blur-lg bg-opacity-0">
              <h3 className="text-xl font-semibold text-purple-300 mb-3">
                🛣️ Dynamic Routing
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">2hr</div>
                  <p className="text-sm text-purple-100">
                    Advance prediction window
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">92%</div>
                  <p className="text-sm text-purple-100">Route accuracy</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <div className="relative p-6 rounded-xl border-[2px] border-purple-400 shadow-[0_4px_25px_rgba(128,90,213,0.8)] hover:scale-105 transition-transform duration-300 backdrop-blur-lg bg-opacity-0">
              <h3 className="text-xl font-semibold text-purple-300 mb-3">
                🌍 Smart City Integration
              </h3>
              <div className="space-y-2">
                {[
                  "Emergency vehicle prioritization",
                  "Public transport optimization",
                  "IoT traffic light synchronization",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 hover:scale-105 transition-transform duration-300"
                  >
                    <div className="w-3 h-3 bg-purple-400 rounded-full mt-2 shadow-[0_0_12px_rgba(128,90,213,0.8)]" />
                    <p className="text-purple-100">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative p-6 rounded-xl border-[2px] border-purple-400 shadow-[0_4px_25px_rgba(128,90,213,0.8)] hover:scale-105 transition-transform duration-300 backdrop-blur-lg bg-opacity-0">
              <h3 className="text-xl font-semibold text-purple-300 mb-3">
                📊 Proven Impact
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">
                    25-30%
                  </div>
                  <p className="text-sm text-purple-100">Faster commutes</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">
                    18-22%
                  </div>
                  <p className="text-sm text-purple-100">Fuel savings</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Section */}
      <section className="relative p-10 rounded-3xl border-[3px] border-purple-500 shadow-[0_0_25px_rgba(128,90,213,0.8)] bg-purple-900 bg-opacity-20 backdrop-blur-lg">
        <h2 className="text-3xl font-bold text-purple-400 mb-8 text-center">
          Cutting-Edge Innovations
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Live Crowdsourcing",
              content: "User-reported incidents improve accuracy in real-time",
              icon: "👥",
            },
            {
              title: "Eco Routing",
              content: "Algorithms prioritize low-emission routes",
              icon: "🌱",
            },
            {
              title: "Offline Navigation",
              content: "Stored predictions for low-connectivity areas",
              icon: "📡",
            },
            {
              title: "Smart Heatmaps",
              content: "Color-coded congestion visualization",
              icon: "🗺️",
            },
            {
              title: "Weather AI",
              content: "Precipitation impact forecasting",
              icon: "⛈️",
            },
            {
              title: "Future Ready",
              content: "Blockchain-based traffic management",
              icon: "🔮",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="relative p-6 rounded-xl border-[2px] border-purple-400 shadow-[0_4px_25px_rgba(128,90,213,0.8)] hover:scale-105 transition-transform duration-300 backdrop-blur-lg bg-opacity-0"
            >
              <div className="text-5xl mb-3 text-purple-300">{item.icon}</div>
              <h3 className="text-xl font-semibold text-purple-300 mb-2">
                {item.title}
              </h3>
              <p className="text-purple-100 text-lg">{item.content}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Market Potential */}
      <section className="relative p-10 rounded-3xl border-[3px] border-purple-500 shadow-[0_0_25px_rgba(128,90,213,0.8)] bg-purple-900 bg-opacity-20 backdrop-blur-lg">
        <h2 className="text-3xl font-bold text-purple-400 mb-8 text-center">
          Market Opportunity
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              value: "$30B+",
              title: "Intelligent Transportation Market",
              description: "15% CAGR growth projected",
            },
            {
              value: "200+",
              title: "Cities Worldwide",
              description: "With critical congestion levels",
            },
            {
              value: "1M+",
              title: "Daily Users",
              description: "Potential in target markets",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="relative text-center p-6 rounded-xl border-[2px] border-purple-400 shadow-[0_4px_25px_rgba(128,90,213,0.8)] hover:scale-105 transition-transform duration-300 backdrop-blur-lg bg-opacity-0"
            >
              <div className="text-5xl font-extrabold text-purple-400 mb-3">
                {item.value}
              </div>
              <p className="font-semibold text-purple-300 text-lg">
                {item.title}
              </p>
              <p className="text-md text-purple-100 mt-2">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-6">
          {/* Strategic Partnerships */}
          <div className="relative p-6 rounded-xl border-[2px] border-purple-400 shadow-[0_4px_25px_rgba(128,90,213,0.8)] hover:scale-105 transition-transform duration-300 backdrop-blur-lg bg-opacity-0">
            <h3 className="text-2xl font-semibold text-purple-300 mb-4">
              Strategic Partnerships
            </h3>
            <div className="space-y-3">
              {[
                "Municipal traffic departments",
                "Ride-sharing platforms",
                "Logistics providers",
                "Smart city initiatives",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 hover:scale-105 transition-transform duration-300"
                >
                  <div className="w-4 h-4 bg-purple-400 rounded-full mt-2 shadow-[0_0_12px_rgba(128,90,213,0.8)]" />
                  <p className="text-purple-100 text-lg">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Expansion Roadmap */}
          <div className="relative p-6 rounded-xl border-[2px] border-purple-400 shadow-[0_4px_25px_rgba(128,90,213,0.8)] hover:scale-105 transition-transform duration-300 backdrop-blur-lg bg-opacity-0">
            <h3 className="text-2xl font-semibold text-purple-300 mb-4">
              Expansion Roadmap
            </h3>
            <div className="flex flex-col space-y-4">
              {[
                "Phase 1: Metro city deployment",
                "Phase 2: Regional integration",
                "Phase 3: Global scaling",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center hover:scale-105 transition-transform duration-300"
                >
                  <div className="w-4 h-4 bg-purple-400 rounded-full mr-3 shadow-[0_0_12px_rgba(128,90,213,0.8)]" />
                  <p className="text-purple-100 text-lg">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
