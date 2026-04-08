'use client';

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import LaunchAnnouncement from "../components/LaunchAnnouncement";
import HowItWorks from "../components/HowItWorks";
import Partners from "../components/Partners";
import Footer from "../components/Footer";

export default function Home() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  // Prevent flicker by showing nothing while redirecting
  if (status === "authenticated") return null;

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