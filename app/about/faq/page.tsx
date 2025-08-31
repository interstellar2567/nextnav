export default function FAQPage() {
  return (
    <section className="p-8 text-white">
      {/* Heading */}
      <h2 className="text-7xl font-extrabold text-center text-purple-400 mb-6">
        Frequently Asked <span className="text-purple-500">Questions</span>
      </h2>

      {/* Short Intro */}
      <p className="text-lg text-purple-200 text-center max-w-4xl mx-auto mb-12">
        Have questions? We’ve got answers! Below are some of the most commonly
        asked questions about{" "}
        <span className="text-purple-400 font-semibold text-2xl">
          SwiftRoute
        </span>
        .
      </p>

      {/* FAQ List */}
      <div className="max-w-5xl mx-auto space-y-6">
        {[
          {
            question: "🚗 How does SwiftRoute predict traffic?",
            answer:
              "SwiftRoute uses AI and machine learning to analyze real-time and historical traffic data, providing predictions up to 2 hours in advance.",
          },
          {
            question: "🌦️ Does SwiftRoute account for weather conditions?",
            answer:
              "Yes! SwiftRoute integrates live weather data to suggest the best possible routes during rain, fog, or extreme conditions.",
          },
          {
            question: "📍 Can I use SwiftRoute for public transport?",
            answer:
              "Absolutely! SwiftRoute provides optimized routes for cars, public transit, cycling, and pedestrians.",
          },
          {
            question: "🔋 Does SwiftRoute help reduce fuel consumption?",
            answer:
              "Yes! Our AI-powered routing helps you avoid unnecessary detours, reducing fuel consumption and emissions.",
          },
          {
            question: "🔐 How is my data protected?",
            answer:
              "We prioritize your privacy. SwiftRoute only uses location data for route optimization and does not share personal information with third parties.",
          },
          {
            question: "🆓 Is SwiftRoute free to use?",
            answer:
              "SwiftRoute offers both free and premium plans. The free plan includes basic navigation, while premium plans offer advanced AI-powered features.",
          },
          {
            question: "📶 Can I use SwiftRoute without an internet connection?",
            answer:
              "Yes! SwiftRoute offers offline navigation support by storing traffic predictions for areas with low connectivity.",
          },
          {
            question: "🛠️ What platforms does SwiftRoute support?",
            answer:
              "SwiftRoute is available as a web platform and will soon be launched on iOS and Android for seamless mobile navigation.",
          },
          {
            question: "🚀 How does SwiftRoute help emergency vehicles?",
            answer:
              "SwiftRoute identifies and prioritizes emergency vehicle routes to ensure quicker response times for ambulances and fire trucks.",
          },
          {
            question: "🗺️ Does SwiftRoute offer alternative route suggestions?",
            answer:
              "Yes! SwiftRoute provides multiple route options based on real-time traffic, accidents, and weather conditions.",
          },
        ].map((faq, index) => (
          <details
            key={index}
            className="p-6 rounded-2xl border-[3px] border-purple-500 shadow-[0_0_25px_rgba(128,90,213,0.8)] bg-purple-800 bg-opacity-30 backdrop-blur-lg"
          >
            <summary className="text-xl font-semibold text-purple-300 cursor-pointer hover:text-purple-400 transition duration-300">
              {faq.question}
            </summary>
            <p className="text-lg text-purple-100 mt-3">{faq.answer}</p>
          </details>
        ))}
      </div>

      {/* Need More Help? */}
      <div className="mt-12 text-center max-w-3xl mx-auto">
        <p className="text-xl text-purple-200">
          Didn't find what you were looking for? Contact us at
          <span className="text-yellow-400 font-semibold">
            {" "}
            support@swiftroute.com
          </span>
          .
        </p>
      </div>
    </section>
  );
}
