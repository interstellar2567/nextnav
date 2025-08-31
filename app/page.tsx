import Hero from "@/components/main/Hero";
import Features from "@/components/main/Features";
import Destinations from "@/components/main/Destinations";
import Testimonials from "@/components/main/Testimonials";

export default function Home() {
  return (
    <main className="h-full w-full relative">
      <div className="flex flex-col gap-20">
        <Hero />
        <Features />
        <Destinations />
        <Testimonials />
      </div>
    </main>
  );
}
