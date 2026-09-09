import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import BirthdayOverlay from "@/components/BirthdayOverlay";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import WorkSection from "@/components/WorkSection";
import ContactSection from "@/components/ContactSection";

export const revalidate = 0;

export default async function Home() {
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <BirthdayOverlay />
      {/* Sticky navbar sits outside sections so it doesn't overlap */}
      <div className="sticky top-0 z-50 w-full px-4 md:px-8 bg-light-pink py-2">
        <Navbar />
      </div>
      <HeroSection />
      <AboutSection />
      <WorkSection projects={projects ?? []} />
      <ContactSection />
    </div>
  );
}
