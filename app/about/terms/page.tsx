export default function TermsAndConditions() {
  return (
    <section className="p-8 text-white">
      {/* Heading Section */}
      <h2 className="text-8xl font-extrabold text-center  mb-6">
        Terms & <span className="text-purple-500">Conditions</span>
      </h2>

      {/* Short Intro */}
      <p className="text-lg text-purple-200 text-center max-w-4xl mx-auto mb-12">
        Welcome to{" "}
        <span className="text-purple-400 font-semibold">SwiftRoute</span>.
        Before using our platform, please review our terms to understand your
        <span className="text-purple-400 font-semibold">
          {" "}
          rights and responsibilities
        </span>
        .
      </p>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {[
          {
            title: "📜 User Agreement",
            color: "text-red-400",
            content:
              "By using SwiftRoute, you agree to comply with all applicable laws and regulations. Unauthorized use, reverse engineering, or reselling of our services is strictly prohibited.",
          },
          {
            title: "🔐 Privacy & Data Usage",
            color: "text-green-400",
            content:
              "We respect your privacy. Your location data is used solely to enhance navigation experiences. We do not share your personal information without consent. View our full Privacy Policy for details.",
          },
          {
            title: "⚖️ Limitations of Liability",
            color: "text-yellow-400",
            content:
              "SwiftRoute provides real-time navigation insights but does not guarantee 100% accuracy. We are not responsible for route miscalculations, delays, or third-party service errors.",
          },
          {
            title: "🚫 Termination of Use",
            color: "text-purple-400",
            content:
              "We reserve the right to suspend or terminate access to SwiftRoute if any violations of these terms occur, including misuse, hacking attempts, or breaches of conduct.",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="p-8 rounded-2xl border-[3px] border-purple-500 shadow-[0_0_25px_rgba(128,90,213,0.8)] bg-purple-800 bg-opacity-30 backdrop-blur-lg transition-transform duration-300 hover:scale-105"
          >
            <h3 className={`text-3xl font-bold mb-4 ${item.color}`}>
              {item.title}
            </h3>
            <p className="text-lg text-purple-100">{item.content}</p>
          </div>
        ))}
      </div>

      {/* Final Disclaimer */}
      <div className="mt-12 text-center max-w-3xl mx-auto">
        <p className="text-xl text-purple-200">
          By using{" "}
          <span className="text-purple-500 font-semibold">SwiftRoute</span>, you
          agree to these terms. For any legal inquiries, contact us at
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
