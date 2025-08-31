export default function TeamPage() {
  const teamMembers = [
    {
      name: "Pritish Biswas",
      role: "Full-Stack Developer",
      image: "/images/pritish.jpg",
      quote: "Code is like humor. When you have to explain it, it’s bad.",
    },
    {
      name: "Shubham Krishna",
      role: "AI & ML Engineer",
      image: "/images/shubham.jpg",
      quote: "Simplicity is the soul of efficiency.",
    },
    {
      name: "Tushar Kumar",
      role: "Backend Developer",
      image: "/images/tushar.jpg",
      quote: "Design is intelligence made visible.",
    },
    {
      name: "Ayush Kumar",
      role: "Frontend Developer",
      image: "/images/ayush.jpg",
      quote: "The best way to predict the future is to invent it.",
    },
    {
      name: "Ayush Kumar Tripathi",
      role: "UI/UX Designer",
      image: "/images/ayusht.jpg",
      quote: "Security is not a product, but a process.",
    },
    {
      name: "Madhusikta Tanaya Singh",
      role: "AI & ML Expert",
      image: "/images/madhu.jpg",
      quote: "Automate everything that can be automated.",
    },
  ];

  return (
    <section className="p-8 text-white">
      {/* Heading */}
      <h2 className="text-8xl font-extrabold text-center text-purple-400 mb-10">
        Meet Team <span className="text-purple-700">ByteSquad</span>
      </h2>

      {/* Short Intro */}
      <p className="text-lg text-purple-200 text-center max-w-4xl mx-auto mb-16">
        The passionate minds behind{" "}
        <span className="text-purple-400 font-semibold text-xl">
          SwiftRoute
        </span>
        . Each of us brings unique expertise to create innovative solutions.
      </p>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="p-10 rounded-2xl border-[3px] border-purple-500 shadow-[0_0_30px_rgba(128,90,213,0.8)] bg-purple-800 bg-opacity-30 backdrop-blur-lg text-center transition-transform duration-300 hover:scale-105"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-44 h-44 rounded-full mx-auto mb-6 border-4 border-purple-400 shadow-lg"
            />
            <h3 className="text-3xl font-bold text-purple-300">
              {member.name}
            </h3>
            <p className="text-xl text-purple-200">{member.role}</p>
            <p className="italic text-purple-100 mt-6">“{member.quote}”</p>
          </div>
        ))}
      </div>
    </section>
  );
}
