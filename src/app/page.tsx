import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import LaunchAnnouncement from "@/components/LaunchAnnouncement";
import HowItWorks from "@/components/HowItWorks";
import Partners from "@/components/Partners";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <LaunchAnnouncement />
        <HowItWorks />
        <Partners />
      </main>
      <Footer />
    </div>
  );
}
